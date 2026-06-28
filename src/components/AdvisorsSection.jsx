import { advisors } from '../data/advisors'

export function AdvisorsSection() {
  return (
    <section className="advisors-section" aria-label="Dental advisors">
      <header className="advisors-header">
        <p className="eyebrow">Dental advisors</p>
        <h2>The clinicians backing this work</h2>
        <p className="advisors-subtitle">
          Practicing dentists who review our findings, contribute clinical
          perspective, and stand publicly with the project.
        </p>
      </header>

      <div className="advisor-grid">
        {advisors.map((a) => (
          <article key={a.id} className="advisor-card">
            <div className="advisor-photo" aria-hidden={!a.photoUrl}>
              {a.photoUrl ? (
                <img src={a.photoUrl} alt={`${a.name} headshot`} />
              ) : (
                <span className="advisor-photo-placeholder">Photo</span>
              )}
            </div>
            <div className="advisor-info">
              <div className="advisor-name">
                {a.name}
                {a.credential ? `, ${a.credential}` : ''}
              </div>
              {a.role && <div className="advisor-role">{a.role}</div>}
              {a.practice && <div className="advisor-practice">{a.practice}</div>}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
