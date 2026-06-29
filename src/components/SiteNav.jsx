import { Link, useLocation } from 'react-router-dom'
import { ORG_NAME } from '../branding'

const TABS = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard' },
  { id: 'finder', label: 'Find a Dentist', href: '/find-a-dentist' },
  { id: 'tracker', label: 'Policy Tracker', href: '#', comingSoon: true },
]

export function SiteNav() {
  const { pathname } = useLocation()

  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav-inner">
        <Link
          className="site-nav-brand"
          to="/"
          aria-label={`${ORG_NAME} — home`}
        >
          {ORG_NAME}
        </Link>
        <ul className="site-nav-tabs">
          {TABS.map((t) => {
            const isActive = !t.comingSoon && pathname.startsWith(t.href)
            const className = [
              'site-nav-tab',
              isActive && 'site-nav-tab-active',
              t.comingSoon && 'site-nav-tab-coming',
            ]
              .filter(Boolean)
              .join(' ')
            return (
              <li key={t.id}>
                {t.comingSoon ? (
                  <span
                    className={className}
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    {t.label}
                    <span className="site-nav-tab-badge">Soon</span>
                  </span>
                ) : (
                  <Link
                    className={className}
                    to={t.href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
