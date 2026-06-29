// Placeholder seed data for the National Oral Health Policy Tracker.
// 10 starter states; bill details and reimbursement percentages are
// illustrative until verified against each state's Medicaid agency and
// legislative tracker. See DATA.md for the integration plan.
//
// adultCoverage levels:
//   'comprehensive' — full preventive + restorative + endo + perio + dentures
//   'limited'       — preventive + basic restorative only
//   'emergency'     — extractions and pain relief only
//   'none'          — no adult dental benefit
//
// Bill statuses:
//   'introduced', 'committee', 'passed-chamber', 'passed-both', 'signed', 'failed'
export const policyStates = [
  {
    code: 'VA',
    name: 'Virginia',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 2021,
    participationRate: 0.269,
    reimbursementVsMn: 0.87,
    legislators: 'Sen. Kannan Srinivasan + co-patrons',
    activeBills: [
      {
        id: 'va-2026-sb-tbd',
        title: 'DMAS Dental Access Study Bill',
        status: 'drafting',
        year: 2026,
        summary:
          'Directs DMAS to formally study Medicaid dental access and report findings to the General Assembly.',
      },
    ],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'MD',
    name: 'Maryland',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 2023,
    participationRate: 0.31,
    reimbursementVsMn: 0.83,
    legislators: '—',
    activeBills: [
      {
        id: 'md-2024-hb-1056',
        title: 'Healthy Smiles Dental Program · Reimbursement Increase',
        status: 'signed',
        year: 2024,
        summary:
          'Boosted adult Medicaid dental fee schedule across preventive and restorative codes.',
      },
    ],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'NC',
    name: 'North Carolina',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 2023,
    participationRate: 0.24,
    reimbursementVsMn: 0.73,
    legislators: '—',
    activeBills: [],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'MN',
    name: 'Minnesota',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 1995,
    participationRate: 0.42,
    reimbursementVsMn: 1.0,
    legislators: '—',
    activeBills: [],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'TN',
    name: 'Tennessee',
    adultCoverage: 'emergency',
    adultCoverageSince: null,
    participationRate: null,
    reimbursementVsMn: null,
    legislators: '—',
    activeBills: [
      {
        id: 'tn-2025-hb-512',
        title: 'TennCare Adult Dental Expansion',
        status: 'failed',
        year: 2025,
        summary:
          'Would have added comprehensive adult dental to TennCare; failed in committee.',
      },
    ],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'CA',
    name: 'California',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 2018,
    participationRate: 0.36,
    reimbursementVsMn: 0.78,
    legislators: '—',
    activeBills: [
      {
        id: 'ca-2026-ab-247',
        title: 'Medi-Cal Dental Provider Network Stability Act',
        status: 'passed-chamber',
        year: 2026,
        summary:
          'Mandates DHCS to publish quarterly provider participation data by ZIP code.',
      },
    ],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'NY',
    name: 'New York',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 1966,
    participationRate: 0.39,
    reimbursementVsMn: 0.91,
    legislators: '—',
    activeBills: [],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'TX',
    name: 'Texas',
    adultCoverage: 'emergency',
    adultCoverageSince: null,
    participationRate: null,
    reimbursementVsMn: null,
    legislators: '—',
    activeBills: [
      {
        id: 'tx-2025-hb-3219',
        title: 'Medicaid Adult Dental Benefits Restoration',
        status: 'committee',
        year: 2025,
        summary:
          'Pre-filed for the 2025 session; would restore comprehensive adult dental.',
      },
    ],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'FL',
    name: 'Florida',
    adultCoverage: 'limited',
    adultCoverageSince: 2022,
    participationRate: 0.22,
    reimbursementVsMn: 0.62,
    legislators: '—',
    activeBills: [],
    lastUpdated: '2026-06-29',
  },
  {
    code: 'MA',
    name: 'Massachusetts',
    adultCoverage: 'comprehensive',
    adultCoverageSince: 2018,
    participationRate: 0.44,
    reimbursementVsMn: 0.94,
    legislators: '—',
    activeBills: [],
    lastUpdated: '2026-06-29',
  },
]

export const coverageLabels = {
  comprehensive: 'Comprehensive',
  limited: 'Limited',
  emergency: 'Emergency only',
  none: 'No adult benefit',
}

export const billStatusLabels = {
  drafting: 'Drafting',
  introduced: 'Introduced',
  committee: 'In committee',
  'passed-chamber': 'Passed one chamber',
  'passed-both': 'Passed both chambers',
  signed: 'Signed into law',
  vetoed: 'Vetoed',
  failed: 'Failed',
}

export const billStatusTone = {
  drafting: 'pending',
  introduced: 'pending',
  committee: 'pending',
  'passed-chamber': 'progress',
  'passed-both': 'progress',
  signed: 'success',
  vetoed: 'fail',
  failed: 'fail',
}
