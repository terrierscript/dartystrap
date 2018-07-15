import { build } from "../lib/build.js"

self.addEventListener(
  "message",
  (e) => {
    // import("../lib/build.js").then((mod) => {
    build(e.data)
      .then((css) => {
        self.postMessage(css)
      })
      .catch((e) => {
        throw e
      })
    // })
  },
  false
)
