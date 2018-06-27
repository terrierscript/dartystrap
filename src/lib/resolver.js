const path = require("path")
const pathParse = require("path-parse")

const resolvePath = (...args) => {
  return path.join(...["/", ...args])
}

const partialFileName = fileName => {
  const { dir, name } = pathParse(fileName)
  return resolvePath(dir, `_${normalizeSuffix(name)}`)
}

const normalizeSuffix = file => {
  const { name } = pathParse(file)

  return `${name}.scss`
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
