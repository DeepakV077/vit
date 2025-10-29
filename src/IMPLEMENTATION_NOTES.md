# OceanIQ Implementation Notes

## Current Status

### ✅ Completed Features

1. **Full Frontend Application**
   - 7 main pages/views fully implemented
   - Responsive design for all screen sizes
   - Modern UI with Tailwind CSS and Shadcn components
   - Interactive data visualizations with Recharts

2. **Mock Data & Prediction System**
   - Realistic ocean parameter data for 5 regions
   - 3 marine species profiles (Coral, Tuna, Mangroves)
   - Client-side AI prediction algorithm
   - Environmental parameter analysis

3. **User Interface Components**
   - Navigation with authentication state
   - Interactive maps with region selection
   - Chart-based analytics dashboard
   - Chatbot with contextual responses
   - Report export with PDF/CSV options
   - Species encyclopedia with search

4. **Supabase Integration Ready**
   - Connected to Supabase backend
   - Auth system architecture planned
   - Database schema documented

## Backend Integration Guide

### Step 1: Supabase Setup

The application is already connected to Supabase. To enable full backend functionality:

1. **Create Tables** (via Supabase SQL Editor):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Ocean data table
CREATE TABLE ocean_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  latitude DECIMAL(10,6) NOT NULL,
  longitude DECIMAL(10,6) NOT NULL,
  temperature DECIMAL(5,2),
  salinity DECIMAL(5,2),
  depth INTEGER,
  density DECIMAL(7,2),
  region TEXT,
  timestamp TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Species information table
CREATE TABLE species (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  scientific_name TEXT,
  habitat TEXT,
  diet TEXT,
  threats TEXT[],
  conservation_status TEXT,
  description TEXT,
  image_url TEXT,
  temp_min DECIMAL(5,2),
  temp_max DECIMAL(5,2),
  salinity_min DECIMAL(5,2),
  salinity_max DECIMAL(5,2),
  depth_min INTEGER,
  depth_max INTEGER
);

-- Predictions table
CREATE TABLE predictions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  region TEXT NOT NULL,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  temperature DECIMAL(5,2),
  salinity DECIMAL(5,2),
  depth INTEGER,
  density DECIMAL(7,2),
  species_name TEXT,
  suitability_score INTEGER,
  risk_index TEXT,
  reasoning TEXT,
  confidence_level INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User favorites table
CREATE TABLE user_favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  species_id TEXT REFERENCES species(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, species_id)
);

-- User saved regions table
CREATE TABLE user_regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  region_name TEXT NOT NULL,
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_ocean_data_region ON ocean_data(region);
CREATE INDEX idx_ocean_data_timestamp ON ocean_data(timestamp);
CREATE INDEX idx_predictions_user ON predictions(user_id);
CREATE INDEX idx_predictions_created ON predictions(created_at);
CREATE INDEX idx_favorites_user ON user_favorites(user_id);
```

2. **Enable Row Level Security**:

```sql
-- Enable RLS
ALTER TABLE predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_regions ENABLE ROW LEVEL SECURITY;

-- Predictions policies
CREATE POLICY "Users can view own predictions"
  ON predictions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own predictions"
  ON predictions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own predictions"
  ON predictions FOR DELETE
  USING (auth.uid() = user_id);

-- User favorites policies
CREATE POLICY "Users can view own favorites"
  ON user_favorites FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own favorites"
  ON user_favorites FOR ALL
  USING (auth.uid() = user_id);

-- User regions policies
CREATE POLICY "Users can view own regions"
  ON user_regions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own regions"
  ON user_regions FOR ALL
  USING (auth.uid() = user_id);

-- Public read for ocean_data and species
ALTER TABLE ocean_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE species ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view ocean data"
  ON ocean_data FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view species"
  ON species FOR SELECT
  USING (true);
```

3. **Seed Initial Data**:

```sql
-- Insert species data
INSERT INTO species (id, name, scientific_name, habitat, diet, threats, conservation_status, description, temp_min, temp_max, salinity_min, salinity_max, depth_min, depth_max)
VALUES 
  ('coral', 'Coral Reefs', 'Anthozoa', 'Shallow tropical and subtropical ocean waters', 'Zooplankton, organic matter through symbiosis with zooxanthellae', 
   ARRAY['Ocean acidification', 'Coral bleaching', 'Pollution', 'Overfishing', 'Climate change'], 
   'Vulnerable to Critically Endangered', 
   'Coral reefs are diverse underwater ecosystems built by colonies of tiny animals. They support about 25% of all marine species.',
   23, 29, 32, 40, 0, 50),
  
  ('tuna', 'Bluefin Tuna', 'Thunnus thynnus', 'Open ocean, pelagic zones', 'Fish, squid, crustaceans',
   ARRAY['Overfishing', 'Bycatch', 'Climate change', 'Habitat degradation'],
   'Endangered',
   'Bluefin tuna are powerful, fast-swimming fish found in Atlantic and Pacific oceans.',
   15, 30, 34, 37, 0, 550),
  
  ('mangrove', 'Mangrove Forest', 'Rhizophora', 'Coastal intertidal zones in tropical and subtropical regions', 'Photosynthesis, nutrient absorption from sediment',
   ARRAY['Coastal development', 'Aquaculture', 'Pollution', 'Climate change', 'Sea level rise'],
   'Threatened',
   'Mangroves are salt-tolerant trees that grow in coastal saline waters.',
   20, 35, 0, 90, 0, 5);
```

### Step 2: Authentication Setup

1. **Enable Auth Providers** in Supabase Dashboard:
   - Email/Password (already enabled)
   - Google OAuth (configure with Google Cloud Console)

2. **Update Auth Configuration**:
   - Set site URL to your deployment URL
   - Configure redirect URLs
   - Add authorized domains

3. **Update AuthDialog.tsx** to use real Supabase Auth:

```typescript
import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: signupEmail,
  password: signupPassword,
  options: {
    data: {
      name: signupName,
    }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: loginEmail,
  password: loginPassword,
});

// Google OAuth
const { data, error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
});
```

### Step 3: API Integration

For production, replace mock data with real API calls:

1. **Open-Meteo Marine API** (Free, no auth):
```typescript
// Fetch ocean data
const response = await fetch(
  `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&current=wave_height,ocean_current_velocity,ocean_current_direction`
);
```

2. **NOAA Ocean Data** (Free with registration):
```typescript
const response = await fetch(
  `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=water_temperature&station=8454000&date=latest&units=metric&format=json`
);
```

### Step 4: Supabase Edge Functions

Create an edge function for ML predictions:

```typescript
// /supabase/functions/predict-species/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

serve(async (req) => {
  const { temperature, salinity, depth, density } = await req.json();
  
  // Call ML model API or run prediction logic
  const predictions = await predictSpecies({
    temperature,
    salinity,
    depth,
    density
  });
  
  // Store in database
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  );
  
  await supabase.from('predictions').insert({
    user_id: req.headers.get('user-id'),
    ...predictions
  });
  
  return new Response(JSON.stringify(predictions), {
    headers: { 'Content-Type': 'application/json' }
  });
});
```

## ML Model Integration

### Option 1: FastAPI Microservice

Deploy a separate ML service:

```python
# app.py
from fastapi import FastAPI
from pydantic import BaseModel
import pickle
import numpy as np

app = FastAPI()

# Load trained model
with open('model/species_model.pkl', 'rb') as f:
    model = pickle.load(f)

class OceanData(BaseModel):
    temperature: float
    salinity: float
    depth: int
    density: float

@app.post("/predict")
def predict(data: OceanData):
    features = np.array([[
        data.temperature,
        data.salinity,
        data.depth,
        data.density
    ]])
    
    predictions = model.predict(features)
    
    return {
        "coral": predictions[0],
        "tuna": predictions[1],
        "mangrove": predictions[2]
    }
```

### Option 2: Supabase Edge Function with TensorFlow.js

```typescript
import * as tf from 'https://cdn.skypack.dev/@tensorflow/tfjs';

// Load pre-trained model
const model = await tf.loadLayersModel('https://yourcdn.com/model.json');

// Make prediction
const input = tf.tensor2d([[temperature, salinity, depth, density]]);
const prediction = model.predict(input);
```

## API Keys Management

For production APIs, use Supabase Secrets:

```typescript
// Set secrets via Supabase CLI
supabase secrets set OPENAI_API_KEY=your_key_here
supabase secrets set GOOGLE_MAPS_API_KEY=your_key_here

// Access in Edge Functions
const openaiKey = Deno.env.get('OPENAI_API_KEY');
```

## Deployment Checklist

- [ ] Set up Supabase project
- [ ] Create database tables and RLS policies
- [ ] Seed initial species data
- [ ] Enable authentication providers
- [ ] Configure OAuth with Google
- [ ] Deploy edge functions
- [ ] Set up API keys in Supabase secrets
- [ ] Update frontend to use real Supabase client
- [ ] Test authentication flow
- [ ] Test data fetching and predictions
- [ ] Enable real-time subscriptions
- [ ] Set up monitoring and analytics
- [ ] Configure backup and recovery
- [ ] Set up staging environment
- [ ] Perform security audit
- [ ] Deploy to production

## Next Steps

1. **Test Current Implementation**: All features work with mock data
2. **Set Up Supabase**: Follow Step 1 to create database
3. **Enable Auth**: Configure authentication providers
4. **Integrate APIs**: Replace mock data with real ocean data
5. **Deploy ML Model**: Set up FastAPI or edge function for predictions
6. **Production Deploy**: Deploy frontend and backend services

## Support

For questions or issues with Supabase integration, refer to:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Edge Functions Guide](https://supabase.com/docs/guides/functions)
