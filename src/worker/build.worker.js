// import "../polyfill"
import { build } from "../lib/build.js"
self.addEventListener(
  "message",
  function(e) {
    // import("../lib/build.js").then(({ build }) => {
    build(e.data)
      .then((css) => {
        self.postMessage(css)
      })
      .catch((e) => {
        console.error(e)
      })
    // })
  },
  false
)
