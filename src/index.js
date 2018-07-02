require("./polyfill")

const { build } = require("./lib/bootstrap.js")

console.time("css")
build()
  .then(css => {
    document.querySelector("#result").innerText = css
    console.timeEnd("css")
  })
  .catch(err => {
    console.error(err)
  })
// //
