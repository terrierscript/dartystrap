const { build } = require("../src/lib/bootstrap.js")
build()
  .then(css => {
    console.log(css)
  })
  .catch(err => {
    console.error(err)
  })
