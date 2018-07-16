// @ts-ignore
import sass from "sass"
// import path from "path"
import unpkg, { Resolver } from "./unpkg"
import { VariablesMap, VariableType } from "./scssVariables"
// import { ServerResponse } from "http"

const buildParams = (params: VariablesMap) => {
  return Object.values<VariableType>(params)
    .filter((v) => !!v.value)
    .map((value) => {
      return [`${value.name}: ${value.value};`]
    })
    .join("\n")
}
//
const scssString = (append: string) => {
  const url = "scss/bootstrap"
  const scss = `
  ${append}
  @import "${url}";
  `
  return scss
}

// const renderSassMock = (...args): Promise<string> => {
//   return new Promise((res, rej) => {
//     const scss = ".foo{color:red}"
//     console.log(sass)
//     sass.render({ data: scss }, (e, r) => res(r.css.toString()))
//   })
// }

const render = (scss: string, importer: Function): Promise<string> => {
  return new Promise((res, rej) => {
    const result = sass.render(
      {
        data: scss,
        importer
      },
      (err: unknown, result: any) => {
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

export const renderSync = (scss: string, importer: Function): string => {
  const result = sass.renderSync({
    data: scss,
    importer
  })
  return result.css.toString()
}

const generateImporter = (resolver: Resolver) => {
  return (url: string, prev: string, done: Function) => {
    const contents = resolver.getContent(url, prev)
    if (typeof done === "function") {
      return done({ contents })
    }
    return { contents }
  }
}

export const build = (variables: VariablesMap = {}, sync = true) => {
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
