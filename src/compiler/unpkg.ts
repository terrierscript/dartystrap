import { flatten } from "./flatten"
import { resolver } from "./resolver"
import { fetchWithStorage, fetchWithStorageJson } from "./fetch"

const unpkg =
  process.env.NODE_ENV === "production" ? "/unpkg/" : "https://unpkg.com/"

const loadAllContents = (
  baseUrl: string,
  paths: string[]
): Promise<FileStorage> =>
  Promise.all(
    paths.map((url) =>
      fetchWithStorage(`${baseUrl}${url}`).then((scss) => {
        return {
          url,
          scss
        }
      })
    )
  ).then((results) => {
    return results.reduce((curr, { url, scss }) => {
      return {
        ...curr,
        [url]: scss
      }
    }, {})
  })

type FileStorage = {
  [filename: string]: string
}

class _FileNameResolver implements Resolver {
  files: string[] = []
  resolved: { [key: string]: string } = {}
  fileStorage: FileStorage = {}
  constructor(fileStorage: FileStorage) {
    this.files = Object.keys(fileStorage)
    this.fileStorage = fileStorage
  }
  resolveFilename(filePath: string, prev: string) {
    const prevCached = this.resolved[prev] ? this.resolved[prev] : prev
    const fileName = resolver(this.files, filePath, prevCached)
    if (!fileName) {
      throw `FileName is not found ${fileName}`
    }
    this.resolved[filePath] = fileName
    return fileName
  }
  getContent(url: string, prev: string): string {
    const filename = this.resolveFilename(url, prev)
    const content = this.fileStorage[filename]
    if (!content) {
      throw `Not found ${filename}`
    }
    return content
  }
}

export interface Resolver {
  getContent(url: string, prev: string): string
}

export default (packageName: string, version = "4.1.1") => {
  const baseUrl = `${unpkg}${packageName}@${version}`
  const metaUrl = `${baseUrl}/?meta`
  return fetchWithStorageJson(metaUrl)
    .then((response) => {
      const files = flatten(response.files)
      const scssFiles = Object.keys(files).filter(
        (name) => name.indexOf(".scss") > -1
      )
      return loadAllContents(baseUrl, scssFiles)
    })
    .then((contents) => {
      const resolver = new _FileNameResolver(contents)
      return resolver
    })
}
