// const sass = require("../../dart-sass/build/npm")
const sass = require("sass")
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

const worker = new Worker("../run.worker.js")

exports.build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then(importer => {
    return new Promise((res, rej) => {
      const result = sass.render(
        {
          data: scss,
          importer: (url, prev, done) => {
            // worker.addEventListener("message", e => {
            //   res(e.data)
            //   done
            // })
            worker.postMessage({ importer, url, prev, done })
            // importer(url, prev, done)
          }
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
