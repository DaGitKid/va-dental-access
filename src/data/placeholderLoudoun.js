// Loudoun County (Senate District 32, Sen. Kannan Srinivasan) spotlight data.
//
// `verifiedFacts` come from public federal/Census sources and are real.
// `stats` (the three big tiles) are placeholder until DMAS provides locality-
// level Medicaid enrollment + provider participation figures.
//
// Sources for verifiedFacts:
//   - Population: Census ACS 5-year 2022, table B01003 (data/raw/va_population.csv)
//   - HPSA designation + score: HRSA BCD_HPSA_FCT_DET_DH June 2026 (data/raw/hpsa_dental_va.csv)
//   - HPSA population served: data/raw/loudoun_spotlight.csv
export const loudoun = {
  fips: '51107',
  name: 'Loudoun County',
  intro:
    "Wealth doesn't guarantee access. Loudoun is one of the highest-income counties in the United States — yet Medicaid patients here face the same provider gap as elsewhere in the Commonwealth, sometimes wider, because robust commercial demand keeps dentists' books full without Medicaid contracts.",
  verifiedFacts: [
    {
      id: 'population',
      label: 'Population',
      value: '420,959',
      source: 'Census ACS 5-year 2022',
    },
    {
      id: 'hpsa-status',
      label: 'Federal dental HPSA',
      value: 'Designated · score 17',
      source: 'HRSA BCD_HPSA, June 2026',
    },
    {
      id: 'hpsa-pop-served',
      label: 'HPSA population served',
      value: '42,083',
      source: 'Loudoun Community Health Center FQHC',
    },
  ],
  stats: [
    {
      id: 'members',
      label: 'Medicaid members',
      value: '~38,000',
      description: 'Medicaid-enrolled residents in Loudoun County.',
    },
    {
      id: 'participation',
      label: 'Provider participation',
      value: '~22%',
      description:
        'of Loudoun dentists treated at least one Medicaid patient — below the 26.9% statewide rate.',
    },
    {
      id: 'ratio',
      label: 'Access pressure',
      value: '~1,500 : 1',
      description:
        'Medicaid members per participating dentist — higher pressure than the state average.',
    },
  ],
}
