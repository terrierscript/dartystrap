const sass = require("sass")
const fs = require("fs")
const path = require("path")
// import promisify from "promisify"
const Fiber = require("fibers");
const axios = require("axios")
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
  const url = "bootstrap"
  // const url = "url(https://unpkg.com/bootstrap@4.1.1/scss/bootstrap.scss)"
  const scss = `
  ${append}
  @import "${url}";
  `
  return scss
}

const getFile = (url) => {
  return axios.get(url)
    .then(r => {
      return r.data
    })
}
exports.build = (variables = {}) => {
  console.log(variables)
  const vars = buildParams(variables);
  const scss = scssString(vars)
  return new Promise( (res, rej) => {
    return sass.render({
      data: scss,
      importer: (url, prev, done ) => {
        // ...
        const name = (url !== "bootstrap") ? `_${url}` : url
        const unpkgUrl = `https://unpkg.com/bootstrap@4.1.1/scss/${name}.scss`
        getFile(unpkgUrl)
          .then(r => done({ contents: r}) )
        // return { contents: "" }
      },
      fiber: Fiber,
      includePaths: [
        bsRoot
      ]
    }, (err, result) =>{
      if(err){
        rej(err)
      }
      return res(result.css.toString())
    })
  })
}
