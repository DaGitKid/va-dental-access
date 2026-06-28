import { FOUNDER_NAME, ORG_NAME } from '../branding'

export function AboutSection() {
  return (
    <section className="about-section" aria-label="About this work">
      <header className="about-header">
        <p className="eyebrow">About</p>
        <h2>About this work</h2>
      </header>

      <div className="about-prose">
        <p>
          <strong>{ORG_NAME}</strong> is an independent Virginia public oral
          health access initiative. We publish public-interest research that
          documents where Medicaid dental access is failing — and we use that
          research to push for policy change.
        </p>
        <p>
          Virginia expanded adult Medicaid dental benefits in 2021. Coverage
          grew on paper; access did not. In 2022, roughly{' '}
          <strong>73% of Virginia dentists treated zero Medicaid patients</strong>.
          The state's Medicaid reimbursement schedule pays{' '}
          <strong>just 30–40% of what private insurance pays</strong> — well
          below the 70–75% threshold the American Dental Association identifies
          as necessary for meaningful provider participation.
        </p>
        <p>
          Coverage without providers is paper coverage. This dashboard is the
          first of three tools {ORG_NAME} is publishing — alongside a
          community-verified provider directory and a national Medicaid dental
          policy tracker — to surface that gap and the conditions that produce
          it.
        </p>
        <p className="about-byline">
          Founded by <strong>{FOUNDER_NAME}</strong>, a University of Virginia
          undergraduate (Political and Social Thought, pre-dental) researching
          Virginia Medicaid dental policy. For research collaborations or data
          partnerships, see the repository's README.
        </p>
      </div>
    </section>
  )
}
