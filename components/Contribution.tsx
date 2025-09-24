import { GitPullRequestIcon } from '@primer/octicons-react'
import { useMainContext } from 'components/context/MainContext'
import { useTranslation } from 'components/hooks/useTranslation'

export const Contribution = () => {
  const { relativePath } = useMainContext()
  const { t } = useTranslation('contribution_cta')

  const contributionHref = relativePath
    ? `https://github.com/tum-elaw/baydig-wiki/edit/main/content/${relativePath}`
    : 'https://github.com/tum-elaw/baydig-wiki'

  return (
    <div className="f5 contribution">
      <h2 className="f4">{t`title`}</h2>
      <p className="color-text-secondary f6">{t`body`}</p>
      <a className="btn btn-outline disabled" href={contributionHref}>
        <GitPullRequestIcon size="small" className="octicon mr-1" />
        {t`button`}
      </a>
      <p className="color-text-secondary f6 mt-2">
        {t`or`}{' '}
        <a
          href="https://github.com/tum-elaw/baydig-wiki/issues/new/choose"
          target="_blank"
          rel="noopener"
        >
          {t`to_guidelines`}
        </a>
      </p>
    </div>
  )
}
