export const compileWithWorker = (variables) => {
  const worker = new Worker("../worker/build.worker.js")
  const promise = new Promise((resolve) => {
    worker.addEventListener("message", (e) => {
      // console.log(e)
      resolve(e.data.toString())
    })
  })
  worker.postMessage(variables)
  return promise
}

export const compile = (variables) => {
  return import("../lib/index.js").then((modules) => {
    console.log(modules)
    const { build } = modules
    return build(variables)
  })
}
