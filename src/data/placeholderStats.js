// Headline figures for the stat cards row. Integrated from
// data/raw/stats.csv (DMAS Access Report Nov 2022 + HCCI 2021 national est.)
// on 2026-06-27.
export const stats = [
  {
    id: 'participation',
    label: 'Statewide participation',
    value: '26.9%',
    description:
      'of Virginia dentists treated at least one Medicaid patient in FY2022.',
    sourceText: 'DMAS Access Report, Nov 2022 (p. 3)',
    placeholder: false,
  },
  {
    id: 'members-per-dentist',
    label: 'Access pressure',
    value: '1,014 : 1',
    description:
      'Medicaid members per participating dentist statewide, 2021.',
    sourceText: 'DMAS Access Report, Nov 2022 (p. 3)',
    placeholder: false,
  },
  {
    id: 'er-cost',
    label: 'Avoidable cost',
    value: '$749',
    description:
      'average cost of a dental-related emergency room visit (national estimate; VA-specific data pending).',
    sourceText: 'HCCI 2021 national estimate',
    placeholder: true,
  },
]
