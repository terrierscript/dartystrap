import { VariablesMap } from "./scssVariables"

interface Compiler {
  execute: Promise<any>
  terminate?: Function
}
export const compileWithWorker = (variables: VariablesMap): Compiler => {
  const worker = new Worker("../worker/build.worker.js")
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

  return {
    execute: promise,
    terminate: () => {
      console.log("terminate")
      worker.terminate()
    }
  }
}

// export const compile = (variables): Compiler => {
//   const { build } = require("../../lib/build.js")
//   console.log(build)
//   return {
//     promise: build(variables)
//   }
// }

export const compileWithDynamicImport = (variables: VariablesMap): Compiler => {
  return {
    // @ts-ignore
    execute: import("./entry.js").then((modules) => {
      const { build } = modules
      return build(variables)
    })
  }
}
