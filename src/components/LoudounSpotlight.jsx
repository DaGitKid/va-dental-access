import { loudoun } from '../data/placeholderLoudoun'

export function LoudounSpotlight({ onHighlight }) {
  return (
    <section className="panel spotlight-panel" aria-label="Loudoun County spotlight">
      <header className="panel-header">
        <p className="eyebrow spotlight-eyebrow">Senate District 32</p>
        <div className="panel-title-row">
          <h2>Spotlight: {loudoun.name}</h2>
          <span className="placeholder-badge">Placeholder data</span>
        </div>
        <p className="panel-note">{loudoun.intro}</p>
      </header>

      <div className="spotlight-stats">
        {loudoun.stats.map((s) => (
          <div key={s.id} className="spotlight-stat">
            <div className="spotlight-stat-eyebrow">{s.label}</div>
            <div className="spotlight-stat-value">{s.value}</div>
            <p className="spotlight-stat-description">{s.description}</p>
          </div>
        ))}
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
