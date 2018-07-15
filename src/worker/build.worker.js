import { build } from "../lib/build.js"

self.addEventListener(
  "message",
  (e) => {
    // import("../lib/build.js").then((mod) => {
    build(e.data)
      .then((css) => {
        self.postMessage(css)
      })
      .catch((error) => {
        // TODO: use native error
        self.postMessage({ error: error })
        throw error
      })
    // })
  },
  false
)
