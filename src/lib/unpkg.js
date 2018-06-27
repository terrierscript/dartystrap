const { flatten } = require("./flatten")

const fetch = require("cross-fetch")
const path = require("path")
const { resolver } = require("./resolver")

class _UnpkgFetcher {
  constructor(packageName, files) {
    this.packageName = packageName
    this.files = Object.keys(files)
    this.resolved = {}
  }
  resolveFilename(filePath, prev) {
    const prevCached = this.resolved[prev] ? this.resolved[prev] : prev
    console.log(filePath, prevCached)
    const fileName = resolver(this.files, filePath, prevCached)
    this.resolved[filePath] = fileName
    return this.getFullPath(fileName)
  }
  getFullPath(filePath) {
    return `https://unpkg.com/${this.packageName}${filePath}`
  }
}

module.exports = packageName => {
  return fetch(`https://unpkg.com/${packageName}/?meta`)
    .then(r => r.json())
    .then(r => {
      const files = flatten(r.files)
      const resolver = new _UnpkgFetcher(packageName, files)
      return (url, prev, done) => {
        const filename = resolver.resolveFilename(url, prev)
        fetch(filename)
          .then(r => r.text())
          .then(scss => {
            done({
              // file: resolver.getFullPath(url),
              contents: scss
            })
          })
          .catch(e => {
            console.error(e)
          })
      }
    })
}
