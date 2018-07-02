const sass = require("../../dart-sass/build/npm")
// const sass = require("sass")
const path = require("path")
const unpkg = require("./unpkg")

const buildParams = params => {
  return Object.entries(params)
    .map(([key, value]) => {
      return [`$${key}: ${value};`]
    })
    .join("\n")
}
//
const scssString = append => {
  const url = "scss/bootstrap"
  const scss = `
  ${append}
  @import "${url}";
  `
  return scss
}

exports.build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then(importer => {
    return new Promise((res, rej) => {
      const result = sass.render(
        {
          data: scss,
          importer: (url, prev, done) => {
            return importer(url, prev, done)
          }
          // fiber: Fiber,
          // includePaths: [bsRoot]
        },
        (err, result) => {
          if (err) {
            return rej(err)
          }
          if (!result) {
            return rej(result)
          }
          return res(result.css.toString())
        }
      )
    })
  })
}
