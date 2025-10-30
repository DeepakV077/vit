import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Download, FileText, Table, CheckCircle } from 'lucide-react';
import { oceanRegions, predictSpeciesSuitability } from '../utils/mockData';
import { jsPDF } from 'jspdf';

export function ReportExport() {
  const [selectedRegion, setSelectedRegion] = useState(oceanRegions[0]);
  const [format, setFormat] = useState<'pdf' | 'csv'>('pdf');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const [includeOptions, setIncludeOptions] = useState({
    environmentalData: true,
    predictions: true,
    charts: true,
    speciesInfo: true,
    aiInsights: true
  });

  const predictions = predictSpeciesSuitability(selectedRegion);

  const handleExport = () => {
    setIsExporting(true);
    setExportSuccess(false);

    // Simulate export process
    setTimeout(async () => {
      try {
        if (format === 'csv') {
          const data = generateReportData();
          const blob = new Blob([data], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `oceaniq-report-${selectedRegion.region.replace(/\s+/g, '-').toLowerCase()}.csv`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          // Create a basic PDF using jsPDF so the downloaded file opens as a real PDF
          const doc = new jsPDF({ unit: 'pt', format: 'a4' });
          let y = 40;
          const left = 40;
          doc.setFontSize(18);
          doc.text('OceanIQ Marine Analysis Report', left, y);
          y += 26;
          doc.setFontSize(11);
          doc.text(`Generated: ${new Date().toLocaleString()}`, left, y);
          y += 18;

          doc.setFontSize(13);
          doc.text('Region:', left, y);
          doc.setFontSize(12);
          doc.text(`${selectedRegion.region}`, left + 60, y);
          y += 18;

          if (includeOptions.environmentalData) {
            doc.setFontSize(12);
            doc.text('Environmental Parameters:', left, y);
            y += 16;
            const params = [
              `Temperature: ${selectedRegion.temperature} °C`,
              `Salinity: ${selectedRegion.salinity} PSU`,
              `Depth: ${selectedRegion.depth} m`,
              `Density: ${selectedRegion.density} kg/m³`,
            ];
            params.forEach((p) => {
              doc.text(p, left + 14, y);
              y += 14;
            });
            y += 8;
          }

          if (includeOptions.predictions) {
            doc.setFontSize(12);
            doc.text('Species Predictions:', left, y);
            y += 14;
            predictions.forEach((pred) => {
              const line = `${pred.species} — ${pred.suitabilityScore}% (${pred.riskIndex})`;
              const split = doc.splitTextToSize(line, 500);
              doc.text(split, left + 14, y);
              y += split.length * 12 + 4;

              if (includeOptions.aiInsights) {
                const reasoning = doc.splitTextToSize(pred.reasoning, 500);
                doc.setFontSize(10);
                doc.text(reasoning, left + 20, y);
                y += reasoning.length * 10 + 6;
                doc.setFontSize(12);
              }

              if (y > 750) {
                doc.addPage();
                y = 40;
              }
            });
          }

          const blob = doc.output('blob');
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `oceaniq-report-${selectedRegion.region.replace(/\s+/g, '-').toLowerCase()}.pdf`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }

        setExportSuccess(true);
        setTimeout(() => setExportSuccess(false), 3000);
      } catch (err) {
        console.error('Export failed', err);
        alert('Failed to generate report');
      } finally {
        setIsExporting(false);
      }
    }, 1200);
  };

  const generateReportData = (): string => {
    if (format === 'csv') {
      let csv = 'OceanIQ Marine Analysis Report\n\n';
      csv += `Region,${selectedRegion.region}\n`;
      csv += `Date,${new Date().toLocaleString()}\n\n`;
      
      csv += 'Environmental Parameters\n';
      csv += 'Parameter,Value,Unit\n';
      csv += `Temperature,${selectedRegion.temperature},°C\n`;
      csv += `Salinity,${selectedRegion.salinity},PSU\n`;
      csv += `Depth,${selectedRegion.depth},meters\n`;
      csv += `Density,${selectedRegion.density},kg/m³\n\n`;
      
      csv += 'Species Predictions\n';
      csv += 'Species,Suitability Score,Risk Index,Confidence Level\n';
      predictions.forEach(pred => {
        csv += `${pred.species},${pred.suitabilityScore}%,${pred.riskIndex},${pred.confidenceLevel}%\n`;
      });
      
      return csv;
    } else {
      // Mock PDF content as text
      return `
OceanIQ Marine Analysis Report
Generated: ${new Date().toLocaleString()}

REGION: ${selectedRegion.region}
Coordinates: ${selectedRegion.latitude}°N, ${selectedRegion.longitude}°E

ENVIRONMENTAL PARAMETERS:
- Temperature: ${selectedRegion.temperature}°C
- Salinity: ${selectedRegion.salinity} PSU
- Depth: ${selectedRegion.depth}m
- Density: ${selectedRegion.density} kg/m³

SPECIES PREDICTIONS:
${predictions.map(pred => `
${pred.species}:
  Suitability Score: ${pred.suitabilityScore}%
  Risk Index: ${pred.riskIndex}
  Confidence: ${pred.confidenceLevel}%
  Analysis: ${pred.reasoning}
`).join('\n')}

AI INSIGHTS:
This report provides comprehensive analysis of marine conditions in ${selectedRegion.region}.
The data indicates ${predictions[0].suitabilityScore >= 75 ? 'favorable' : 'challenging'} conditions
for marine life based on current environmental parameters.

---
Report generated by OceanIQ - AI-Powered Marine Intelligence Platform
      `;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-8 h-8 text-teal-600" />
            <h1 className="text-4xl text-gray-900">Export Reports</h1>
          </div>
          <p className="text-gray-600">Generate and download comprehensive marine analysis reports</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Configuration Panel */}
          <Card className="p-6 lg:col-span-1">
            <h3 className="text-lg text-gray-900 mb-4">Report Configuration</h3>

            {/* Region Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Select Region</Label>
              <Select
                value={selectedRegion.region}
                onValueChange={(value) => {
                  const region = oceanRegions.find(r => r.region === value);
                  if (region) setSelectedRegion(region);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {oceanRegions.map((region) => (
                    <SelectItem key={region.region} value={region.region}>
                      {region.region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Format Selection */}
            <div className="mb-6">
              <Label className="mb-2 block">Export Format</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setFormat('pdf')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    format === 'pdf'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FileText className={`w-6 h-6 mx-auto mb-2 ${format === 'pdf' ? 'text-teal-600' : 'text-gray-400'}`} />
                  <p className={`text-sm ${format === 'pdf' ? 'text-teal-900' : 'text-gray-600'}`}>PDF</p>
                </button>
                <button
                  onClick={() => setFormat('csv')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    format === 'csv'
                      ? 'border-teal-600 bg-teal-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Table className={`w-6 h-6 mx-auto mb-2 ${format === 'csv' ? 'text-teal-600' : 'text-gray-400'}`} />
                  <p className={`text-sm ${format === 'csv' ? 'text-teal-900' : 'text-gray-600'}`}>CSV</p>
                </button>
              </div>
            </div>

            {/* Include Options */}
            <div className="mb-6">
              <Label className="mb-3 block">Include in Report</Label>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="env-data"
                    checked={includeOptions.environmentalData}
                    onCheckedChange={(checked) =>
                      setIncludeOptions({ ...includeOptions, environmentalData: !!checked })
                    }
                  />
                  <Label htmlFor="env-data" className="cursor-pointer">
                    Environmental Data
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="predictions"
                    checked={includeOptions.predictions}
                    onCheckedChange={(checked) =>
                      setIncludeOptions({ ...includeOptions, predictions: !!checked })
                    }
                  />
                  <Label htmlFor="predictions" className="cursor-pointer">
                    Species Predictions
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="charts"
                    checked={includeOptions.charts}
                    onCheckedChange={(checked) =>
                      setIncludeOptions({ ...includeOptions, charts: !!checked })
                    }
                    disabled={format === 'csv'}
                  />
                  <Label htmlFor="charts" className={`cursor-pointer ${format === 'csv' ? 'opacity-50' : ''}`}>
                    Charts & Graphs {format === 'csv' && '(PDF only)'}
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="species-info"
                    checked={includeOptions.speciesInfo}
                    onCheckedChange={(checked) =>
                      setIncludeOptions({ ...includeOptions, speciesInfo: !!checked })
                    }
                  />
                  <Label htmlFor="species-info" className="cursor-pointer">
                    Species Information
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="ai-insights"
                    checked={includeOptions.aiInsights}
                    onCheckedChange={(checked) =>
                      setIncludeOptions({ ...includeOptions, aiInsights: !!checked })
                    }
                  />
                  <Label htmlFor="ai-insights" className="cursor-pointer">
                    AI Insights
                  </Label>
                </div>
              </div>
            </div>

            {/* Export Button */}
            <Button
              onClick={handleExport}
              disabled={isExporting}
              className="w-full bg-teal-600 hover:bg-teal-700"
            >
              {isExporting ? (
                <>
                  <Download className="w-4 h-4 mr-2 animate-bounce" />
                  Generating Report...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 mr-2" />
                  Export Report ({format.toUpperCase()})
                </>
              )}
            </Button>

            {exportSuccess && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-900">Report downloaded successfully!</p>
              </div>
            )}
          </Card>

          {/* Preview Panel */}
          <Card className="p-6 lg:col-span-2">
            <h3 className="text-lg text-gray-900 mb-4">Report Preview</h3>

            {/* Header */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <h2 className="text-2xl text-gray-900 mb-1">Marine Analysis Report</h2>
              <p className="text-gray-600">{selectedRegion.region}</p>
              <Badge variant="outline" className="mt-2">
                {new Date().toLocaleDateString()}
              </Badge>
            </div>

            {/* Environmental Data Section */}
            {includeOptions.environmentalData && (
              <div className="mb-6">
                <h4 className="text-gray-900 mb-3">Environmental Parameters</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Temperature</p>
                    <p className="text-xl text-gray-900">{selectedRegion.temperature}°C</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Salinity</p>
                    <p className="text-xl text-gray-900">{selectedRegion.salinity} PSU</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Depth</p>
                    <p className="text-xl text-gray-900">{selectedRegion.depth}m</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <p className="text-sm text-gray-600">Density</p>
                    <p className="text-xl text-gray-900">{selectedRegion.density} kg/m³</p>
                  </div>
                </div>
              </div>
            )}

            {/* Predictions Section */}
            {includeOptions.predictions && (
              <div className="mb-6">
                <h4 className="text-gray-900 mb-3">Species Suitability Predictions</h4>
                <div className="space-y-3">
                  {predictions.map((pred) => (
                    <div key={pred.species} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="text-gray-900">{pred.species}</h5>
                        <Badge
                          className={
                            pred.riskIndex === 'Low'
                              ? 'bg-green-100 text-green-800 border-green-200'
                              : pred.riskIndex === 'Medium'
                              ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                              : 'bg-red-100 text-red-800 border-red-200'
                          }
                        >
                          {pred.riskIndex} Risk
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              pred.suitabilityScore >= 75
                                ? 'bg-green-500'
                                : pred.suitabilityScore >= 50
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${pred.suitabilityScore}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{pred.suitabilityScore}%</span>
                      </div>
                      {includeOptions.aiInsights && (
                        <p className="text-sm text-gray-600 mt-2">{pred.reasoning}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Charts Placeholder */}
            {includeOptions.charts && format === 'pdf' && (
              <div className="mb-6">
                <h4 className="text-gray-900 mb-3">Data Visualizations</h4>
                <div className="p-8 bg-gray-100 rounded-lg text-center">
                  <Table className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Charts and graphs will be included in the PDF export</p>
                </div>
              </div>
            )}

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">© {new Date().getFullYear()} OceanIQ</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
