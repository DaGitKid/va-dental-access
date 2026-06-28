// Headline figures for the stat cards row. Verify against original DMAS/VHI
// sources before publishing — see DATA.md for the integration plan.
export const stats = [
  {
    id: 'participation',
    label: 'Statewide participation',
    value: '27%',
    description:
      'of Virginia dentists treated at least one Medicaid patient in 2022.',
    sourceText: 'Source: DMAS 2022 report (verify)',
    placeholder: false,
  },
  {
    id: 'members-per-dentist',
    label: 'Access pressure',
    value: '~1,200 : 1',
    description:
      'Medicaid members per participating dentist statewide. A wider ratio means harder access.',
    sourceText: null,
    placeholder: true,
  },
  {
    id: 'er-cost',
    label: 'Avoidable cost',
    value: '$1,200',
    description:
      'average cost of a dental-related emergency room visit in Virginia.',
    sourceText: null,
    placeholder: true,
  },
]
