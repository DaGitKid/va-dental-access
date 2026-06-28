// Placeholder Medicaid reimbursement comparison: Virginia against Maryland and
// North Carolina (regional peers), normalized to Minnesota's rate (the high
// benchmark = 100%). Numbers reflect the policy narrative shape (VA ~45–50%
// of MN, MD ~70%, NC ~50%) but are not sourced. Replace with values from each
// state's Medicaid dental fee schedule — see DATA.md.
//
// Each row carries both raw dollars (for the tooltip) and pre-computed
// percentages of MN (for the bars).
const rawData = [
  { code: 'D0150', label: 'Comprehensive eval', va: 25, md: 38, nc: 28, mn: 55 },
  { code: 'D1110', label: 'Adult cleaning',     va: 42, md: 65, nc: 48, mn: 92 },
  { code: 'D2140', label: 'Amalgam filling',    va: 55, md: 85, nc: 62, mn: 122 },
  { code: 'D7140', label: 'Tooth extraction',   va: 85, md: 125, nc: 95, mn: 175 },
  { code: 'D2740', label: 'Porcelain crown',    va: 400, md: 580, nc: 440, mn: 850 },
]

export const reimbursementData = rawData.map((d) => ({
  ...d,
  vaPct: Math.round((d.va / d.mn) * 100),
  mdPct: Math.round((d.md / d.mn) * 100),
  ncPct: Math.round((d.nc / d.mn) * 100),
}))

// Comparator states (the ones rendered as bars). Minnesota is the benchmark
// shown as a reference line at 100%, not a bar.
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
