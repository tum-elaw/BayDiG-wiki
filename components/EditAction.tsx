import { GitPullRequestIcon } from '@primer/octicons-react'
import { useMainContext } from 'components/context/MainContext'
import { useTranslation } from 'components/hooks/useTranslation'
import { EditIcon } from 'components/article/EditIcon'

export const Contribution = () => {
  const { relativePath } = useMainContext()
  const { t } = useTranslation('contribution_cta')

  const contributionHref = relativePath
    ? `https://github.com/michael-eu/tumgovwiki/edit/main/content/${relativePath}`
    : 'https://github.com/michael-eu/tumgovwiki'

  return (
          <a href={contributionHref}>
        <button className="btn-link Link--muted">
        <EditIcon />
      </button>
      </a>
  )
}
