// Active Medicaid-billing dentists in Virginia by fiscal year. Integrated from
// data/raw/trend.csv on 2026-06-27. The `verified` flag distinguishes years
// pulled directly from a DMAS report (FY10, FY18, FY22) from years that are
// interpolated/estimated.
export const trendData = [
  { year: 'FY10', dentists: 1092, verified: true },
  { year: 'FY11', dentists: 1200, verified: false },
  { year: 'FY12', dentists: 1400, verified: false },
  { year: 'FY13', dentists: 1550, verified: false },
  { year: 'FY14', dentists: 1650, verified: false },
  { year: 'FY15', dentists: 1720, verified: false },
  { year: 'FY16', dentists: 1780, verified: false },
  { year: 'FY17', dentists: 1850, verified: false },
  { year: 'FY18', dentists: 1929, verified: true },
  { year: 'FY19', dentists: 1870, verified: false },
  { year: 'FY20', dentists: 1820, verified: false },
  { year: 'FY21', dentists: 1800, verified: false },
  { year: 'FY22', dentists: 1782, verified: true },
]

// Per-locality trend (still derived — placeholder until DMAS per-locality
// historical data arrives). Scaling factor (~0.003..0.12) yields small-locality
// counts in the 5–220 range. All rows marked verified:false because none of
// the locality-level data is sourced yet.
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
    verified: false,
  }))
}
