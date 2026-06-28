// Active Medicaid-billing dentists in Virginia by fiscal year, FY06–FY22.
// Integrated from data/raw/trend.csv (updated 2026-06-27 via dmas.zip).
//
// The `verified` flag distinguishes years sourced directly from DMAS / FOIA-
// adjacent documents from years that are interpolated between known points.
// FY06–FY10 verified from DMAS Annual Report 2009 + DentaQuest 2011 RFP
// response; FY18 and FY22 verified from DMAS Access Report November 2022.
export const trendData = [
  { year: 'FY06', dentists: 855,  verified: true,  source: 'DMAS Annual Report 2009, Table 1' },
  { year: 'FY07', dentists: 1007, verified: true,  source: 'DMAS Annual Report 2009, Table 1' },
  { year: 'FY08', dentists: 1128, verified: true,  source: 'DMAS Annual Report 2009, Table 1' },
  { year: 'FY09', dentists: 1264, verified: true,  source: 'DMAS Annual Report 2009, Table 1' },
  { year: 'FY10', dentists: 1496, verified: true,  source: 'DentaQuest RFP response, Jan 2011' },
  { year: 'FY11', dentists: 1600, verified: false, source: 'Interpolated' },
  { year: 'FY12', dentists: 1700, verified: false, source: 'Interpolated' },
  { year: 'FY13', dentists: 1800, verified: false, source: 'Interpolated' },
  { year: 'FY14', dentists: 1900, verified: false, source: 'Interpolated (DMAS 2014 biennial report: ~1,900)' },
  { year: 'FY15', dentists: 1910, verified: false, source: 'Interpolated' },
  { year: 'FY16', dentists: 1920, verified: false, source: 'Interpolated' },
  { year: 'FY17', dentists: 1925, verified: false, source: 'Interpolated' },
  { year: 'FY18', dentists: 1929, verified: true,  source: 'DMAS Access Report, Nov 2022 (p. 3)' },
  { year: 'FY19', dentists: 1870, verified: false, source: 'Interpolated' },
  { year: 'FY20', dentists: 1820, verified: false, source: 'Interpolated' },
  { year: 'FY21', dentists: 1800, verified: false, source: 'Interpolated' },
  { year: 'FY22', dentists: 1782, verified: true,  source: 'DMAS Access Report, Nov 2022 (p. 3)' },
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
    source: 'Derived from statewide trend',
  }))
}
