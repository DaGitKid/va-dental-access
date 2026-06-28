import { useState } from 'react'
import './App.css'
import { ORG_NAME } from './branding'
import { AboutSection } from './components/AboutSection'
import { AdvisorsSection } from './components/AdvisorsSection'
import { LoudounSpotlight } from './components/LoudounSpotlight'
import { SiteNav } from './components/SiteNav'
import { ParticipationTrendChart } from './components/ParticipationTrendChart'
import { ReimbursementChart } from './components/ReimbursementChart'
import { StatCards } from './components/StatCards'
import { VaMap } from './components/VaMap'
import { loudoun } from './data/placeholderLoudoun'

function App() {
  const [selected, setSelected] = useState(null)

  const handleSelect = (id, name) => {
    if (id === null) {
      setSelected(null)
    } else {
      setSelected({ id, name })
    }
  }

  const highlightLoudoun = () => {
    handleSelect(loudoun.fips, loudoun.name)
    document
      .getElementById('map-panel')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const trendNote = selected
    ? `Active Medicaid-billing dentists in ${selected.name} by fiscal year.`
    : 'Active Medicaid-billing dentists statewide by fiscal year.'

  return (
    <div className="page">
      <SiteNav activeTab="dashboard" />
      <header className="site-header">
        <p className="eyebrow">{ORG_NAME} · Research</p>
        <h1>Medicaid Dental Access in Virginia</h1>
        <p className="subtitle">
          Provider participation, reimbursement, and geographic access gaps across the
          Commonwealth's 133 localities.
        </p>
      </header>

      <main className="content">
        <section className="intro">
          <p>
            Virginia Medicaid covers more than 1.8 million residents, but adult dental
            access lags far behind expectations. This dashboard maps where the gaps are —
            the first in a series of public-interest research projects from {ORG_NAME}.
          </p>
        </section>

        <StatCards />

        <section
          className="panel"
          id="map-panel"
          aria-label="Provider participation map"
        >
          <header className="panel-header">
            <div className="panel-title-row">
              <h2>Provider participation by locality</h2>
              <span className="placeholder-badge">Placeholder data</span>
            </div>
            <p className="panel-note">
              Choropleth of all 95 counties and 38 independent cities. Click a locality
              to filter the trend chart below.
            </p>
          </header>
          <VaMap
            selectedId={selected?.id ?? null}
            onSelectLocality={handleSelect}
          />
        </section>

        <div className="selection-bar" role="status" aria-live="polite">
          {selected ? (
            <>
              <span className="selection-bar-label">Selected locality</span>
              <span className="selection-bar-name">{selected.name}</span>
              <button
                type="button"
                className="selection-bar-clear"
                onClick={() => setSelected(null)}
              >
                Clear
              </button>
            </>
          ) : (
            <span className="selection-bar-hint">
              Tip — click a locality on the map to focus the trend chart on that area.
            </span>
          )}
        </div>

        <div className="panel-grid">
          <section className="panel" aria-label="Reimbursement rates chart">
            <header className="panel-header">
              <div className="panel-title-row">
                <h2>Medicaid reimbursement vs. peer states</h2>
              </div>
              <p className="panel-note">
                Each state's Medicaid rate as a percentage of Minnesota's (the
                high benchmark). VA averages 87% of MN across these procedures —
                but the gap is widest on preventive/diagnostic care (cleanings,
                evaluations, X-rays) and narrowest on restorative/surgical care.
                Raw dollar amounts in the tooltip.
              </p>
            </header>
            <ReimbursementChart />
          </section>

          <section className="panel" aria-label="Participation trend chart">
            <header className="panel-header">
              <div className="panel-title-row">
                <h2>Provider participation over time</h2>
              </div>
              <p className="panel-note">{trendNote}</p>
            </header>
            <ParticipationTrendChart selectedLocality={selected} />
          </section>
        </div>

        <LoudounSpotlight onHighlight={highlightLoudoun} />

        <AboutSection />

        <AdvisorsSection />
      </main>

      <footer className="site-footer">
        <p>
          Independent public-interest research published by {ORG_NAME}. Current
          visualizations render on placeholder data; see the repository's{' '}
          <code>DATA.md</code> for the live-data integration roadmap (DMAS provider
          directory, ADA Health Policy Institute fee data, Census ACS, HRSA dental
          HPSAs).
        </p>
      </footer>
    </div>
  )
}

export default App
