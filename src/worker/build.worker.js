// require("core-js/web/immediate")
import "./polyfill"
// require("core-js/web/immediate")
// window.Buffer = require("buffer/").Buffer

// console.log(process)
import { build } from "../lib/bootstrap.js"

self.addEventListener(
  "message",
  function(e) {
    build(e.data).then((css) => {
      self.postMessage(css)
    })
  },
  false
)
