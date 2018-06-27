const sass = require("../../dart-sass/build/sass.dart")
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
      return sass.render(
        {
          data: scss,
          importer: importer
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
