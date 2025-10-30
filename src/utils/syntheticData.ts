import { OceanParameter, oceanRegions } from './mockData';

// Lightweight seeded PRNG (mulberry32) so generated datasets can be reproducible
function mulberry32(a: number) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function jitter(value: number, pct: number, rand: () => number) {
  const delta = (rand() * 2 - 1) * pct * value;
  return value + delta;
}

/**
 * Generate a synthetic dataset of ocean parameters.
 * Uses `oceanRegions` as seeds and adds jitter to each parameter.
 */
export function generateSyntheticOceanDataset(count = 100, seed = 42): OceanParameter[] {
  const rand = mulberry32(seed >>> 0);
  const out: OceanParameter[] = [];

  for (let i = 0; i < count; i++) {
    // pick a base region (cyclic)
    const base = oceanRegions[i % oceanRegions.length];

    const latitude = clamp(jitter(base.latitude, 0.02, rand), -90, 90);
    const longitude = clamp(jitter(base.longitude, 0.02, rand), -180, 180);
    const temperature = clamp(jitter(base.temperature, 0.08, rand), -2, 40);
    const salinity = clamp(jitter(base.salinity, 0.06, rand), 0, 42);
    const depth = Math.max(0, Math.round(jitter(base.depth, 0.2, rand)));
    const density = clamp(jitter(base.density, 0.01, rand), 1000, 1100);

    const timestamp = new Date(Date.now() - Math.round(rand() * 1000 * 60 * 60 * 24 * 30)).toISOString();

    out.push({
      latitude,
      longitude,
      temperature: Math.round(temperature * 10) / 10,
      salinity: Math.round(salinity * 10) / 10,
      depth,
      density: Math.round(density * 10) / 10,
      timestamp,
      region: base.region + (i >= oceanRegions.length ? ` (sample ${Math.floor(i / oceanRegions.length)})` : ''),
    });
  }

  return out;
}

/** Small sample dataset (24 points) for quick usage in UI or testing */
export const syntheticOceanDataset: OceanParameter[] = generateSyntheticOceanDataset(24, 20251030);

/** Serialize dataset to CSV (simple, safe for small datasets) */
export function datasetToCSV(dataset: OceanParameter[]): string {
  const header = ['latitude', 'longitude', 'temperature', 'salinity', 'depth', 'density', 'timestamp', 'region'];
  const rows = dataset.map((d) => [
    d.latitude.toString(),
    d.longitude.toString(),
    d.temperature.toString(),
    d.salinity.toString(),
    d.depth.toString(),
    d.density.toString(),
    d.timestamp,
    `"${String(d.region).replace(/"/g, '""')}"`,
  ].join(','));

  return [header.join(','), ...rows].join('\n');
}

export default {
  generateSyntheticOceanDataset,
  syntheticOceanDataset,
  datasetToCSV,
};
