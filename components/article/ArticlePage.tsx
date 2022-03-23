import cx from 'classnames'

import { DefaultLayout } from 'components/DefaultLayout'
import { ArticleVersionPicker } from 'components/article/ArticleVersionPicker'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { ArticleTitle } from 'components/article/ArticleTitle'
import { useArticleContext } from 'components/context/ArticleContext'
import { InfoIcon } from '@primer/octicons-react'
import { useTranslation } from 'components/hooks/useTranslation'
import { LearningTrackNav } from './LearningTrackNav'
import { Giscus } from '@giscus/react'

export const ArticlePage = () => {
  const {
    title,
    intro,
    renderedPage,
    contributor,
    permissions,
    includesPlatformSpecificContent,
    defaultPlatform,
    product,
    miniTocItems,
    currentLearningTrack,
  } = useArticleContext()
  const { t } = useTranslation('pages')
  return (
    <DefaultLayout>
      <div className="container-xl px-3 px-md-6 my-4 my-lg-4">
        <article className="markdown-body">
          <div className="d-lg-flex flex-justify-between">
            <div className="d-block d-lg-none">
             { /* <ArticleVersionPicker />  disabled Version Picker*/ }
            </div>
            <div className="d-flex flex-items-center">
              <Breadcrumbs />
            </div>
            <div className="d-none d-lg-block">
             {/*} <ArticleVersionPicker /> disabled Version Picker */ }

            </div>
          </div>
        
          

          <div className="article-grid-container mt-2">
            <div className="article-grid-head">
              <ArticleTitle>{title}</ArticleTitle>

              {contributor && (
                <div className="contributor-callout border rounded-1 mb-4 p-3 color-border-info color-bg-info f5">
                  <p>
                    <span className="mr-2">
                      <InfoIcon />
                    </span>
                    {t('contributor_callout')} <a href={contributor.URL} target="_blank">{contributor.name}</a>.
                  </p>
                </div>
              )}

              {intro && (
                <div className="lead-mktg">
                  <p>{intro}</p>
                </div>
              )}

              {permissions && (
                <div
                  className="permissions-statement"
                  dangerouslySetInnerHTML={{ __html: permissions }}
                />
              )}

              {includesPlatformSpecificContent && (
                <nav
                  className="UnderlineNav my-3"
                  data-default-platform={defaultPlatform || undefined}
                >
                  <div className="UnderlineNav-body">
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a href="#" className="UnderlineNav-item platform-switcher" data-platform="mac">
                      Mac
                    </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className="UnderlineNav-item platform-switcher"
                      data-platform="windows"
                    >
                      Windows
                    </a>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      href="#"
                      className="UnderlineNav-item platform-switcher"
                      data-platform="linux"
                    >
                      Linux
                    </a>
                  </div>
                </nav>
              )}

              {product && (
                <div
                  className="product-callout border rounded-1 mb-4 p-3 color-border-success color-bg-success"
                  dangerouslySetInnerHTML={{ __html: product }}
                />
              )}
            </div>

            <div className="article-grid-toc border-bottom border-xl-0 pb-4 mb-5 pb-xl-0 mb-xl-0">
              <div className="article-grid-toc-content">
                {miniTocItems.length > 1 && (
                  <>
                    <h2 id="in-this-article" className="f5 mb-2">
                      <a className="Link--primary" href="#in-this-article">
                        {t('miniToc')}
                      </a>
                    </h2>
                    <ul className="list-style-none pl-0 f5 mb-0">
                      {miniTocItems.map((item) => {
                        return (
                          <li
                            key={item.contents}
                            className={cx(
                              `ml-${item.indentationLevel * 3}`,
                              item.platform,
                              'mb-2 lh-condensed'
                            )}
                            dangerouslySetInnerHTML={{ __html: item.contents }}
                          />
                        )
                      })}
                    </ul>
                  </>
                )}
              </div>
            </div>

            <div className="markdown-body">
              <div
                id="article-contents"
                className="article-grid-body"
                dangerouslySetInnerHTML={{ __html: renderedPage }}
              />
            </div>
            <div className="no-print">
            <Giscus
                    repo="tum-elaw/baydig-wiki"
                    repoId="R_kgDOG7uxDw"
                    category="General"
                    categoryId="DIC_kwDOG7uxD84CN7U1"
                    mapping="title"
                    reactionsEnabled="1"
                    emitMetadata="0"
                    theme="preferred_color_scheme"
                    lang="de"
                  />
                  </div>
          </div>
                          
          {currentLearningTrack?.trackName ? (
            <div className="d-block mt-4 markdown-body">
              <LearningTrackNav track={currentLearningTrack} />
            </div>
          ) : null}
        </article>
      </div>
    </DefaultLayout>
  )
}
