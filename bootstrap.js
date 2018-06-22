const sass = require("sass")
const fs = require("fs")
const path = require("path")
// import promisify from "promisify"

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

const scssString = (append) => {
  const scss = `
  ${append}
  @import "node_modules/bootstrap/scss/bootstrap";
  `
  return scss
}

exports.build = (variables = {}) => {
  console.log("====")
  console.log(variables)
  const vars = buildParams(variables);
  const result = sass.renderSync({
    data: scssString(vars),
    includePaths: [
      bsRoot
    ]
  })
  return result.css.toString()
}
