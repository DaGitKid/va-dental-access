import { Link } from 'react-router-dom'
import { FOUNDER_NAME, ORG_NAME } from '../branding'
import { HPSA_DESIGNATED_COUNT, HPSA_TOTAL_LOCALITIES } from '../data/vaHpsa'

const hpsaShare = Math.round(
  (HPSA_DESIGNATED_COUNT / HPSA_TOTAL_LOCALITIES) * 100,
)

const PROJECTS = [
  {
    id: 'dashboard',
    label: 'Project I',
    title: 'Medicaid Dental Access',
    description:
      'An interactive map of provider participation, reimbursement, and access gaps across all 133 Virginia localities.',
    href: '/dashboard',
    cta: 'Open dashboard',
    status: 'live',
  },
  {
    id: 'finder',
    label: 'Project II',
    title: 'Find a Medicaid Dentist',
    description:
      'A ZIP-code search for Virginia dentists who accept Medicaid. Anonymous patient-experience data flows back to our research.',
    href: '/find-a-dentist',
    cta: 'Search by ZIP',
    status: 'live',
  },
  {
    id: 'tracker',
    label: 'Project III',
    title: 'National Policy Tracker',
    description:
      'A comparative database of state-level Medicaid dental legislation: reimbursement rates, bill status, participation outcomes.',
    href: '/policy-tracker',
    cta: 'Open tracker',
    status: 'live',
  },
]

export function Landing() {
  return (
    <main className="landing">
      <section className="landing-hero">
        <p className="landing-hero-eyebrow">{ORG_NAME}</p>
        <h1 className="landing-hero-title">
          Virginia's Medicaid dental access crisis,
          <span className="landing-hero-accent"> mapped and measured</span>.
        </h1>
        <p className="landing-hero-lede">
          Independent public-interest research documenting where Medicaid
          dental care is failing in Virginia, and why. Built to inform the
          policy that can fix it.
        </p>
        <div className="landing-hero-ctas">
          <Link to="/dashboard" className="btn btn-primary">
            See the dashboard
          </Link>
          <Link to="/find-a-dentist" className="btn btn-secondary">
            Find a Medicaid dentist
          </Link>
        </div>
      </section>

      <section className="landing-stats" aria-label="Headline figures">
        <article className="landing-stat">
          <div className="landing-stat-value">73%</div>
          <div className="landing-stat-label">
            of Virginia dentists treated zero Medicaid patients in 2022.
          </div>
          <div className="landing-stat-source">
            DMAS Access Report, Nov 2022
          </div>
        </article>
        <article className="landing-stat">
          <div className="landing-stat-value">{hpsaShare}%</div>
          <div className="landing-stat-label">
            of Virginia's {HPSA_TOTAL_LOCALITIES} localities are designated
            federal dental shortage areas.
          </div>
          <div className="landing-stat-source">HRSA BCD HPSA, 2026</div>
        </article>
        <article className="landing-stat">
          <div className="landing-stat-value">30–40%</div>
          <div className="landing-stat-label">
            of private-insurance rates — what Virginia Medicaid pays dentists.
            The ADA's threshold for meaningful participation is 70–75%.
          </div>
          <div className="landing-stat-source">ADA Health Policy Institute</div>
        </article>
      </section>

      <section className="landing-projects" aria-label="Projects">
        <header className="landing-section-header">
          <p className="eyebrow">What we publish</p>
          <h2>Three tools, one mission</h2>
          <p className="landing-section-lede">
            Each project documents a piece of the access crisis — and together
            they form the evidence base for policy reform.
          </p>
        </header>
        <div className="project-grid">
          {PROJECTS.map((p) => (
            <article
              key={p.id}
              className={`project-card project-card-${p.status}`}
            >
              <div className="project-card-label">{p.label}</div>
              <h3 className="project-card-title">{p.title}</h3>
              <p className="project-card-description">{p.description}</p>
              {p.status === 'live' ? (
                <Link to={p.href} className="project-card-cta">
                  {p.cta} <span aria-hidden="true">→</span>
                </Link>
              ) : (
                <span className="project-card-cta project-card-cta-disabled">
                  {p.cta}
                </span>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="landing-mission" aria-label="About">
        <div className="landing-mission-inner">
          <p className="eyebrow">About</p>
          <h2>Coverage without providers is paper coverage.</h2>
          <p>
            Virginia expanded adult Medicaid dental benefits in 2021. On paper,
            1.8 million Virginians can now see a dentist with their coverage.
            In practice, most can't find one who will see them. {ORG_NAME}{' '}
            exists to document that gap — locality by locality, procedure code
            by procedure code, year by year — and to use that documentation to
            push for policy that closes it.
          </p>
          <p className="landing-mission-byline">
            Founded by <strong>{FOUNDER_NAME}</strong>, a University of
            Virginia undergraduate (Political and Social Thought, pre-dental)
            researching Virginia Medicaid dental policy.
          </p>
        </div>
      </section>
    </main>
  )
}
