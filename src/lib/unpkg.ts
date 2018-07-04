import { flatten } from "./flatten"
import { resolver } from "./resolver"
import { fetchWithStorage, fetchWithStorageJson } from "./fetch"
import path from "path"

const unpkg =
  process.env.NODE_ENV === "production" ? "/unpkg/" : "https://unpkg.com/"

class _UnpkgFetcher {
  packageName = ""
  version = ""
  files = []
  resolved = {}
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
      throw "FileName is not found"
    }
    this.resolved[filePath] = fileName
    return this.getFullPath(fileName)
  }
  getFullPath(filePath) {
    return `${unpkg}${this.packageName}@${this.version}${filePath}`
  }
}

const generateImporter = (r, packageName, version) => {
  const files = flatten(r.files)
  const resolver = new _UnpkgFetcher(packageName, version, files)
  return (url, prev, done) => {
    const filename = resolver.resolveFilename(url, prev)
    fetchWithStorage(filename)
      .then((scss) => {
        return done({
          contents: scss
        })
      })
      .catch((e) => {
        console.error(e)
      })
  }
}

export default (packageName, version = "4.1.1") => {
  const metaUrl = `${unpkg}${packageName}@${version}/?meta`
  return fetchWithStorageJson(metaUrl).then((r) => {
    return generateImporter(r, packageName, version)
  })
}
