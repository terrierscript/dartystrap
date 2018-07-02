require("core-js/web/immediate")
// require("setimmediate")
// import "setimmediate"
// require("process")

// console.log(process.cwd())
// console.log(process)
window.Buffer = require("buffer/").Buffer

// require("setimmediate")
// console.log(setImmediate)
const { build } = require("./lib/bootstrap.js")

build()
  .then(css => {
    document.querySelector("#result").innerText = css
  })
  .catch(err => {
    console.error(err)
  })
// //
