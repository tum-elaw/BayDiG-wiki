import { PeopleIcon, CommentDiscussionIcon, QuestionIcon } from '@primer/octicons-react'

import { useTranslation } from 'components/hooks/useTranslation'
import { useVersion } from 'components/hooks/useVersion'

export const Support = () => {
  const { isEnterprise } = useVersion()
  const { t } = useTranslation('support')

  return (
    <div>
      <h3 className="mb-2 f4">{t`still_need_help`}</h3>
      <a id="ask-community" href="" target="_blank" className="btn btn-outline mr-4 mt-2 disabled">
        <PeopleIcon size="small" className="octicon mr-1" />
        {t`ask_community`}
      </a>
      <a id="qna" href="" target="_blank" className="btn btn-outline mr-4 mt-2 disabled">
        <QuestionIcon size="small" className="octicon mr-1" />
        {t`qna`}
      </a>
      
    </div>
  )
}
