const { build } = require("./lib/bootstrap.js")

build()
  .then(css => {
    console.log(css)
    document.querySelector()
  })
  .catch(err => {
    console.error(err)
  })
