const sass = require("sass")
const fs = require("fs")
const path = require("path")
// import promisify from "promisify"
const Fiber = require("fibers")
const axios = require("axios")
const bsRoot = "./node_modules/bootstrap/scss"
const unpkg = require("./unpkg")
// const baseBs = fs.readFileSync(
//   path.resolve(bsRoot, "bootstrap.scss"),
//   {encoding: "UTF-8"}
// )

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

const getFile = file => {
  return axios.get(getUrl(file)).then(r => {
    return r.data
  })
}
const importer = resolver => {}

exports.build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then(importer => {
    return new Promise((res, rej) => {
      return sass.render(
        {
          data: scss,
          importer: importer,
          // fiber: Fiber,
          includePaths: [bsRoot]
        },
        (err, result) => {
          if (err) {
            rej(err)
          }
          return res(result.css.toString())
        }
      )
    })
  })
}
