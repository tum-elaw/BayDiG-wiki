const readJsonFile = require('../../lib/read-json-file')


// blanket redirects to external websites
module.exports = function httpRedirects (req, res, next) {
  if (req.header('x-forwarded-proto') !== 'https') {
    return res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    return next()
  }
}
