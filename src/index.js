console.log("FOOOO")
// require("core-js")
require("setimmediate")
window.Buffer = require("buffer/").Buffer

const { build } = require("./lib/bootstrap.js")
// const { build } = require("./lib/bs.js")

build()
  .then(css => {
    document.querySelector("#result").innerText = css
  })
  .catch(err => {
    console.error(err)
  })
