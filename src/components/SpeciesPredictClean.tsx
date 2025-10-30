import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import {
    Brain,
    AlertCircle,
    CheckCircle,
    TrendingUp,
    MapPin,
    Download,
    Share2,
    Trash2,
    Filter,
    FileText,
    Activity,
    Zap,
    PlusSquare,
    Columns,
    X
} from 'lucide-react';
import {
    predictSpeciesSuitability,
    type OceanParameter,
    type SpeciesPrediction,
    marineSpeciesData,
    oceanRegions,
} from '../utils/mockData';
import synthetic from '../utils/syntheticData';

function useDebounced<T>(value: T, ms = 250) {
    const [debounced, setDebounced] = useState(value);
    useEffect(() => {
        const id = setTimeout(() => setDebounced(value), ms);
        return () => clearTimeout(id);
    }, [value, ms]);
    return debounced;
}

const MiniParamBars = React.memo(function MiniParamBars({
    label,
    value,
    min,
    max
}: {
    label: string;
    value?: number;
    min: number;
    max: number;
}) {
    const clamped = value == null ? min : Math.max(min, Math.min(max, value));
    const pct = ((clamped - min) / (max - min || 1)) * 100;
    return (
        <div className="space-y-1">
            <div className="flex justify-between text-xs text-gray-600">
                <span>{label}</span>
                <span className="font-medium">{value ?? '—'}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-500 to-blue-400" style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
});

export function SpeciesPredictClean() {
    // sensible defaults from first ocean region
    const defaultParams: Partial<OceanParameter> = {
        latitude: oceanRegions[0].latitude,
        longitude: oceanRegions[0].longitude,
        temperature: oceanRegions[0].temperature,
        salinity: oceanRegions[0].salinity,
        depth: oceanRegions[0].depth,
        density: oceanRegions[0].density,
        region: oceanRegions[0].region,
    };

    const [parameters, setParameters] = useState<Partial<OceanParameter>>(defaultParams);
    const [predictions, setPredictions] = useState<SpeciesPrediction[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [advanced, setAdvanced] = useState(false);
    const [selectedSpecies, setSelectedSpecies] = useState<string[]>([]);
    const [history, setHistory] = useState<any[]>([]);
    const [showOnlyHighRisk, setShowOnlyHighRisk] = useState(false);

    // advanced
    const [ph, setPh] = useState<number | undefined>(8.1);
    const [dissolvedOxygen, setDissolvedOxygen] = useState<number | undefined>(6.5);
    const [turbidity, setTurbidity] = useState<number | undefined>(1.2);

    // scenarios (simple)
    const [scenarios, setScenarios] = useState<any[]>([]);
    const [compareMode, setCompareMode] = useState(false);
    const [compareSelection, setCompareSelection] = useState<string[]>([]);

    // UI & paging
    const [page, setPage] = useState(1);
    const PAGE_SIZE = 9;
    const [speciesFilter, setSpeciesFilter] = useState('');
    const [modalPrediction, setModalPrediction] = useState<SpeciesPrediction | null>(null);

    const analyzeRef = useRef<{ aborted: boolean } | null>(null);
    const speciesOptions = useMemo(() => marineSpeciesData.map((s) => s.name), []);
    const sampleLocations = useMemo(() => synthetic.syntheticOceanDataset.slice(0, 8), []);

    const debouncedParams = useDebounced(parameters, 200);
    const debouncedPh = useDebounced(ph, 200);
    const debouncedDo = useDebounced(dissolvedOxygen, 200);
    const debouncedTur = useDebounced(turbidity, 200);

    useEffect(() => {
        try {
            const raw = localStorage.getItem('species_predict_history_v1');
            if (raw) setHistory(JSON.parse(raw));
        } catch {
            setHistory([]);
        }
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            try {
                localStorage.setItem('species_predict_history_v1', JSON.stringify(history));
            } catch {}
        }, 400);
        return () => clearTimeout(id);
    }, [history]);

    const validateParams = useCallback((p: Partial<OceanParameter>) => {
        const errs: string[] = [];
        if (p.temperature == null) errs.push('Temperature is missing');
        if (p.salinity == null) errs.push('Salinity is missing');
        if (p.depth == null) errs.push('Depth is missing');
        return errs;
    }, []);

    const applyPreset = useCallback((preset: 'Tropical' | 'Temperate' | 'Estuary') => {
        if (preset === 'Tropical') {
            setParameters((p) => ({ ...p, temperature: 28.5, salinity: 34.5, depth: 20, density: 1025, region: 'Tropical' }));
            setPh(8.1);
            setDissolvedOxygen(6.8);
            setTurbidity(1.0);
        } else if (preset === 'Temperate') {
            setParameters((p) => ({ ...p, temperature: 16.5, salinity: 33.5, depth: 80, density: 1027, region: 'Temperate' }));
            setPh(8.0);
            setDissolvedOxygen(7.2);
            setTurbidity(2.5);
        } else {
            setParameters((p) => ({ ...p, temperature: 24, salinity: 20, depth: 10, density: 1023, region: 'Estuary' }));
            setPh(7.8);
            setDissolvedOxygen(5.5);
            setTurbidity(8.0);
        }
    }, []);

    const applySampleLocation = useCallback((sampleIndex: number) => {
        const s = sampleLocations[sampleIndex];
        if (!s) return;
        setParameters((p) => ({ ...p,
            latitude: s.latitude,
            longitude: s.longitude,
            temperature: s.temperature,
            salinity: s.salinity,
            depth: s.depth,
            density: s.density,
            region: s.region,
        }));
    }, [sampleLocations]);

    const useMyLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert('Geolocation not supported in this browser');
            return;
        }
        navigator.geolocation.getCurrentPosition((pos) => {
            setParameters((p) => ({ ...p, latitude: pos.coords.latitude, longitude: pos.coords.longitude, region: 'My Location' }));
        }, () => alert('Unable to get your location'));
    }, []);

    const toggleSpeciesSelection = useCallback((s: string) => {
        setSelectedSpecies((sel) => (sel.includes(s) ? sel.filter((x) => x !== s) : [...sel, s]));
    }, []);

    const clearHistory = useCallback(() => setHistory([]), []);

    const exportCSV = useCallback(() => {
        if (predictions.length === 0) return;
        const header = ['species', 'suitabilityScore', 'riskIndex', 'confidenceLevel', 'reasoning'];
        const rows = predictions.map((p) => {
            const cells = [p.species, String(p.suitabilityScore), p.riskIndex, String(p.confidenceLevel ?? ''), (p.reasoning ?? '').replace(/\n/g, ' ')];
            return cells.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',');
        });
        const csv = [header.join(','), ...rows].join('\n');
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `species_predictions_${Date.now()}.csv`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }, [predictions]);

    const exportJSON = useCallback(() => {
        if (predictions.length === 0) return;
        const obj = { parameters, predictions, generatedAt: Date.now() };
        const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a'); a.href = url; a.download = `species_predictions_${Date.now()}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    }, [predictions, parameters]);

    const filteredPredictions = useMemo(() => (showOnlyHighRisk ? predictions.filter((p) => p.riskIndex !== 'Low') : predictions), [predictions, showOnlyHighRisk]);

    const handlePredict = useCallback(async () => {
        const errs = validateParams(parameters);
        if (errs.length) { alert('Please fix: ' + errs.join('; ')); return; }
        setIsAnalyzing(true); analyzeRef.current = { aborted: false };
        try {
            await new Promise<void>((r) => setTimeout(r, 250));
            const params = { latitude: parameters.latitude ?? 0, longitude: parameters.longitude ?? 0, temperature: parameters.temperature ?? 0, salinity: parameters.salinity ?? 0, depth: parameters.depth ?? 0, density: parameters.density ?? 0, region: parameters.region ?? '' } as OceanParameter;
            // attach advanced optional params to reasoning in mock predictor when available
            const preds = predictSpeciesSuitability(params);
            const finalPreds = selectedSpecies.length ? preds.filter((p) => selectedSpecies.includes(p.species)) : preds;
            setPredictions(finalPreds);
            setHistory((prev) => [{ id: String(Date.now()), timestamp: Date.now(), params, predictions: finalPreds }, ...prev].slice(0, 50));
            setPage(1);
        } finally { setIsAnalyzing(false); analyzeRef.current = null; }
    }, [parameters, selectedSpecies, validateParams]);

    const copyShareLink = useCallback(() => {
        try { const serialized = encodeURIComponent(JSON.stringify({ parameters, selectedSpecies })); const url = `${window.location.origin}${window.location.pathname}?share=${serialized}`; navigator.clipboard?.writeText(url); alert('Share link copied to clipboard'); } catch (e) { alert('Unable to create share link'); }
    }, [parameters, selectedSpecies]);

    const saveScenario = useCallback(() => {
        const errs = validateParams(parameters);
        if (errs.length) { alert('Please fix before saving: ' + errs.join('; ')); return; }
        const id = String(Date.now());
        const params = { latitude: parameters.latitude ?? 0, longitude: parameters.longitude ?? 0, temperature: parameters.temperature ?? 0, salinity: parameters.salinity ?? 0, depth: parameters.depth ?? 0, density: parameters.density ?? 0, region: parameters.region ?? '' } as OceanParameter;
        const preds = predictSpeciesSuitability(params);
        const sc = { id, name: `Scenario ${new Date().toLocaleTimeString()}`, params, predictions: preds };
        setScenarios((s) => [sc, ...s].slice(0, 30)); alert('Scenario saved');
    }, [parameters, validateParams]);

    const deleteScenario = useCallback((id: string) => setScenarios((s) => s.filter((x) => x.id !== id)), []);
    const clearScenarios = useCallback(() => setScenarios([]), []);

    const exportScenariosJSON = useCallback(() => { if (scenarios.length === 0) return; const blob = new Blob([JSON.stringify(scenarios, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `species_scenarios_${Date.now()}.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }, [scenarios]);

    const importScenariosJSON = useCallback((file: File | null) => { if (!file) return; const reader = new FileReader(); reader.onload = () => { try { const parsed = JSON.parse(String(reader.result)); if (Array.isArray(parsed)) { const good = parsed.filter((p) => p.id && p.params && p.predictions); if (good.length) setScenarios((s) => [...good, ...s].slice(0, 50)); alert(`Imported ${good.length} scenarios`); } else { alert('Invalid scenarios file'); } } catch (e) { alert('Failed to parse file'); } }; reader.readAsText(file); }, []);

    const compareTwoScenarios = useMemo(() => {
        if (!compareMode || compareSelection.length !== 2) return null;
        const [aId, bId] = compareSelection; const a = scenarios.find((s) => s.id === aId); const b = scenarios.find((s) => s.id === bId); if (!a || !b) return null;
        const allSpecies = Array.from(new Set([...a.predictions.map((p) => p.species), ...b.predictions.map((p) => p.species)])).sort();
        const rows = allSpecies.map((sp) => { const pa = a.predictions.find((p) => p.species === sp); const pb = b.predictions.find((p) => p.species === sp); const scoreA = pa?.suitabilityScore ?? 0; const scoreB = pb?.suitabilityScore ?? 0; const delta = Math.round((scoreB - scoreA) * 10) / 10; return { species: sp, a: scoreA, b: scoreB, delta }; });
        return { a, b, rows };
    }, [compareMode, compareSelection, scenarios]);

    const histogramBuckets = useMemo(() => { const buckets = new Array(10).fill(0); for (const p of predictions) { const idx = Math.min(9, Math.floor((p.suitabilityScore || 0) / 10)); buckets[idx]++; } return buckets; }, [predictions]);

    // species list filtering
    const visibleSpecies = useMemo(() => {
        if (!speciesFilter) return speciesOptions;
        const f = speciesFilter.toLowerCase();
        return speciesOptions.filter((s) => s.toLowerCase().includes(f));
    }, [speciesOptions, speciesFilter]);

    const toggleSelectAllVisible = useCallback(() => {
        const all = visibleSpecies;
        const allSelected = all.every((s) => selectedSpecies.includes(s));
        if (allSelected) {
            setSelectedSpecies((sel) => sel.filter((x) => !all.includes(x)));
        } else {
            setSelectedSpecies((sel) => Array.from(new Set([...sel, ...all])));
        }
    }, [visibleSpecies, selectedSpecies]);

    const totalPages = Math.max(1, Math.ceil(filteredPredictions.length / PAGE_SIZE));

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="container mx-auto px-6">
                <div className="mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Brain className="w-10 h-10 text-purple-600" />
                        <div>
                            <h1 className="text-3xl font-semibold text-gray-900">AI Species Prediction</h1>
                            <p className="text-sm text-gray-600">Predict marine species habitability using environmental parameters and advanced insights</p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <Button onClick={() => applyPreset('Tropical')} className="inline-flex items-center gap-2 px-3 py-2"><Zap className="w-4 h-4" /> Tropical</Button>
                        <Button onClick={() => applyPreset('Temperate')} className="inline-flex items-center gap-2 px-3 py-2"><Activity className="w-4 h-4" /> Temperate</Button>
                        <Button onClick={() => applyPreset('Estuary')} className="inline-flex items-center gap-2 px-3 py-2"><MapPin className="w-4 h-4" /> Estuary</Button>
                        <Button variant="outline" onClick={() => setCompareMode((c) => !c)} className="inline-flex items-center gap-2 px-3 py-2"><Columns className="w-4 h-4" /> {compareMode ? 'Compare: On' : 'Compare: Off'}</Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-6">
                    {/* Left panel: controls */}
                    <Card className="p-6 lg:col-span-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-medium text-gray-900">Parameters</h3>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => setAdvanced((a) => !a)} className="text-sm px-2 py-1">{advanced ? 'Hide advanced' : 'Advanced'}</Button>
                                <Button onClick={handlePredict} disabled={isAnalyzing} className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2">{isAnalyzing ? 'Analyzing...' : 'Run'}</Button>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="grid grid-cols-1 gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <Label htmlFor="lat" className="min-w-max">Latitude</Label>
                                    <Input id="lat" type="number" step="0.0001" value={parameters.latitude ?? ''} onChange={(e) => setParameters({ ...parameters, latitude: parseFloat(e.target.value || '0') })} className="w-36" />
                                    <Label htmlFor="lon" className="min-w-max">Longitude</Label>
                                    <Input id="lon" type="number" step="0.0001" value={parameters.longitude ?? ''} onChange={(e) => setParameters({ ...parameters, longitude: parseFloat(e.target.value || '0') })} className="w-36" />
                                    <Button variant="outline" onClick={useMyLocation} className="ml-2 px-2 py-1">Use my location</Button>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Label htmlFor="sampleSelect" className="min-w-max">Quick samples</Label>
                                    <select id="sampleSelect" aria-label="Sample locations" className="rounded border p-1" onChange={(e) => applySampleLocation(Number(e.target.value))}>
                                        <option value="">Choose sample</option>
                                        {sampleLocations.map((s, idx) => (<option key={idx} value={idx}>{s.region} ({s.latitude.toFixed(2)}, {s.longitude.toFixed(2)})</option>))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <Label htmlFor="temperature">Temperature (°C)</Label>
                                    <div className="flex items-center gap-3">
                                        <input id="temperature" type="range" min="-2" max="40" step="0.1" value={(parameters.temperature ?? 0)} onChange={(e) => setParameters({ ...parameters, temperature: parseFloat(e.target.value) })} className="flex-1" />
                                        <div className="w-20 text-right text-sm text-gray-700">{(parameters.temperature ?? 0).toFixed(1)}°C</div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="salinity">Salinity (PSU)</Label>
                                    <div className="flex items-center gap-3">
                                        <input id="salinity" type="range" min="0" max="40" step="0.1" value={(parameters.salinity ?? 0)} onChange={(e) => setParameters({ ...parameters, salinity: parseFloat(e.target.value) })} className="flex-1" />
                                        <div className="w-20 text-right text-sm text-gray-700">{(parameters.salinity ?? 0).toFixed(1)}</div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="depth">Depth (m)</Label>
                                    <div className="flex items-center gap-3">
                                        <input id="depth" type="range" min="0" max="1000" step="1" value={(parameters.depth ?? 0)} onChange={(e) => setParameters({ ...parameters, depth: parseFloat(e.target.value) })} className="flex-1" />
                                        <div className="w-20 text-right text-sm text-gray-700">{Math.round(parameters.depth ?? 0)} m</div>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="density">Density (kg/m³)</Label>
                                    <div className="flex items-center gap-3">
                                        <input id="density" type="range" min="1000" max="1030" step="0.1" value={(parameters.density ?? 1018)} onChange={(e) => setParameters({ ...parameters, density: parseFloat(e.target.value) })} className="flex-1" />
                                        <div className="w-20 text-right text-sm text-gray-700">{(parameters.density ?? 0).toFixed(1)}</div>
                                    </div>
                                </div>
                            </div>

                            {advanced && (
                                <div className="pt-3 border-t border-gray-100 space-y-3">
                                    <div>
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <Label htmlFor="ph">pH</Label>
                                            <div className="text-sm text-gray-700">{(ph ?? 0).toFixed(2)}</div>
                                        </div>
                                        <input id="ph" type="range" min="6.5" max="9.5" step="0.01" value={(ph ?? 8.1)} onChange={(e) => setPh(parseFloat(e.target.value))} className="w-full" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <Label htmlFor="do">Dissolved O₂ (mg/L)</Label>
                                            <div className="text-sm text-gray-700">{(dissolvedOxygen ?? 0).toFixed(1)}</div>
                                        </div>
                                        <input id="do" type="range" min="0" max="14" step="0.1" value={(dissolvedOxygen ?? 6.5)} onChange={(e) => setDissolvedOxygen(parseFloat(e.target.value))} className="w-full" />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <Label htmlFor="turbidity">Turbidity (NTU)</Label>
                                            <div className="text-sm text-gray-700">{(turbidity ?? 0).toFixed(1)}</div>
                                        </div>
                                        <input id="turbidity" type="range" min="0" max="50" step="0.1" value={(turbidity ?? 1.2)} onChange={(e) => setTurbidity(parseFloat(e.target.value))} className="w-full" />
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="pt-3 border-t border-gray-100 space-y-3">
                            <div className="flex items-center justify-between">
                                <h4 className="text-sm font-medium text-gray-700">Species selection</h4>
                                <div className="text-xs text-gray-500">{selectedSpecies.length} selected</div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <Input placeholder="Filter species..." value={speciesFilter} onChange={(e) => setSpeciesFilter(e.target.value)} />
                                    <Button variant="outline" onClick={toggleSelectAllVisible} className="px-3">Toggle visible</Button>
                                </div>

                                <div className="max-h-40 overflow-auto border rounded p-2 bg-white">
                                    {visibleSpecies.length === 0 ? (
                                        <div className="text-xs text-gray-500">No species match.</div>
                                    ) : (
                                        visibleSpecies.map((s) => (
                                            <label key={s} className="flex items-center gap-2 text-sm py-1">
                                                <input type="checkbox" checked={selectedSpecies.includes(s)} onChange={() => toggleSpeciesSelection(s)} />
                                                <span className="truncate">{s}</span>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2 text-xs text-gray-600">
                                    <FileText className="w-4 h-4" /> <span>{predictions.length} results saved</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" onClick={exportCSV}><Download className="w-4 h-4" /> CSV</Button>
                                    <Button variant="ghost" onClick={exportJSON}><FileText className="w-4 h-4" /> JSON</Button>
                                </div>
                            </div>
                        </div>

                        <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                            <div className="text-xs text-gray-600">Scenarios: {scenarios.length}</div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={saveScenario} className="px-2 py-1"><PlusSquare className="w-4 h-4" /> Save</Button>
                                <Button variant="outline" onClick={clearScenarios} className="px-2 py-1"><Trash2 className="w-4 h-4" /> Clear</Button>
                            </div>
                        </div>
                    </Card>

                    {/* Right panel: predictions, histogram, compare */}
                    <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-semibold text-gray-900">Predictions</h2>
                                <Badge>{predictions.length} results</Badge>
                                <div className="text-sm text-gray-500">Showing: {showOnlyHighRisk ? 'Medium/High risk' : 'All'}</div>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="inline-flex items-center gap-2 text-sm">
                                    <input type="checkbox" checked={showOnlyHighRisk} onChange={(e) => setShowOnlyHighRisk(e.target.checked)} />
                                    Only medium/high risk
                                </label>
                                <Button variant="ghost" onClick={() => { setPredictions([]); }} className="inline-flex items-center gap-2"><Trash2 className="w-4 h-4" /> Clear</Button>
                                <Button onClick={copyShareLink} variant="outline" className="inline-flex items-center gap-2"><Share2 className="w-4 h-4" /> Share</Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {/* histogram + stats */}
                            <Card className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-gray-600">Suitability distribution</div>
                                        <div className="text-xs text-gray-500 mt-1">Buckets 0–9 (per 10%)</div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-sm text-gray-700">Avg: {(predictions.reduce((s, p) => s + (p.suitabilityScore || 0), 0) / Math.max(1, predictions.length)).toFixed(1)}%</div>
                                        <div className="text-sm text-gray-700">High risk: {predictions.filter(p => p.riskIndex === 'High').length}</div>
                                    </div>
                                </div>

                                <div className="mt-3 flex items-end gap-2 h-28">
                                    {histogramBuckets.map((count, idx) => (
                                        <div key={idx} className="flex-1 flex items-end">
                                            <div title={`${idx * 10}% - ${idx * 10 + 9}%: ${count}`} className="w-full bg-gray-200 rounded-t">
                                                <div style={{ height: `${Math.min(100, (count / Math.max(1, Math.max(...histogramBuckets))) * 100)}%` }} className="bg-purple-500 rounded-t transition-all" />
                                            </div>
                                            <div className="text-xs text-center mt-1 w-full">{idx}</div>
                                        </div>
                                    ))}
                                </div>
                            </Card>

                            {isAnalyzing ? (
                                <div className="grid md:grid-cols-3 gap-4">
                                    {[1,2,3].map((i)=>(<Card key={i} className="p-6 animate-pulse"><div className="h-6 bg-gray-200 rounded w-3/4 mb-4"/><div className="h-4 bg-gray-200 rounded mb-3"/><div className="h-4 bg-gray-200 rounded mb-2"/><div className="h-6 bg-gray-200 rounded w-1/2 mt-4"/></Card>))}
                                </div>
                            ) : (
                                <div className="grid md:grid-cols-3 gap-4">
                                    {filteredPredictions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map((pred) => {
                                        const ScoreIcon = pred.suitabilityScore >= 75 ? CheckCircle : pred.suitabilityScore >= 50 ? TrendingUp : AlertCircle;
                                        return (
                                            <Card key={pred.species} className="p-4 cursor-pointer hover:shadow-lg transition" onClick={() => setModalPrediction(pred)}>
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-medium text-gray-900">{pred.species}</h4>
                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-3">{pred.reasoning}</p>
                                                    </div>
                                                    <div className="flex-shrink-0 text-right">
                                                        <ScoreIcon className={`w-7 h-7 ${pred.suitabilityScore >= 75 ? 'text-green-600' : pred.suitabilityScore >= 50 ? 'text-yellow-600' : 'text-red-600'}`} />
                                                        <div className="text-2xl font-semibold text-gray-900 mt-1">{pred.suitabilityScore}%</div>
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex items-center justify-between">
                                                    <div className="text-sm text-gray-600">Risk</div>
                                                    <Badge className={pred.riskIndex === 'Low' ? 'bg-green-100 text-green-800' : pred.riskIndex === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{pred.riskIndex}</Badge>
                                                </div>
                                            </Card>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* pagination & controls */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Button variant="outline" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="px-2 py-1">Prev</Button>
                                <div>Page {page} / {totalPages}</div>
                                <Button variant="outline" onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-2 py-1">Next</Button>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={exportCSV} className="px-2 py-1"><Download className="w-4 h-4" /> Export</Button>
                                <Button variant="outline" onClick={() => { setCompareMode((c) => !c); setCompareSelection([]); }} className="px-2 py-1"><Columns className="w-4 h-4" /> Compare</Button>
                            </div>
                        </div>

                        {/* compare view if enabled */}
                        {compareMode && (
                            <Card className="p-4">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="text-sm font-medium">Compare Scenarios</div>
                                    <div className="text-sm text-gray-500">Select two to compare</div>
                                </div>
                                <div className="flex gap-3 flex-wrap">
                                    {scenarios.map((s) => (
                                        <label key={s.id} className="inline-flex items-center gap-2 border rounded px-3 py-1">
                                            <input type="checkbox" checked={compareSelection.includes(s.id)} onChange={(e) => {
                                                setCompareSelection((curr) => {
                                                    if (curr.includes(s.id)) return curr.filter((x) => x !== s.id);
                                                    if (curr.length >= 2) return [curr[1], s.id]; // keep last two
                                                    return [...curr, s.id];
                                                });
                                            }} />
                                            <span className="text-sm">{s.name}</span>
                                        </label>
                                    ))}
                                </div>

                                {compareTwoScenarios ? (
                                    <div className="mt-4 overflow-auto">
                                        <div className="text-sm text-gray-600 mb-2">Delta is B - A (positive means scenario B improved suitability)</div>
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-left text-xs text-gray-500">
                                                    <th>Species</th>
                                                    <th>{compareTwoScenarios.a.name} (%)</th>
                                                    <th>{compareTwoScenarios.b.name} (%)</th>
                                                    <th>Delta</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {compareTwoScenarios.rows.map((r) => (
                                                    <tr key={r.species} className="border-t">
                                                        <td className="py-1">{r.species}</td>
                                                        <td className="py-1">{r.a}</td>
                                                        <td className="py-1">{r.b}</td>
                                                        <td className={`py-1 ${r.delta > 0 ? 'text-green-600' : r.delta < 0 ? 'text-red-600' : 'text-gray-700'}`}>{r.delta}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="mt-3 text-xs text-gray-500">Pick two scenarios to see comparison.</div>
                                )}
                            </Card>
                        )}
                    </div>
                </div>
            </div>

            {/* modal for prediction details */}
            {modalPrediction && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full shadow-lg overflow-auto">
                        <div className="flex items-center justify-between p-4 border-b">
                            <div className="flex items-center gap-3">
                                <h3 className="text-lg font-medium">{modalPrediction.species}</h3>
                                <Badge className={modalPrediction.riskIndex === 'Low' ? 'bg-green-100 text-green-800' : modalPrediction.riskIndex === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}>{modalPrediction.riskIndex}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" onClick={() => { navigator.clipboard?.writeText(JSON.stringify(modalPrediction)); alert('Copied'); }}><FileText className="w-4 h-4" /></Button>
                                <Button variant="ghost" onClick={() => setModalPrediction(null)} className="px-2 py-1"><X className="w-4 h-4" /></Button>
                            </div>
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="text-sm text-gray-600">Suitability score</div>
                                <div className="text-2xl font-semibold">{modalPrediction.suitabilityScore}%</div>
                            </div>

                            <div>
                                <div className="text-sm font-medium text-gray-700 mb-2">Reasoning</div>
                                <div className="text-sm text-gray-600 whitespace-pre-wrap">{modalPrediction.reasoning}</div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <MiniParamBars label="Temp" value={debouncedParams.temperature} min={-2} max={40} />
                                <MiniParamBars label="Salinity" value={debouncedParams.salinity} min={0} max={40} />
                                <MiniParamBars label="Depth (m)" value={debouncedParams.depth} min={0} max={1000} />
                            </div>

                            <div className="flex items-center justify-end gap-2">
                                <Button variant="outline" onClick={() => { setModalPrediction(null); }}>Close</Button>
                                <Button onClick={() => { /* keep for quick export of single record */ const blob = new Blob([JSON.stringify(modalPrediction, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = `${modalPrediction.species}_prediction.json`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }}><Download className="w-4 h-4" /> Export</Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Provide the expected named export `SpeciesPredict` and a default export
// so other modules can import either `SpeciesPredict` or the file's default.
export { SpeciesPredictClean as SpeciesPredict };
export default SpeciesPredictClean;
