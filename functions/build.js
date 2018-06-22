const { build } = require("../bootstrap")

exports.handler = function(event, context, callback) {
  const { queryStringParameters } = event
  const css = build(queryStringParameters)
  callback(null, {
    statusCode: 200,
    headers: {
      contentType: "text/css"
    },
    body: css,

  })
}