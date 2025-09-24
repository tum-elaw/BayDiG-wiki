import { useState, useRef } from 'react'
import { ThumbsdownIcon, ThumbsupIcon } from '@primer/octicons-react'
import { useTranslation } from 'components/hooks/useTranslation'

enum ViewState {
  START = 'START',
  YES = 'YES',
  NO = 'NO',
  END = 'END',
}

export const Survey = () => {
  const { t } = useTranslation('survey')
  const [state, setState] = useState<ViewState>(ViewState.START)
  const formRef = useRef<HTMLFormElement>(null)

  return (
    
    <form className="f5" ref={formRef} data-testid="survey-form">
      <h2 className="mb-1 f4">
        {t`able_to_find`}

    
      </h2>
      <p className="color-text-secondary f6">Das Wiki zum Bayerischen Digitalgesetz. Zu den Projektbeteiligten gehörten Prof. Dr. Dirk Heckmann (Leitung), Michael Bressler (Plattform), Alexander Besner und Nicolas Ziegler (Seminar)</p>

      {/* Honeypot: token isn't a real field */}
      

      {state !== ViewState.END && (
        <div className="mb-3"></div>
      )}

      {[ViewState.YES, ViewState.NO].includes(state) && (
        <>
          <p className="color-text-secondary f6">
            {state === ViewState.YES && t`yes_feedback`}
            {state === ViewState.NO && t`no_feedback`}
          </p>
          <p className="mb-3">
            <label className="d-block mb-1 f6" htmlFor="survey-comment">
              <span>
                {state === ViewState.YES && t`comment_yes_label`}
                {state === ViewState.NO && t`comment_no_label`}
              </span>
              <span className="text-normal color-text-tertiary float-right ml-1">
                {t`optional`}
              </span>
            </label>
          </p>
          <p>
            <label className="d-block mb-1 f6" htmlFor="survey-email">
              {t`email_label`}
              <span className="text-normal color-text-tertiary float-right ml-1">
                {t`optional`}
              </span>
            </label>
        
            <span className="f6 color-text-secondary">{t`not_support`}</span>
          </p>
          <p className="text-right">
          </p>
        </>
      )}

      {state === ViewState.END && (
        <p className="color-text-secondary f6" data-testid="survey-end">{t`feedback`}</p>
      )}
    </form>
  )
}


