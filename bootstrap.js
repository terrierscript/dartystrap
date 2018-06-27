const sass = require("sass")
const fs = require("fs")
const path = require("path")
// import promisify from "promisify"
const Fiber = require("fibers");

const bsRoot = "./node_modules/bootstrap/scss"
// const baseBs = fs.readFileSync(
//   path.resolve(bsRoot, "bootstrap.scss"),
//   {encoding: "UTF-8"}
// )

const buildParams = (params) => {
  return Object.entries(params).map( ([key, value]) => {
    return [`$${key}: ${value};`]
  }).join("\n")
}
// 
const scssString = (append) => {
  // const url = "node_modules/bootstrap/scss/bootstrap"
  const url = "https://unpkg.com/bootstrap@4.1.1/scss/bootstrap.scss"
  const scss = `
  ${append}
  @import "${url}";
  
  `
  return scss
}

exports.build = (variables = {}) => {
  console.log(variables)
  const vars = buildParams(variables);
  const result = sass.renderSync({
    data: scssString(vars),
    importer: function(url, prev, done) {
      // ...
      console.log(url)
    },
    fiber: Fiber,
    includePaths: [
      bsRoot
    ]
  })
  return result.css.toString()
}
