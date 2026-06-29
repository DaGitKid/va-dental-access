import { Link } from 'react-router-dom'
import { ORG_NAME } from '../branding'

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="site-footer-brand">
          <div className="site-footer-org">{ORG_NAME}</div>
          <p className="site-footer-tagline">
            Independent public-interest research on Virginia Medicaid dental
            access.
          </p>
        </div>
        <nav className="site-footer-nav" aria-label="Site">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/find-a-dentist">Find a dentist</Link>
          <Link to="/policy-tracker">Policy tracker</Link>
        </nav>
        <p className="site-footer-data">
          Visualizations render on a mix of verified and placeholder data; see
          the repository's <code>DATA.md</code> for source citations and the
          live-data roadmap.
        </p>
      </div>
    </footer>
  )
}
