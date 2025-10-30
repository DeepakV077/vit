"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
} from "recharts";
import { motion } from "framer-motion";
import {
  Thermometer, Droplets, Anchor, Activity, AlertTriangle, CalendarIcon, Brain,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns";
import { cn } from "@/components/ui/utils";

import { oceanRegions, temperatureData, speciesDiversityData } from "@/utils/mockData";

// ======================
// Types
// ======================
interface RegionData {
  region: string;
  temperature: number;
  salinity: number;
  depth: number;
  density: number;
  latitude: number;
  longitude: number;
  timestamp: string;
}

type Severity = "info" | "warning" | "critical";

interface Insight {
  parameter: string;
  severity: Severity;
  cause: string;
  recommendation: string;
}

// ======================
// Root Component
// ======================
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<string>(oceanRegions[0].region);
  const [regionData, setRegionData] = useState<RegionData[]>(oceanRegions);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(2025, 9, 1),
    to: addDays(new Date(2025, 9, 1), 20),
  });

  // Mode & Data Simulation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      setDarkMode(mq.matches);
      const handler = (e: MediaQueryListEvent) => setDarkMode(e.matches);
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1200);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRegionData((prev) =>
        prev.map((r) =>
          r.region === selectedRegion
            ? {
                ...r,
                temperature: parseFloat((r.temperature + (Math.random() - 0.5) * 0.3).toFixed(2)),
                salinity: parseFloat((r.salinity + (Math.random() - 0.5) * 0.1).toFixed(2)),
                timestamp: new Date().toISOString(),
              }
            : r
        )
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [selectedRegion]);

  const selected = regionData.find((r) => r.region === selectedRegion)!;

  const insights: Insight[] = useMemo(() => {
    const arr: Insight[] = [];
    if (selected.temperature > 30)
      arr.push({
        parameter: "Temperature",
        severity: "critical",
        cause: "Extreme surface heating due to El Niño.",
        recommendation: "Deploy emergency coral monitoring sensors.",
      });
    else if (selected.temperature > 26)
      arr.push({
        parameter: "Temperature",
        severity: "warning",
        cause: "Above-average SSTs detected.",
        recommendation: "Monitor for plankton bloom patterns.",
      });
    else
      arr.push({
        parameter: "Temperature",
        severity: "info",
        cause: "Optimal temperature range.",
        recommendation: "Maintain observation cycle.",
      });

    if (selected.salinity < 30)
      arr.push({
        parameter: "Salinity",
        severity: "warning",
        cause: "Possible freshwater influx from rainfall or runoff.",
        recommendation: "Correlate with river discharge data.",
      });

    return arr;
  }, [selected]);

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <DashboardError error={error} />;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className={cn(
        "min-h-screen py-12",
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-100 text-gray-900"
      )}
    >
      <div className="mx-auto max-w-7xl px-8">
        <ResizablePanelGroup direction="horizontal" className="min-h-[72vh] rounded-2xl overflow-hidden shadow-2xl">
          <ResizablePanel defaultSize={75}>
            <div className="px-10 py-8 overflow-y-auto space-y-8 bg-white/60 dark:bg-gray-800/50 backdrop-blur-lg rounded-r-2xl">
              <Header
                all={regionData}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                dateRange={dateRange}
                setDateRange={setDateRange}
              />
              <Metrics data={selected} />
              <div className="grid xl:grid-cols-2 gap-8">
                <Charts />
                <RadarStats data={selected} />
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={25}>
            <div className="h-full bg-gradient-to-b from-blue-50/80 to-white/60 dark:from-gray-900/70 dark:to-gray-800/60 p-6">
              <InsightsPanel insights={insights} data={selected} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </motion.div>
  );
}

// ======================
// Header
// ======================
const Header = ({ all, selectedRegion, setSelectedRegion, dateRange, setDateRange }: any) => (
  <div>
    <h1 className="text-4xl font-extrabold mb-1 tracking-tight">🌊 OceanIQ Dashboard</h1>
    <p className="text-sm text-slate-500 dark:text-slate-300 mb-4">AI-Enhanced Marine Monitoring and Ecosystem Insights</p>

    <div className="flex flex-wrap gap-6 items-center">
      <div>
        <p className="text-xs text-slate-500 mb-2">Select Region</p>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-64 rounded-xl border border-gray-200/80 bg-white/60 shadow-sm">
            <SelectValue placeholder="Choose region" />
          </SelectTrigger>
          <SelectContent>
            {all.map((r: any) => (
              <SelectItem key={r.region} value={r.region}>
                {r.region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-2">Date Range</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start text-left font-medium rounded-xl shadow-sm bg-white/50 border-gray-200">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from
                ? `${format(dateRange.from, "LLL dd, y")} - ${format(dateRange.to!, "LLL dd, y")}`
                : "Pick date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="p-4">
              <Calendar mode="range" selected={dateRange} onSelect={setDateRange} numberOfMonths={2} />
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  </div>
);

// ======================
// Metrics Cards
// ======================
const Metrics = ({ data }: any) => {
  const metrics = [
    { label: "Temperature", val: `${data.temperature}°C`, icon: <Thermometer />, color: "from-orange-300 to-red-400" },
    { label: "Salinity", val: `${data.salinity} PSU`, icon: <Droplets />, color: "from-blue-300 to-cyan-400" },
    { label: "Depth", val: `${data.depth} m`, icon: <Anchor />, color: "from-teal-300 to-emerald-400" },
    { label: "Density", val: `${data.density} kg/m³`, icon: <Activity />, color: "from-purple-300 to-pink-400" },
  ];

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {metrics.map((m, i) => (
        <motion.div key={i} whileHover={{ scale: 1.02 }} className="transition-transform">
          <Card className="p-5 shadow-lg bg-white/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100/60">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-slate-500">{m.label}</p>
                <p className="text-2xl font-semibold mt-1">{m.val}</p>
                <p className="text-xs text-slate-400 mt-1">Region avg: —</p>
              </div>
              <div
                className={cn(
                  "p-3 rounded-lg text-white flex items-center justify-center shadow-sm",
                  "bg-gradient-to-br",
                  m.color
                )}
                style={{ width: 56, height: 56 }}
              >
                {m.icon}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// ======================
// Charts
// ======================
const Charts = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
    <Card className="p-6 shadow-lg bg-white/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100/60">
      <h3 className="text-lg mb-4 font-semibold">Temperature vs Salinity Trends</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={temperatureData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp" stroke="#f97316" name="Temp (°C)" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="salinity" stroke="#3b82f6" name="Salinity (PSU)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>

    <Card className="p-6 shadow-lg bg-white/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100/60">
      <h3 className="text-lg mb-4 font-semibold">Species Suitability Index</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={speciesDiversityData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="region" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="coral" fill="#ec4899" radius={[6, 6, 0, 0]} />
            <Bar dataKey="tuna" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            <Bar dataKey="mangrove" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  </motion.div>
);

// ======================
// Radar Card
// ======================
const RadarStats = ({ data }: any) => (
  <Card className="p-6 shadow-lg bg-white/80 dark:bg-gray-800/60 rounded-2xl border border-gray-100/60">
    <h3 className="text-lg mb-4 font-semibold">Environmental Parameter Radar</h3>
    <div className="h-[420px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart
          data={[
            { parameter: "Temperature", value: (data.temperature / 35) * 100 },
            { parameter: "Salinity", value: (data.salinity / 40) * 100 },
            { parameter: "Depth", value: (data.depth / 100) * 100 },
            { parameter: "Density", value: ((data.density - 1020) / 10) * 100 },
            { parameter: "Biodiversity", value: 75 },
          ]}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="parameter" />
          <PolarRadiusAxis />
          <Radar dataKey="value" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.6} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

// ======================
// Insights Panel
// ======================
const InsightsPanel = ({ insights, data }: any) => (
  <Card className="p-4 h-full overflow-y-auto bg-transparent border-none">
    <div className="sticky top-0 bg-transparent py-2">
      <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
        <Brain className="w-5 h-5 text-blue-600" /> AI Insights
      </h3>
      <p className="text-xs text-slate-500">Last Update: {new Date(data.timestamp).toLocaleTimeString()}</p>
    </div>

    <div className="mt-4 space-y-4">
      {insights.map((ins: any, i: number) => (
        <motion.div
          key={i}
          className="p-4 rounded-xl bg-white/70 dark:bg-gray-800/60 border border-gray-100/60 shadow-sm"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex justify-between items-start">
            <div>
              <strong className="block text-sm">{ins.parameter}</strong>
              <p className="text-xs text-slate-500 mt-1"><b>Cause:</b> {ins.cause}</p>
              <p className="text-xs text-slate-500 mt-1"><b>Recommendation:</b> {ins.recommendation}</p>
            </div>
            <Badge
              variant="outline"
              className={cn(
                "text-xs px-3 py-1 rounded-full",
                ins.severity === "critical"
                  ? "bg-red-100 text-red-800"
                  : ins.severity === "warning"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-green-100 text-green-800"
              )}
            >
              {ins.severity.toUpperCase()}
            </Badge>
          </div>
        </motion.div>
      ))}
    </div>
  </Card>
);

// ======================
// Loading + Error
// ======================
const DashboardSkeleton = () => (
  <div className="p-8 space-y-6 max-w-7xl mx-auto">
    <Skeleton className="h-8 w-1/3 rounded-xl" />
    <Skeleton className="h-4 w-1/2 rounded-xl" />
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32 rounded-xl" />)}
    </div>
    <Skeleton className="h-[420px] rounded-2xl" />
  </div>
);

const DashboardError = ({ error }: { error: string }) => (
  <div className="flex items-center justify-center h-screen">
    <Alert variant="destructive" className="max-w-md">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error Loading Data</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  </div>
);
