import { PeopleIcon, CommentDiscussionIcon } from '@primer/octicons-react'

import { useTranslation } from 'components/hooks/useTranslation'
import { useVersion } from 'components/hooks/useVersion'

export const Support = () => {
  const { isEnterprise } = useVersion()
  const { t } = useTranslation('support')

  return (
    <div>
      <h3 className="mb-2 f4">{t`still_need_help`}</h3>
      <a id="ask-community" href="https://chat.tum.de/invite/MxqZgg" target="_blank" className="btn btn-outline mr-4 mt-2">
        <PeopleIcon size="small" className="octicon mr-1" />
        {t`ask_community`}
      </a>
      <a
        id="contact-us"
        href={
          isEnterprise
            ? 'https://www.gov.tum.de/elaw/team/michael-bressler/'
            : 'https://www.gov.tum.de/elaw/team/michael-bressler/'
        }
        className="btn btn-outline mt-2"
      >
        <CommentDiscussionIcon size="small" className="octicon mr-1" />
        {t`contact_support`}
      </a>
    </div>
  )
}
