import { ORG_NAME } from '../branding'

const TABS = [
  { id: 'about', label: 'About', href: '/', comingSoon: true },
  { id: 'dashboard', label: 'VA Dashboard', href: '/dashboard/' },
  {
    id: 'provider-finder',
    label: 'Find a Dentist',
    href: '/provider-finder/',
    comingSoon: true,
  },
  {
    id: 'policy-tracker',
    label: 'Policy Tracker',
    href: '/policy-tracker/',
    comingSoon: true,
  },
]

export function SiteNav({ activeTab = 'dashboard' }) {
  return (
    <nav className="site-nav" aria-label="Primary">
      <div className="site-nav-inner">
        <a className="site-nav-brand" href="/">
          {ORG_NAME}
        </a>
        <ul className="site-nav-tabs">
          {TABS.map((t) => {
            const isActive = t.id === activeTab
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
                  <a
                    className={className}
                    href={t.href}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {t.label}
                  </a>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
