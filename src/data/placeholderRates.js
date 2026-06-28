// Deterministic placeholder Medicaid dental provider participation rate (0..1)
// derived from the locality's FIPS code. Replace with real DMAS data in a later step.
export function placeholderRate(fips) {
  const s = String(fips)
  let h = 0
  for (let i = 0; i < s.length; i++) {
    h = ((h << 5) - h) + s.charCodeAt(i)
    h |= 0
  }
  return 0.15 + 0.7 * ((Math.abs(h) % 1000) / 1000)
}
