import { stats } from '../data/placeholderStats'

export function StatCards() {
  return (
    <div className="stat-cards">
      {stats.map((s) => (
        <article key={s.id} className="stat-card">
          <div className="stat-card-eyebrow">
            <span>{s.label}</span>
            {s.placeholder && (
              <span className="placeholder-badge">Placeholder</span>
            )}
          </div>
          <div className="stat-card-value">{s.value}</div>
          <p className="stat-card-description">{s.description}</p>
          {s.sourceText && (
            <p className="stat-card-source">{s.sourceText}</p>
          )}
        </article>
      ))}
    </div>
  )
}
