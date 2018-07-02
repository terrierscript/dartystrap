require("core-js/web/immediate")
window.Buffer = require("buffer/").Buffer

const { build } = require("./lib/bootstrap.js")

build()
  .then(css => {
    document.querySelector("#result").innerText = css
  })
  .catch(err => {
    console.error(err)
  })
// //
