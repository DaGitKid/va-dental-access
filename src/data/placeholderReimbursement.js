// VA / MD / NC / MN Medicaid dental fee schedules for 8 common CDT codes.
// Integrated from data/raw/reimbursement.csv on 2026-06-27.
//
// Each row carries both raw dollars (tooltip) and pre-computed percentages of
// MN (bars). The data reveals a substantive pattern worth surfacing in the
// dashboard copy: VA's gap is widest on preventive/diagnostic procedures
// (cleanings, evals, X-rays) and narrowest on restorative/surgical procedures
// (fillings, crowns, endo).
const rawData = [
  { code: 'D0120', label: 'Periodic oral evaluation',      va: 26.99, md: 31.81, nc: 26.96, mn: 32.93 },
  { code: 'D1110', label: 'Adult prophylaxis (cleaning)',  va: 63.19, md: 67.12, nc: 39.83, mn: 89.18 },
  { code: 'D2140', label: 'Amalgam filling, 1 surface',    va: 79.51, md: 73.85, nc: 78.12, mn: 87.54 },
  { code: 'D2150', label: 'Amalgam filling, 2 surfaces',   va: 101.14, md: 92.84, nc: 98.99, mn: 110.25 },
  { code: 'D2330', label: 'Composite filling, anterior',   va: 99.46, md: 96.95, nc: 68.90, mn: 102.15 },
  { code: 'D0150', label: 'Comprehensive oral evaluation', va: 41.92, md: 56.34, nc: 46.65, mn: 54.71 },
  { code: 'D0330', label: 'Panoramic X-ray',               va: 72.30, md: 45.95, nc: 61.95, mn: 97.20 },
  { code: 'D3310', label: 'Root canal, anterior',          va: 502.13, md: 395.00, nc: 296.52, mn: 489.00 },
]

export const reimbursementData = rawData.map((d) => ({
  ...d,
  vaPct: Math.round((d.va / d.mn) * 100),
  mdPct: Math.round((d.md / d.mn) * 100),
  ncPct: Math.round((d.nc / d.mn) * 100),
}))

// Comparator states (rendered as bars). Minnesota is the benchmark, shown as
// a reference line at 100% rather than as a fourth bar.
export const compareStates = [
  { key: 'va', pctKey: 'vaPct', label: 'Virginia', color: '#232d4b' },
  { key: 'md', pctKey: 'mdPct', label: 'Maryland', color: '#4a5d83' },
  { key: 'nc', pctKey: 'ncPct', label: 'North Carolina', color: '#7b8db0' },
]

export const benchmark = {
  key: 'mn',
  label: 'Minnesota',
  color: '#b8c5e0',
}
