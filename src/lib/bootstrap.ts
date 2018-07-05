// import sass from "../../dart-sass/build/npm"
import sass from "sass"
// import path from "path"
import unpkg from "./unpkg"
// import { ServerResponse } from "http"

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
  @import "${url}";
  `
  return scss
}
const renderSassMock = (...args): Promise<string> => {
  return new Promise((res, rej) => {
    const scss = ".foo{color:red}"
    console.log(sass)
    sass.render({ data: scss }, (e, r) => res(r.css.toString()))
  })
}
const renderSass = (scss: string, importer): Promise<string> => {
  // return renderSassMock()
  return new Promise((res, rej) => {
    // scss = ".foo{color:red}"
    console.log(scss)
    const result = sass.render(
      {
        data: scss,
        importe(url, prev, done) {
          console.log(url, prev, done)
          done("")
          // importer(url, prev, done)
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

export const build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then((importer) => {
    return renderSass(scss, importer)
  })
}
