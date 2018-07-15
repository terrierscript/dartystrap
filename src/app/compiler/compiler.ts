export const compileWithWorker = (variables) => {
  const worker = new Worker("../../worker/build.worker.js")
  const promise = new Promise((resolve, reject) => {
    worker.onmessage = (msg) => {
      if (msg.data.error) {
        return reject(msg.data.error)
      }
      resolve(msg.data.toString())
    }
    worker.onerror = (error) => {
      reject(error)
    }
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
