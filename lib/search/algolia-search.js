const algoliasearch = require('algoliasearch')
const { get } = require('lodash')
const { namePrefix } = require('./config.js')

// https://www.algolia.com/apps/ZI5KPY1HBE/dashboard
// This API key is public. There's also a private API key for writing to the Algolia API
const searchClient = algoliasearch('J0OUHPIG0G', '0c1c6b683cd1eb3b5fa40fa6a03f13fd')

module.exports = async function loadAlgoliaResults ({ version, language, query, filters, limit }) {
  const indexName = `${namePrefix}-${version}-${language}`
  const index = searchClient.initIndex(indexName)

  // allows "phrase queries" and "prohibit operator"
  // https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/
  const { hits } = await index.search(query, {
    hitsPerPage: limit,
    advancedSyntax: true,
    highlightPreTag: '<mark>',
    highlightPostTag: '</mark>',
    filters
  })

  return hits.map(hit => ({
    url: hit.objectID,
    breadcrumbs: get(hit, '_highlightResult.breadcrumbs.value'),
    heading: get(hit, '_highlightResult.heading.value'),
    title: get(hit, '_highlightResult.title.value'),
    content: get(hit, '_highlightResult.content.value'),
    topics: hit.topics
  }))
}
