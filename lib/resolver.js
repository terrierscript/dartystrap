const path = require("path")

const resolvePath = (...args) => {
  return path.join(...["/", ...args])
}

const partialFileName = fileName => {
  const { dir, name } = path.parse(fileName)
  return resolvePath(dir, `_${normalizeSuffix(name)}`)
}

const normalizeSuffix = file => {
  const { name } = path.parse(file)
  return `${name}.scss`
}

class Resolver {
  constructor(files) {
    this.files = files
    this.resolved = {}
  }
}

/**
 *
 * @param {Array} files
 * @param {String} url
 * @param {String} prev
 */
exports.resolver = (files, url, prev) => {
  const cwd = prev === "stdin" ? path.dirname(url) : path.dirname(prev)
  const normalizedFile = normalizeSuffix(url)
  const filesSet = new Set(files)
  const baseFile = resolvePath(cwd, normalizedFile)
  if (filesSet.has(baseFile)) {
    return baseFile
  }
  const partial = resolvePath(cwd, partialFileName(url))
  if (filesSet.has(partial)) {
    return partial
  }
  throw new Error("Not found")
}
