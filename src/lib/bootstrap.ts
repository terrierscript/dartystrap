// const sass = require("../../dart-sass/build/npm")
import sass from "sass"
import path from "path"
import unpkg from "./unpkg"

const buildParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      return [`${key}: ${value};`]
    })
    .join("\n")
}
//
const scssString = (append) => {
  const url = "scss/bootstrap"
  const scss = `
  ${append}
  @import "${url}";
  `
  return scss
}

const render = (scss: string, importer): Promise<string> => {
  return new Promise((res, rej) => {
    const result = sass.render(
      {
        data: scss,
        importer(url, prev, done) {
          importer(url, prev, done)
        }
      },
      (err, result) => {
        if (err) {
          return rej(err)
        }
        if (!result) {
          return rej(result)
        }
        return res(result.css.toString())
      }
    )
  })
}

const renderSync = (scss: string, importer): string => {
  const result = sass.renderSync({
    data: scss,
    importer: (url, prev) => {
      return importer(url, prev)
    }
  })
  return result.css.toString()
}

export const build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then((importer) => {
    return renderSync(scss, importer)
    // return render(scss, importer)
  })
}
