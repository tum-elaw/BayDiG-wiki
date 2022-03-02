import { Tooltip } from '@primer/components'
import { PrinterIcon } from './PrinterIcon'
import { EditIcon } from './EditIcon'

import { PrintAction } from 'components/PrintAction'
import { useMainContext } from 'components/context/MainContext'

type Props = {
  children: React.ReactNode
}
export const ArticleTitle = ({ children }: Props) => {
        const { relativePath } = useMainContext()
        const contributionHref = relativePath
        ? `https://github.com/tum-elaw/baydig-wiki/edit/main/content/${relativePath}`
        : 'https://github.com/tum-elaw/baydig-wiki'

  return (
    <div className="d-flex flex-items-baseline flex-justify-between">
      <h1 className="my-4 border-bottom-0">{children}</h1>
      <div className="d-none d-lg-block ml-2">
        <Tooltip aria-label="Edit this article" noDelay direction="n">
        <a href={contributionHref}>
            <button className="btn-link Link--muted">
              <EditIcon />
            </button>
        </a>
        </Tooltip>
        <Tooltip aria-label="Print this article" noDelay direction="n">
          <PrintAction>
            <button className="btn-link Link--muted">
              <PrinterIcon />
            </button>
          </PrintAction>
        </Tooltip>
      </div>
    </div>
  )
}
