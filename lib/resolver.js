const path = require("path")


const cleanFilepath = (filepath, newFilenameFn) => {
  return path.resolve(
    path.join(
      path.dirname(filepath), 
      newFilenameFn(path.basename(fileName))
    )
  )
}

const partialFileName = (fileName) => {
  return cleanFilepath(
    fileName,  (basename => `_${basename}`)
  )   
}

const appendSuffix = (fileName) => {
  return cleanFilepath(
    fileName,
    (basename) => path.basename(fileName, path.extname(fileName))
  return`${onlyFileName}.scss`
}

const resolve = (files, searchUrls) => {

}

/**
 * 
 * @param {Array} files 
 * @param {String} url 
 * @param {String} prev 
 */
module.exports =  (files, url, prev) => {
  const cwd = path.dirname(prev)

  const filesSet = new Set(files)
  const a = partialFileName(url)
  console.log(a)
}