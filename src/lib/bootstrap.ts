// const sass = require("../../dart-sass/build/npm")
import sass from "sass"
import path from "path"
import unpkg from "./unpkg"

const buildParams = (params) => {
  return Object.entries(params)
    .map(([key, value]) => {
      return [`$${key}: ${value};`]
    })
    .join("\n")
}
//
const scssString = (append) => {
  const url = "scss/bootstrap"
  const scss = `
  ${append}
  .sample{
  @import "${url}";
  }
  `
  return scss
}

const renderSass = (scss: string, importer): Promise<string> => {
  return new Promise((res, rej) => {
    // console.time("css")
    const result = sass.render(
      {
        data: scss,
        importer: (url, prev, done) => {
          importer(url, prev, done)
        }
      },
      (err, result) => {
        // console.timeEnd("css")

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

export const build = (variables = {}, decorator = (scss) => scss) => {
  const vars = buildParams(variables)
  const scss = decorator(scssString(vars))
  return unpkg("bootstrap").then((importer) => {
    return renderSass(scss, importer)
  })
}
