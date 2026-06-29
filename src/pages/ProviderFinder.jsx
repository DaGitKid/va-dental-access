import { useMemo, useState } from 'react'
import { searchProviders } from '../data/placeholderProviders'

const AIRTABLE_FORM_URL = import.meta.env.VITE_AIRTABLE_FORM_URL || ''

export function ProviderFinder() {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  const results = useMemo(() => {
    if (!submittedQuery) return null
    return searchProviders(submittedQuery)
  }, [submittedQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedQuery(query.trim())
  }

  return (
    <main className="finder">
      <section className="finder-hero">
        <p className="eyebrow">Find a Medicaid Dentist</p>
        <h1>Search Virginia dentists accepting Medicaid</h1>
        <p className="finder-hero-lede">
          Enter a Virginia ZIP code or locality name. We'll pull dentists who
          appear on the DentaQuest provider list for that area.
        </p>

        <form className="finder-search" onSubmit={handleSubmit}>
          <label htmlFor="finder-input" className="sr-only">
            ZIP code or locality
          </label>
          <input
            id="finder-input"
            type="search"
            placeholder="ZIP code or locality (e.g. 20176, Leesburg)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="finder-input"
            autoComplete="postal-code"
          />
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </form>

        <p className="finder-disclaimer">
          Sample listings shown below until our DentaQuest data integration is
          live. Always call the office directly to confirm current Medicaid
          participation and availability.
        </p>
      </section>

      <section className="finder-results" aria-live="polite">
        {results === null && (
          <div className="finder-empty">
            <p>
              Try <button
                type="button"
                className="finder-empty-link"
                onClick={() => {
                  setQuery('20176')
                  setSubmittedQuery('20176')
                }}
              >20176 (Leesburg)</button>{' '}
              or <button
                type="button"
                className="finder-empty-link"
                onClick={() => {
                  setQuery('Sterling')
                  setSubmittedQuery('Sterling')
                }}
              >Sterling</button> to see how results look.
            </p>
          </div>
        )}
        {results !== null && results.length === 0 && (
          <div className="finder-empty">
            <p>
              No sample listings for "{submittedQuery}." (Real Virginia-wide
              data integration pending.)
            </p>
          </div>
        )}
        {results !== null && results.length > 0 && (
          <>
            <div className="finder-results-meta">
              {results.length} listing{results.length === 1 ? '' : 's'} matching{' '}
              "{submittedQuery}"
              <span className="placeholder-badge">Sample data</span>
            </div>
            <ul className="finder-list">
              {results.map((p) => (
                <li key={p.id} className="finder-card">
                  <div className="finder-card-main">
                    <div className="finder-card-practice">{p.practice}</div>
                    <div className="finder-card-name">{p.name}</div>
                    <address className="finder-card-address">
                      {p.address}<br />
                      {p.locality}, VA {p.zip}
                    </address>
                  </div>
                  <div className="finder-card-side">
                    <a
                      href={`tel:${p.phone.replace(/[^0-9+]/g, '')}`}
                      className="finder-card-phone"
                    >
                      {p.phone}
                    </a>
                    <div
                      className={`finder-card-status finder-card-status-${
                        p.acceptingNew ? 'open' : 'unknown'
                      }`}
                    >
                      {p.acceptingNew
                        ? 'Listed as accepting new patients'
                        : 'Listed status uncertain'}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>

      <section className="finder-feedback" aria-label="Patient experience feedback">
        <header className="finder-feedback-header">
          <p className="eyebrow">Patient experience study</p>
          <h2>Help us improve Virginia's dental access data</h2>
          <p>
            Whether you found a dentist or not, take 30 seconds to tell us how
            your search went. Responses are <strong>anonymous</strong> and{' '}
            <strong>aggregated by ZIP code only</strong> — we never publish or
            share information about individual providers. This data lets us
            quantify access barriers across the Commonwealth.
          </p>
        </header>
        {AIRTABLE_FORM_URL ? (
          <iframe
            className="finder-feedback-form"
            src={AIRTABLE_FORM_URL}
            title="Patient experience feedback form"
          />
        ) : (
          <div className="finder-feedback-placeholder">
            <p>
              <strong>Feedback form coming online soon.</strong> The Airtable
              connection isn't configured yet — see{' '}
              <code>docs/airtable-setup.md</code> in the repository for the
              setup steps.
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
