// src/components/MapView.tsx
// (Refactored for robust layout, UI consistency, and component separation)

import { useState, useEffect, useMemo, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
  Circle,
  LayersControl,
  LayerGroup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// The leaflet.heat plugin is optional and may not be installed in every
// environment. Instead of importing it at build-time (which makes the
// bundler try to resolve the module), we load it at runtime from a CDN
// when needed. This avoids Vite import-analysis failures when the plugin
// isn't present in node_modules.

const loadLeafletHeat = (): Promise<void> => {
  // If heatLayer already exists (plugin attached), resolve immediately
  if ((L as any).heatLayer) return Promise.resolve();

  // Avoid inserting duplicate script tags
  const existing = document.querySelector('script[data-leaflet-heat]');
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', (e) => reject(e));
    });
  }

  return new Promise((resolve, reject) => {
    const s = document.createElement('script');
    // Use unpkg CDN for the leaflet.heat plugin
    s.src = 'https://unpkg.com/leaflet.heat/dist/leaflet-heat.js';
    s.async = true;
    s.setAttribute('data-leaflet-heat', '1');
    s.onload = () => {
      // plugin attaches heatLayer to L
      resolve();
    };
    s.onerror = (e) => reject(new Error('Failed to load leaflet.heat plugin'));
    document.head.appendChild(s);
  });
};
import { useMediaQuery } from "../hooks/use-media-query";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster, toast } from "sonner";

// Shadcn UI Imports
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "./ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "./ui/drawer";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./ui/command";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input"; // <-- [PERFECTED] Added for parameters
import { Slider } from "./ui/slider"; // <-- [PERFECTED] Added for parameters
import { Label } from "./ui/label"; // <-- [PERFECTED] Added for parameters

// Icons
import {
  Info,
  Search,
  Navigation,
  Globe,
  Thermometer,
  Waves,
  AreaChart,
  Bot,
  MapPin,
  X,
  Filter,
  Layers,
  Undo2,
} from "lucide-react";

// Mock Data
import {
  oceanRegions,
  predictSpeciesSuitability,
  highlightedPlaces,
  IOceanData,
} from "../utils/mockData";

// --- 🌊 Custom Marker Icons ---
const defaultIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const highlightIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/252/252025.png",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const clickedIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1865/1865269.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35],
});

// --- 🔥 Heatmap Component ---
const DynamicHeatmap = ({ data }: { data: any[] }) => {
  const map = useMap();

  useEffect(() => {
    let heatLayer: any | null = null;
    if (data.length === 0) {
      return;
    }

    // Use an async IIFE to optionally load the heat plugin at runtime
    (async () => {
      try {
        if (typeof (L as any).heatLayer !== 'function') {
          // attempt to load plugin from CDN
          await loadLeafletHeat();
        }

        if (typeof (L as any).heatLayer === 'function') {
          heatLayer = (L as any).heatLayer(data, {
            radius: 25,
            blur: 20,
            maxZoom: 10,
            gradient: { 0.4: 'blue', 0.65: 'lime', 1: 'red' },
          });
          map.addLayer(heatLayer);
        }
      } catch (err) {
        // loading failed — silently ignore so map still renders markers
        console.warn('Could not load leaflet.heat plugin:', err);
      }
    })();

    return () => {
      if (heatLayer) map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

// --- 🧭 FlyTo Component (Utility) ---
function FlyToLocation({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 6, { duration: 1.2 });
    }
  }, [lat, lng, map]);
  return null;
}

// --- 🧾 Save map instance into ref for external invalidation ---
function SaveMapRef({ mapRef }: { mapRef: React.MutableRefObject<L.Map | null> }) {
  const map = useMap();
  useEffect(() => {
    mapRef.current = map;
  }, [map, mapRef]);
  return null;
}

// --- 🗺️ MapClick Handler ---
interface MapClickProps {
  onLocationSelect: (location: IOceanData) => void;
}

function MapClickEvents({ onLocationSelect }: MapClickProps) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newLocation: IOceanData = {
        region: `Clicked Location (${lat.toFixed(2)}°, ${lng.toFixed(2)}°)`,
        latitude: lat,
        longitude: lng,
        temperature: Math.round(Math.random() * 20 + 10),
        salinity: Math.round(Math.random() * 5 + 32),
        depth: Math.round(Math.random() * 200 + 10),
        density: 1025,
        timestamp: new Date().toISOString(),
        isClicked: true,
      };
      onLocationSelect(newLocation);
      toast.success("New location analyzed!", {
        description: `Coordinates: ${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
      });
    },
  });
  return null;
}

// --- 🧠 Sidebar Content (Reusable) ---
interface SidebarContentProps {
  location: IOceanData;
}

function SidebarContent({ location }: SidebarContentProps) {
  const predictions = predictSpeciesSuitability(location);

  const dataFields = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: `${location.temperature}°C`,
    },
    { icon: Waves, label: "Salinity", value: `${location.salinity} PSU` },
    { icon: AreaChart, label: "Depth", value: `${location.depth} m` },
    {
      icon: Globe,
      label: "Density",
      value: `${location.density} kg/m³`,
    },
  ];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.region + (location.timestamp ?? "")}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.22 }}
        className="space-y-4"
      >
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              {location.isClicked ? (
                <MapPin className="text-blue-500" />
              ) : (
                <Navigation className="text-blue-500" />
              )}
              {location.region}
            </CardTitle>
            <p className="text-sm text-gray-500">
              Lat: {location.latitude.toFixed(3)}°, Lon:{" "}
              {location.longitude.toFixed(3)}°
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dataFields.map((field) => (
                <div
                  key={field.label}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2 text-gray-600">
                    <field.icon className="w-4 h-4" />
                    <span>{field.label}</span>
                  </div>
                  <span className="font-medium text-gray-900">
                    {field.value}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Bot className="text-purple-500" />
              AI Species Predictions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {predictions.map((pred) => (
              <div key={pred.species} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{pred.species}</span>
                  <Badge
                    variant={
                      pred.riskIndex === "Low"
                        ? "success"
                        : pred.riskIndex === "Medium"
                        ? "warning"
                        : "destructive"
                    }
                  >
                    {pred.riskIndex} Risk
                  </Badge>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className={`h-2.5 rounded-full ${
                      pred.suitabilityScore >= 75
                        ? "bg-green-500"
                        : pred.suitabilityScore >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${pred.suitabilityScore}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${pred.suitabilityScore}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <p className="text-xs text-gray-600 mt-2">{pred.reasoning}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5" />
              <p className="text-sm text-blue-900">
                Click any location on the map to get instant AI-driven analysis
                for that specific point.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
}

// --- 🔍 Search Command ---
interface MapSearchProps {
  onSelect: (location: IOceanData) => void;
}

function MapSearch({ onSelect }: MapSearchProps) {
  const [open, setOpen] =useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSelect = (location: IOceanData) => {
    onSelect(location);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outline"
        className="w-full md:w-80 justify-between text-gray-600"
        onClick={() => setOpen(true)}
      >
        <span className="flex items-center gap-2">
          <Search className="w-4 h-4" />
          Search location...
        </span>
        <kbd className="hidden md:inline-flex pointer-events-none h-5 select-none items-center gap-1 rounded border bg-gray-100 px-1.5 font-mono text-[10px] font-medium">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search for an ocean region or point of interest..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Ocean Regions">
            {oceanRegions.map((r) => (
              <CommandItem
                key={r.region}
                onSelect={() => handleSelect(r)}
                className="cursor-pointer"
              >
                <Globe className="mr-2 h-4 w-4" />
                <span>{r.region}</span>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandGroup heading="Points of Interest">
            {highlightedPlaces.map((p) => (
              <CommandItem
                key={p.region}
                onSelect={() => handleSelect(p)}
                className="cursor-pointer"
              >
                <Navigation className="mr-2 h-4 w-4" />
                <span>{p.region}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

// --- [NEW] 🔬 Parameters Study Sheet Component ---
// [PERFECTED] Extracted to its own component and uses shadcn UI
interface ParametersSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  filters: typeof defaultFilters;
  setFilters: React.Dispatch<React.SetStateAction<typeof defaultFilters>>;
  onClear: () => void;
}

const defaultFilters = {
  tempMin: -10,
  tempMax: 50,
  salMin: 0,
  salMax: 42,
  depthMax: 10000,
};

function ParametersSheet({
  isOpen,
  onOpenChange,
  filters,
  setFilters,
  onClear,
}: ParametersSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Parameters Study</SheetTitle>
          <SheetDescription>
            Filter the data points visible on the map.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1 pr-3">
          <div className="space-y-6 py-4">
            {/* Temperature */}
            <div className="space-y-3">
              <Label>Temperature (°C)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={filters.tempMin}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, tempMin: Number(e.target.value) }))
                  }
                  className="w-24"
                  aria-label="Min Temperature"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  value={filters.tempMax}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, tempMax: Number(e.target.value) }))
                  }
                  className="w-24"
                  aria-label="Max Temperature"
                />
              </div>
              <Slider
                value={[filters.tempMin, filters.tempMax]}
                onValueChange={([min, max]) =>
                  setFilters((f) => ({ ...f, tempMin: min, tempMax: max }))
                }
                min={-20}
                max={60}
                step={1}
              />
            </div>

            {/* Salinity */}
            <div className="space-y-3">
              <Label>Salinity (PSU)</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={filters.salMin}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, salMin: Number(e.target.value) }))
                  }
                  className="w-24"
                  aria-label="Min Salinity"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="number"
                  value={filters.salMax}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, salMax: Number(e.target.value) }))
                  }
                  className="w-24"
                  aria-label="Max Salinity"
                />
              </div>
              <Slider
                value={[filters.salMin, filters.salMax]}
                onValueChange={([min, max]) =>
                  setFilters((f) => ({ ...f, salMin: min, salMax: max }))
                }
                min={0}
                max={42}
                step={0.5}
              />
            </div>

            {/* Depth */}
            <div className="space-y-3">
              <Label>Max Depth (m)</Label>
              <Input
                type="number"
                value={filters.depthMax}
                onChange={(e) =>
                  setFilters((f) => ({ ...f, depthMax: Number(e.target.value) }))
                }
                className="w-40"
              />
              <Slider
                value={[filters.depthMax]}
                onValueChange={([val]) =>
                  setFilters((f) => ({ ...f, depthMax: val }))
                }
                min={0}
                max={12000}
                step={100}
              />
            </div>
          </div>
        </ScrollArea>

        <SheetFooter className="mt-auto">
          <Button variant="ghost" onClick={onClear}>
            <Undo2 className="w-4 h-4 mr-2" />
            Reset Filters
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

// --- 🌏 MAIN MAP VIEW COMPONENT ---
export default function MapView() {
  const [selectedLocation, setSelectedLocation] = useState<IOceanData>(
    oceanRegions[0]
  );
  const [clickedLocations, setClickedLocations] = useState<IOceanData[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // --- Controls State ---
  const [integratedView, setIntegratedView] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [isParamsOpen, setIsParamsOpen] = useState(false);

  // --- Memoized Filtering Logic ---
  const filteredLocations = useMemo(() => {
    const all = [...oceanRegions, ...highlightedPlaces, ...clickedLocations];
    return all.filter((r) => {
      if (typeof r.temperature === "number") {
        if (r.temperature < filters.tempMin || r.temperature > filters.tempMax)
          return false;
      }
      if (typeof r.salinity === "number") {
        if (r.salinity < filters.salMin || r.salinity > filters.salMax)
          return false;
      }
      if (typeof r.depth === "number") {
        if (r.depth > filters.depthMax) return false;
      }
      return true;
    });
  }, [filters, clickedLocations]);

  const heatmapData = useMemo(() => {
    // Only use filtered locations that have a temperature
    return filteredLocations
      .filter(loc => typeof loc.temperature === 'number')
      .map((r) => [r.latitude, r.longitude, r.temperature! / 40]);
  }, [filteredLocations]);

  // --- Handlers ---
  const handleLocationSelect = (location: IOceanData) => {
    if (location.isClicked) {
      setClickedLocations((prev) => [...prev, location]);
    }
    setSelectedLocation(location);
    if (!isDesktop) setIsDrawerOpen(true);
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
    toast.success("Filters cleared");
  };

  // --- Map Resize Handling ---
  const mapRef = useRef<L.Map | null>(null);
  const resizeTimeout = useRef<number | null>(null);

  useEffect(() => {
    const invalidate = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };
    // Initial invalidate
    invalidate();

    const onResize = () => {
      if (resizeTimeout.current) {
        window.clearTimeout(resizeTimeout.current);
      }
      resizeTimeout.current = window.setTimeout(() => {
        invalidate();
        resizeTimeout.current = null;
      }, 150);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (resizeTimeout.current) {
        window.clearTimeout(resizeTimeout.current);
      }
    };
  }, []); // Empty dependency array, runs once

  // Sidebar component (memoized)
  const Sidebar = (
    <ScrollArea className="h-full">
      <div className="p-4">
        <SidebarContent location={selectedLocation} />
      </div>
    </ScrollArea>
  );

  return (
    // [PERFECTED] Robust h-screen flex layout
    <div className="h-screen w-full flex flex-col bg-gray-50">
      <Toaster position="top-center" richColors />

  <div className="container mx-auto px-4 py-4 flex flex-col flex-1 min-h-0 h-full">
        {/* --- Header --- */}
        <header className="flex-shrink-0 mb-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                🌍 OceanIQ Live Map
              </h1>
              <p className="text-gray-600">
                AI-Driven Marine Insights & Species Prediction
              </p>
            </div>

            <div className="flex w-full md:w-auto gap-2 items-center">
              <MapSearch onSelect={handleLocationSelect} />
              
              <Button
                variant="outline"
                onClick={() => setIsParamsOpen(true)}
                className="items-center gap-2"
                title="Open Parameters Study"
              >
                <Filter className="w-4 h-4" />
                <span className="hidden md:inline">Parameters</span>
              </Button>

              <Button
                variant={integratedView ? "default" : "outline"}
                onClick={() => {
                  setIntegratedView((s) => !s);
                  toast(
                    `${!integratedView ? "Integrated view enabled" : "Integrated view disabled"}`
                  );
                }}
                className="items-center gap-2"
                title="Toggle Integrated View"
              >
                <Layers className="w-4 h-4" />
                 <span className="hidden md:inline text-sm">
                  {integratedView ? "Integrated" : "Separate"}
                 </span>
              </Button>

              <Button
                variant="ghost"
                onClick={clearFilters}
                className="items-center"
                title="Clear Filters"
                size="icon"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </header>

        {/* [PERFECTED] flex-1 and min-h-0 make this content area fill space */}
  <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0 items-stretch h-full">
          
          {/* --- Map --- */}
          {/* [PERFECTED] flex-1 makes map fill remaining space */}
          <Card className="flex-1 overflow-hidden shadow-xl h-full">
            <MapContainer
              center={[selectedLocation.latitude, selectedLocation.longitude]}
              zoom={3}
              scrollWheelZoom
              style={{ height: "100%", width: "100%", minHeight: 420 }}
              className="leaflet-container"
            >
              {/* Save the Leaflet map instance into mapRef for external invalidation */}
              <SaveMapRef mapRef={mapRef} />
              
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              />

              <LayersControl position="topright">
                <LayersControl.Overlay name="🌡️ Temperature Heatmap" checked>
                  <DynamicHeatmap data={heatmapData} />
                </LayersControl.Overlay>

                <LayersControl.Overlay name="☣️ Pollution Risk" checked>
                  <LayerGroup>
                    {highlightedPlaces
                      .filter((p) =>
                        filteredLocations.some((f) => f.region === p.region)
                      )
                      .map((p, idx) => (
                        <Circle
                          key={idx}
                          center={[p.latitude, p.longitude]}
                          radius={Math.max(5000, p.depth * 800)}
                          pathOptions={{ color: "red", fillOpacity: 0.08 }}
                        >
                          <Popup>
                            Pollution Risk Zone <br /> {p.region}
                          </Popup>
                        </Circle>
                      ))}
                  </LayerGroup>
                </LayersControl.Overlay>
              </LayersControl>

              <>
                {oceanRegions
                  .filter((region) =>
                    filteredLocations.some((f) => f.region === region.region)
                  )
                  .map((region) => (
                    <Marker
                      key={region.region}
                      position={[region.latitude, region.longitude]}
                      icon={defaultIcon}
                      eventHandlers={{ click: () => handleLocationSelect(region) }}
                    >
                      <Popup>
                        <strong>{region.region}</strong>
                        <br />🌡 Temp: {region.temperature}°C
                        <br />🌊 Salinity: {region.salinity} PSU
                      </Popup>
                    </Marker>
                  ))}

                {highlightedPlaces
                  .filter((place) =>
                    filteredLocations.some((f) => f.region === place.region)
                  )
                  .map((place) => (
                    <Marker
                      key={place.region}
                      position={[place.latitude, place.longitude]}
                      icon={highlightIcon}
                      eventHandlers={{ click: () => handleLocationSelect(place) }}
                    >
                      <Tooltip direction="right" permanent>
                        {place.region}
                      </Tooltip>
                    </Marker>
                  ))}

                {clickedLocations
                  .filter((loc) =>
                    filteredLocations.some(
                      (f) => f.region === loc.region && f.timestamp === loc.timestamp
                    )
                  )
                  .map((loc) => (
                    <Marker
                      key={`${loc.region}-${loc.timestamp ?? ""}`}
                      position={[loc.latitude, loc.longitude]}
                      icon={clickedIcon}
                      eventHandlers={{ click: () => handleLocationSelect(loc) }}
                    >
                      <Popup>
                        <strong>{loc.region}</strong>
                        <br />
                        Custom analyzed point.
                      </Popup>
                    </Marker>
                  ))}

                {integratedView && (
                  <LayerGroup>
                    {filteredLocations.map((p, i) => (
                      <Circle
                        key={`int-${i}`}
                        center={[p.latitude, p.longitude]}
                        radius={Math.max(10000, (p.depth ?? 50) * 200)}
                        pathOptions={{ color: "#1f6feb", weight: 1, fillOpacity: 0.02 }}
                      />
                    ))}
                  </LayerGroup>
                )}
              </>

              <FlyToLocation
                lat={selectedLocation.latitude}
                lng={selectedLocation.longitude}
              />
              <MapClickEvents onLocationSelect={handleLocationSelect} />
            </MapContainer>
          </Card>

          {/* --- Sidebar (Desktop) --- */}
          {/* [PERFECTED] Fixed width, fills height via flex */}
          {isDesktop ? (
            <Card className="w-full md:w-96 shrink-0 overflow-hidden shadow-xl h-full">
              {Sidebar}
            </Card>
          ) : (
            
            // --- Drawer (Mobile) ---
            <Drawer
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
              snapPoints={[0.9, 0.5]}
            >
              <DrawerContent className="h-[90vh]">
                <DrawerHeader>
                  <DrawerTitle className="text-center">
                    Location Analysis
                  </DrawerTitle>
                </DrawerHeader>
                <div className="overflow-auto">{Sidebar}</div>
              </DrawerContent>
            </Drawer>
          )}
        </div>
      </div>

      {/* --- Parameters Sheet --- */}
      <ParametersSheet
        isOpen={isParamsOpen}
        onOpenChange={setIsParamsOpen}
        filters={filters}
        setFilters={setFilters}
        onClear={clearFilters}
      />
    </div>
  );
}