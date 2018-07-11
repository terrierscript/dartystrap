export const compileWithWorker = (variables) => {
  const worker = new Worker("../../worker/build.worker.js")
  const promise = new Promise((resolve) => {
    worker.addEventListener("message", (e) => {
      // console.log(e)
      resolve(e.data.toString())
    })
  })
  worker.postMessage(variables)
  return promise
}

export const compile = (variables): any => {
  const { build } = require("../../lib/build.js")
  console.log(build)
  return build(variables)
}

export const compileWithDynamicImport = (variables): any => {
  return import("../../lib/build.js").then((modules) => {
    const { build } = modules
    return build(variables)
  })
}
