// import { build } from "../lib/build.js"

self.addEventListener(
  "message",
  function(e) {
    import("../lib/build.js").then((mod) => {
      console.log(mod)
      const { build } = mod
      build(e.data)
        .then((css) => {
          self.postMessage(css)
        })
        .catch((e) => {
          console.error(e)
        })
    })
  },
  false
)
