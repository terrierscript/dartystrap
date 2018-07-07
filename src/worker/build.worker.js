import "./polyfill"
import { build } from "../lib/bootstrap"

self.addEventListener(
  "message",
  function(e) {
    build(e.data)
      .then((css) => {
        console.log(css)
        self.postMessage(css)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  false
)
