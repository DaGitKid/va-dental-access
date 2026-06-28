import { loudoun } from '../data/placeholderLoudoun'

export function LoudounSpotlight({ onHighlight }) {
  return (
    <section className="panel spotlight-panel" aria-label="Loudoun County spotlight">
      <header className="panel-header">
        <p className="eyebrow spotlight-eyebrow">Senate District 32</p>
        <div className="panel-title-row">
          <h2>Spotlight: {loudoun.name}</h2>
        </div>
        <p className="panel-note">{loudoun.intro}</p>
      </header>

      <div className="spotlight-verified">
        <div className="spotlight-verified-label">
          Verified · Census + HRSA
        </div>
        <ul className="spotlight-verified-list">
          {loudoun.verifiedFacts.map((f) => (
            <li key={f.id}>
              <span className="spotlight-verified-key">{f.label}</span>
              <span className="spotlight-verified-value">{f.value}</span>
              <span className="spotlight-verified-source">{f.source}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="spotlight-pending">
        <div className="spotlight-pending-label">
          <span>Pending DMAS data request</span>
          <span className="placeholder-badge">Placeholder</span>
        </div>
        <div className="spotlight-stats">
          {loudoun.stats.map((s) => (
            <div key={s.id} className="spotlight-stat">
              <div className="spotlight-stat-eyebrow">{s.label}</div>
              <div className="spotlight-stat-value">{s.value}</div>
              <p className="spotlight-stat-description">{s.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="spotlight-actions">
        <button
          type="button"
          className="spotlight-button"
          onClick={onHighlight}
        >
          Highlight Loudoun on the map ↑
        </button>
      </div>
    </section>
  )
}
