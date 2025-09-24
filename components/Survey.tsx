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
      <p className='color-text-secondary f6'><b>Durch das BayDiG-Wiki schafft das CDPS einen wertvollen Beitrag zur vertieften demokratischen Diskussion der Landesgesetzgebung rund um das Bayerische Digitalgesetz. </b>
Die quelloffene Plattform präsentiert die Arbeitsergebnisse eines Seminars, in dem sich die Studierenden der Technischen Universität München intensiv mit dem neuen Digitalgesetz auseinadersetzten.</p>
<p className='color-text-secondary f6'>
Durch die „Open Access“-Publizierung der studentischen Kommentierungen auf der eigens entwickelten Wiki-Plattform erhalten Interessierte ein umfangreiches Informationsangebot, welches das im Netz verfügbare Wissen bedeutend erweitert. </p>
<p className='color-text-secondary f6'>Die fundierten Beiträge der Studierenden fanden ihr Lob auch durch die <b>Bayerische Staatsministerin für Digitales Judith Gerlach, MdL</b>, welche den Abschlussterminen einschließlich der Veröffentlichung der Seite am 28. März 2022 sowie am 14. März 2023 beisaß.</p>
<p className='color-text-secondary f6'><a href="https://www.tum-cdps.de/2022/03/28/wiki-fuer-das-bayerische-digitalgesetz/">Bericht vom 28. März 2022 (Wintersemester 2021/22)</a></p>
<p className='color-text-secondary f6'><a href="https://www.tum-cdps.de/2023/03/14/erweiterung-des-wikis-fuer-das-bayerische-digitalgesetz/">Bericht vom 14. März 2023 (Wintersemester 2022/23)</a></p>
      <p className="color-text-secondary f6">Zu den Projektbeteiligten gehörten <a href="https://www.gov.sot.tum.de/elaw/lehrstuhlinhaber/">Prof. Dr. Dirk Heckmann</a> (Direktor, TUM CDPS), <a href="https://github.com/mibressler">Michael Bressler</a> (Plattform), <a href="https://www.gov.sot.tum.de/elaw/team/ehemalige/">Alexander Besner-Lettenbauer</a> und <a href="https://www.gov.sot.tum.de/elaw/team/nicolas-ziegler/">Nicolas Ziegler</a> (Seminar) sowie die Studierenden der Technischen Universität München.</p>

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


