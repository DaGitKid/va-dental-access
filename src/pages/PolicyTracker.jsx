import { useMemo, useState } from 'react'
import {
  billStatusLabels,
  billStatusTone,
  coverageLabels,
  policyStates,
} from '../data/placeholderPolicyTracker'

const COVERAGE_FILTERS = [
  { value: 'all', label: 'All states' },
  { value: 'comprehensive', label: 'Comprehensive' },
  { value: 'limited', label: 'Limited' },
  { value: 'emergency', label: 'Emergency only' },
]

const SORT_OPTIONS = [
  { value: 'name', label: 'State (A → Z)' },
  { value: 'participation-desc', label: 'Participation (highest first)' },
  { value: 'participation-asc', label: 'Participation (lowest first)' },
  { value: 'reimbursement-desc', label: 'Reimbursement (highest first)' },
  { value: 'reimbursement-asc', label: 'Reimbursement (lowest first)' },
]

function compareStates(a, b, sort) {
  switch (sort) {
    case 'participation-desc':
      return (b.participationRate ?? -1) - (a.participationRate ?? -1)
    case 'participation-asc':
      return (a.participationRate ?? 99) - (b.participationRate ?? 99)
    case 'reimbursement-desc':
      return (b.reimbursementVsMn ?? -1) - (a.reimbursementVsMn ?? -1)
    case 'reimbursement-asc':
      return (a.reimbursementVsMn ?? 99) - (b.reimbursementVsMn ?? 99)
    case 'name':
    default:
      return a.name.localeCompare(b.name)
  }
}

const formatPct = (v) =>
  v === null || v === undefined ? '—' : `${Math.round(v * 100)}%`

export function PolicyTracker() {
  const [coverageFilter, setCoverageFilter] = useState('all')
  const [sort, setSort] = useState('name')

  const visibleStates = useMemo(() => {
    const filtered =
      coverageFilter === 'all'
        ? policyStates
        : policyStates.filter((s) => s.adultCoverage === coverageFilter)
    return [...filtered].sort((a, b) => compareStates(a, b, sort))
  }, [coverageFilter, sort])

  const stats = useMemo(() => {
    const total = policyStates.length
    const comprehensive = policyStates.filter(
      (s) => s.adultCoverage === 'comprehensive',
    ).length
    const activeBills = policyStates.reduce(
      (n, s) => n + s.activeBills.length,
      0,
    )
    return { total, comprehensive, activeBills }
  }, [])

  return (
    <main className="tracker">
      <header className="tracker-hero">
        <p className="eyebrow">National Oral Health Policy Tracker</p>
        <h1>State-by-state Medicaid dental policy, side by side</h1>
        <p className="tracker-hero-lede">
          A living comparison of adult Medicaid dental coverage,
          reimbursement, provider participation, and active legislation across
          the United States. Starting with ten states; expanding to all fifty
          as data is verified.
        </p>
      </header>

      <section className="tracker-summary" aria-label="Summary stats">
        <div className="tracker-summary-item">
          <div className="tracker-summary-value">{stats.total}</div>
          <div className="tracker-summary-label">States tracked</div>
        </div>
        <div className="tracker-summary-item">
          <div className="tracker-summary-value">{stats.comprehensive}</div>
          <div className="tracker-summary-label">With comprehensive adult dental</div>
        </div>
        <div className="tracker-summary-item">
          <div className="tracker-summary-value">{stats.activeBills}</div>
          <div className="tracker-summary-label">Active or recent bills tracked</div>
        </div>
        <div className="tracker-summary-item tracker-summary-item-note">
          <span className="placeholder-badge">Placeholder seed data</span>
          <div className="tracker-summary-label">
            Values illustrative until each state is verified. See{' '}
            <code>DATA.md</code> for the integration plan.
          </div>
        </div>
      </section>

      <section className="tracker-controls" aria-label="Filters">
        <div className="tracker-control">
          <label htmlFor="coverage-filter">Adult coverage</label>
          <select
            id="coverage-filter"
            value={coverageFilter}
            onChange={(e) => setCoverageFilter(e.target.value)}
          >
            {COVERAGE_FILTERS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tracker-control">
          <label htmlFor="sort-by">Sort by</label>
          <select
            id="sort-by"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div className="tracker-control-result">
          {visibleStates.length} state{visibleStates.length === 1 ? '' : 's'} shown
        </div>
      </section>

      <div className="tracker-table-wrap">
        <table className="tracker-table">
          <thead>
            <tr>
              <th scope="col">State</th>
              <th scope="col">Adult coverage</th>
              <th scope="col">Participation</th>
              <th scope="col">Reimbursement (vs. MN)</th>
              <th scope="col">Active / recent legislation</th>
            </tr>
          </thead>
          <tbody>
            {visibleStates.map((s) => (
              <tr key={s.code}>
                <th scope="row" className="tracker-state">
                  <span className="tracker-state-code">{s.code}</span>
                  <span className="tracker-state-name">{s.name}</span>
                </th>
                <td>
                  <span
                    className={`tracker-coverage tracker-coverage-${s.adultCoverage}`}
                  >
                    {coverageLabels[s.adultCoverage]}
                  </span>
                  {s.adultCoverageSince && (
                    <div className="tracker-coverage-since">
                      since {s.adultCoverageSince}
                    </div>
                  )}
                </td>
                <td className="tracker-num">{formatPct(s.participationRate)}</td>
                <td className="tracker-num">{formatPct(s.reimbursementVsMn)}</td>
                <td>
                  {s.activeBills.length === 0 ? (
                    <span className="tracker-no-bills">No active bills tracked</span>
                  ) : (
                    <ul className="tracker-bills">
                      {s.activeBills.map((b) => (
                        <li key={b.id} className="tracker-bill">
                          <div className="tracker-bill-head">
                            <span className="tracker-bill-title">{b.title}</span>
                            <span
                              className={`tracker-bill-status tracker-bill-status-${billStatusTone[b.status]}`}
                            >
                              {billStatusLabels[b.status]} · {b.year}
                            </span>
                          </div>
                          <p className="tracker-bill-summary">{b.summary}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="tracker-method">
        <h2>Methodology</h2>
        <p>
          Each state's row will eventually be sourced from three places: the
          state Medicaid agency's published fee schedule and benefit summary,
          its legislative tracker (LIS, OpenStates, or the chamber's own bill
          search), and the ADA Health Policy Institute's state profiles. Where
          a number is interpolated or estimated, the cell is marked. Where a
          row is verified, citations live in the corresponding entry in{' '}
          <code>src/data/placeholderPolicyTracker.js</code> until we move this
          into a structured CMS.
        </p>
      </footer>
    </main>
  )
}
