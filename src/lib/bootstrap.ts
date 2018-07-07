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

const awaitImporter = (importer, url, prev) => {
  return new Promise((res) => {
    importer(url, prev, (r) => {
      res(r)
    })
  })
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
          console.log("ERRRRR")
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
    importer: (url, prev) => {
      return importer(url, prev)
    }
  })
  return result.css.toString()
}

export const generateImporter = (resolver) => {
  return (url, prev, done) => {
    const contents = resolver.getContent(url, prev)
    if (typeof done === "function") {
      return done({ contents })
    }
    return { contents }
  }
}

export const build = (variables = {}) => {
  const vars = buildParams(variables)
  const scss = scssString(vars)
  return unpkg("bootstrap").then((resolver) => {
    return renderSync(scss, resolver)
    // return render(scss, importer)
  })
}
