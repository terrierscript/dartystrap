// import sass from "../../dart-sass/build/npm"
import sass from "sass"
// import path from "path"
import unpkg from "./unpkg"
// import { ServerResponse } from "http"

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

const renderSassMock = (...args): Promise<string> => {
  return new Promise((res, rej) => {
    const scss = ".foo{color:red}"
    console.log(sass)
    sass.render({ data: scss }, (e, r) => res(r.css.toString()))
  })
}

const render = (scss: string, importer): Promise<string> => {
  return new Promise((res, rej) => {
    const result = sass.render(
      {
        data: scss,
        importer
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

export const renderSync = (scss: string, importer): string => {
  const result = sass.renderSync({
    data: scss,
    importer
  })
  return result.css.toString()
}

const generateImporter = (resolver) => {
  return (url, prev, done) => {
    const contents = resolver.getContent(url, prev)
    if (typeof done === "function") {
      return done({ contents })
    }
    return { contents }
  }
}

export const build = (variables = {}, sync = true) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then((resolver) => {
    if (sync) {
      return renderSync(scss, generateImporter(resolver))
    } else {
      return render(scss, generateImporter(resolver))
    }
  })
}
