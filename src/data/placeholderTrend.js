// Placeholder count of active Medicaid-billing dentists in Virginia by fiscal
// year. Shape suggests a COVID-era drop and partial recovery. Replace with
// real DMAS provider-roster counts in a later step.
export const trendData = [
  { year: 'FY18', dentists: 1820 },
  { year: 'FY19', dentists: 1865 },
  { year: 'FY20', dentists: 1730 },
  { year: 'FY21', dentists: 1690 },
  { year: 'FY22', dentists: 1720 },
  { year: 'FY23', dentists: 1755 },
  { year: 'FY24', dentists: 1790 },
]

// Returns a deterministic per-locality trend by scaling the statewide series.
// Scaling factor (~0.003..0.12) yields small-locality counts in the 5–220 range.
function localityScale(fips) {
  const s = String(fips)
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h * 31) + s.charCodeAt(i)) | 0
  }
  return 0.003 + 0.117 * ((Math.abs(h) % 1000) / 1000)
}

export function localityTrend(fips) {
  const scale = localityScale(fips)
  return trendData.map((d) => ({
    year: d.year,
    dentists: Math.max(1, Math.round(d.dentists * scale)),
  }))
}
