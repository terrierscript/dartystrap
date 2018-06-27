const { flatten } = require("./flatten")

const axios = require("axios")
const path = require("path")
const { buildIncludePaths } = require("node-sass-magic-importer/dist/toolbox")
const { resolver } = require("./resolver")

class _UnpkgFetcher {
  constructor(packageName, files) {
    this.packageName = packageName
    this.files = files
  }
  getScssFile(filePath, prev) {
    const fileName = resolver(Object.keys(this.files), filePath, prev)
    return axios.get(this.getFullPath(fileName))
  }
  getFullPath(filePath) {
    return `https://unpkg.com/${this.packageName}${filePath}`
  }
}

module.exports = packageName => {
  return axios.get(`https://unpkg.com/${packageName}/?meta`).then(r => {
    const files = flatten(r.data.files)
    const resolver = new _UnpkgFetcher(packageName, files)
    return function(url, prev, done) {
      console.log(url, prev)
      resolver.getScssFile(url, prev).then(r => {
        done({
          // file: resolver.getFullPath(url),
          contents: r.data
        })
      })
    }
  })
}
