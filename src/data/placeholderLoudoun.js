// Loudoun County (Senate District 32, Sen. Kannan Srinivasan) spotlight data.
// All figures are placeholder until DMAS / Census / DentaQuest data arrives —
// see DATA.md. The narrative shape (wealthy county, low Medicaid participation
// because commercial demand is robust) reflects the policy story we're testing.
export const loudoun = {
  fips: '51107',
  name: 'Loudoun County',
  intro:
    "Wealth doesn't guarantee access. Loudoun is one of the highest-income counties in the United States — yet Medicaid patients here face the same provider gap as elsewhere in the Commonwealth, sometimes wider, because robust commercial demand keeps dentists' books full without Medicaid contracts.",
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
        'of Loudoun dentists treated at least one Medicaid patient — below the 27% statewide rate.',
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
