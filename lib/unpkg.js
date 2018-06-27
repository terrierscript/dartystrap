const { flatten } = require("./flatten")

const axios = require("axios")
const path = require("path")
const { buildIncludePaths } = require("node-sass-magic-importer/dist/toolbox")
const { resolver } = require("./resolver")

class _UnpkgFetcher {
  constructor(packageName, files) {
    this.packageName = packageName
    this.files = Object.keys(files)
    this.resolved = {}
  }
  getScssFile(filePath, prev) {
    const prevCached = this.resolved[prev] ? this.resolved[prev] : prev
    console.log(filePath, prevCached)
    const fileName = resolver(this.files, filePath, prevCached)
    this.resolved[filePath] = fileName

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
    return (url, prev, done) => {
      resolver
        .getScssFile(url, prev)
        .then(r => {
          done({
            // file: resolver.getFullPath(url),
            contents: r.data
          })
        })
        .catch(e => {
          console.error(e)
        })
    }
  })
}
