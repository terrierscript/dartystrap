const { flatten } = require("./flatten")
const { resolver } = require("./resolver")

if (!fetch) {
  const fetch = require("cross-fetch")
}
const path = require("path")

class _UnpkgFetcher {
  constructor(packageName, version, files) {
    this.packageName = packageName
    this.version = version
    this.files = Object.keys(files)
    this.resolved = {}
  }
  resolveFilename(filePath, prev) {
    const prevCached = this.resolved[prev] ? this.resolved[prev] : prev
    // console.log(filePath, prevCached)
    // console.log(prevCached)
    const fileName = resolver(this.files, filePath, prevCached)
    if (!fileName) {
      throw new "FileName is not found"()
    }
    this.resolved[filePath] = fileName
    return this.getFullPath(fileName)
  }
  getFullPath(filePath) {
    return `https://unpkg.com/${this.packageName}@${this.version}${filePath}`
  }
}

module.exports = packageName => {
  return fetch(`https://unpkg.com/${packageName}/?meta`)
    .then(r => r.json())
    .then(r => {
      const worker = new Worker("../worker")
      const files = flatten(r.files)
      const resolver = new _UnpkgFetcher(packageName, "4.1.1", files)
      return (url, prev, done) => {
        const filename = resolver.resolveFilename(url, prev)
        fetch(filename)
          .then(r => r.text())
          .then(scss => {
            return done({
              contents: scss
            })
          })
          .catch(e => {
            console.error(e)
          })
      }
    })
}
