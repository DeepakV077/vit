# 🌊 OceanIQ - AI-Powered Marine Intelligence Platform

A comprehensive full-stack web application for analyzing ocean environmental parameters, predicting marine species habitability, and providing AI-driven insights for marine conservation.

## ✨ Features

### 1. 🏠 Home Page
- Hero section with platform overview
- Feature showcase
- Statistics dashboard
- Call-to-action buttons

### 2. 📊 Data Dashboard
- Real-time ocean environmental metrics (Temperature, Salinity, Depth, Density)
- Interactive charts showing annual trends
- Species suitability index comparison across regions
- Radar chart for environmental parameter analysis
- Support for 5 ocean regions:
  - Chennai Coast, Bay of Bengal
  - Kanyakumari, Indian Ocean
  - Pondicherry Coast
  - Bali, Indonesia
  - Miami, Florida Keys

### 3. 🗺️ Interactive Map View
- Visual map with clickable region markers
- Color-coded temperature overlays
- Real-time environmental data display
- AI-powered species predictions for selected regions
- Suitability scores with risk assessment

### 4. 🧬 AI Species Prediction
- Input environmental parameters:
  - Temperature (15-35°C)
  - Salinity (0-40 PSU)
  - Depth (0-1000m)
  - Density (1020-1030 kg/m³)
- AI-powered suitability predictions for:
  - Coral Reefs
  - Bluefin Tuna
  - Mangrove Forests
- Risk assessment (Low/Medium/High)
- Detailed reasoning and insights
- Confidence levels for each prediction

### 5. 📚 Marine Encyclopedia
- Comprehensive species information
- Searchable database
- Detailed profiles including:
  - Scientific names
  - Habitat information
  - Diet and behavior
  - Conservation status
  - Threats and challenges
  - Optimal environmental conditions
- Beautiful image galleries

### 6. 💬 AI Chatbot Assistant
- Interactive conversational AI
- Natural language processing
- Suggested questions
- Real-time responses
- Topics covered:
  - Marine species information
  - Habitat predictions
  - Conservation topics
  - Ocean data analysis
  - Environmental parameters

### 7. 📥 Report Export
- Generate comprehensive reports
- Export formats: PDF and CSV
- Customizable report contents:
  - Environmental data
  - Species predictions
  - Charts and graphs (PDF only)
  - Species information
  - AI insights
- Professional formatting
- Download functionality

### 8. 🔐 Authentication
- User sign-in and sign-up
- Google OAuth integration (demo)
- Session management
- Protected features

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icon library
- **Shadcn/ui** - UI component library

### Backend (Ready for Integration)
- **Supabase** - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Edge Functions

### AI/ML (Mock Implementation)
- Linear regression model for species prediction
- Natural language processing for chatbot
- Environmental parameter analysis

## 📦 Project Structure

```
/
├── components/
│   ├── ui/                    # Shadcn UI components
│   ├── Navbar.tsx            # Navigation bar
│   ├── Home.tsx              # Landing page
│   ├── Dashboard.tsx         # Analytics dashboard
│   ├── MapView.tsx           # Interactive map
│   ├── SpeciesPredict.tsx    # AI prediction interface
│   ├── Encyclopedia.tsx      # Species information
│   ├── Chatbot.tsx           # AI assistant
│   ├── ReportExport.tsx      # Report generation
│   └── AuthDialog.tsx        # Authentication modal
├── utils/
│   └── mockData.ts           # Mock data and prediction logic
├── styles/
│   └── globals.css           # Global styles and theme
└── App.tsx                   # Main application
```

## 🚀 Getting Started

This application is built with Figma Make and runs directly in the browser. All features are functional with mock data.

### Current Implementation
- **Frontend**: Fully functional React application
- **Data**: Mock data simulating real ocean parameters
- **AI**: Client-side prediction algorithm
- **Charts**: Real-time interactive visualizations
- **Export**: Browser-based report generation

### Backend Integration (Supabase)

The application is pre-configured to work with Supabase. To connect a real backend:

1. **Database Schema**:
   ```sql
   -- Ocean parameters table
   CREATE TABLE ocean_data (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     latitude DECIMAL,
     longitude DECIMAL,
     temperature DECIMAL,
     salinity DECIMAL,
     depth INTEGER,
     density DECIMAL,
     region TEXT,
     timestamp TIMESTAMPTZ DEFAULT NOW()
   );

   -- Species predictions table
   CREATE TABLE predictions (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id),
     region TEXT,
     species TEXT,
     suitability_score INTEGER,
     risk_index TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- User favorites table
   CREATE TABLE user_favorites (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id),
     species_id TEXT,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

2. **Authentication Setup**:
   - Enable Email/Password authentication in Supabase
   - Configure Google OAuth provider
   - Update redirect URLs

3. **API Integration**:
   - Replace mock data with Supabase queries
   - Implement real-time subscriptions
   - Add API error handling

## 🎨 Features in Detail

### AI Prediction Algorithm
The prediction system analyzes environmental parameters against optimal conditions for each species:
- **Temperature matching**: Compares input temperature to species' optimal range
- **Salinity analysis**: Evaluates salinity levels for species survival
- **Depth assessment**: Checks if depth is suitable for the species
- **Composite scoring**: Generates 0-100 suitability score
- **Risk classification**: Low/Medium/High based on total score

### Data Visualization
- Line charts for temperature and salinity trends
- Bar charts comparing species suitability across regions
- Radar charts for multi-parameter analysis
- Interactive tooltips and legends
- Responsive design for all screen sizes

### Export Functionality
Reports include:
- Region identification and coordinates
- Complete environmental data
- Species suitability scores
- AI-generated insights
- Professional formatting
- Timestamp and metadata

## 🌐 External APIs (Suggested for Production)

To enhance the application with real data, consider integrating:

1. **Open-Meteo Marine API**
   - Free ocean weather data
   - No API key required
   - Real-time measurements

2. **NOAA Ocean Data**
   - Comprehensive ocean observations
   - Historical data
   - Climate monitoring

3. **OpenAI / Gemini API**
   - Enhanced chatbot capabilities
   - Natural language understanding
   - Educational content generation

4. **Wikipedia API**
   - Species information
   - Conservation status
   - Scientific references

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px+)
- Laptop (1280px - 1919px)
- Tablet (768px - 1279px)
- Mobile (320px - 767px)

## 🔒 Security Notes

**Important**: This is a prototype application. For production use:
- Implement proper authentication with Supabase Auth
- Add environment variable protection for API keys
- Enable Row Level Security (RLS) in Supabase
- Add input validation and sanitization
- Implement rate limiting
- Use HTTPS for all communications

## 🎯 Future Enhancements

1. **Real-time Data Integration**
   - Connect to live ocean data APIs
   - Automatic data updates
   - Historical trend analysis

2. **Advanced ML Models**
   - Deploy FastAPI microservice
   - Train on larger datasets
   - Support more marine species

3. **User Features**
   - Save favorite regions
   - Create custom reports
   - Share analyses
   - Collaborate with researchers

4. **Mobile App**
   - React Native version
   - Offline support
   - GPS integration

5. **Educational Content**
   - Video tutorials
   - Interactive lessons
   - Quizzes and assessments

## 📄 License

This is a prototype application built for demonstration purposes.

## 🤝 Contributing

This application demonstrates the capabilities of AI-powered marine analysis. For production deployment:
1. Set up Supabase project
2. Configure environment variables
3. Deploy frontend to Vercel
4. Set up API endpoints
5. Implement monitoring and analytics

## 💡 About OceanIQ

OceanIQ empowers researchers, conservationists, and educators to understand, predict, and protect marine ecosystems through AI intelligence, environmental data, and interactive education.

---

Built with ❤️ for ocean conservation
