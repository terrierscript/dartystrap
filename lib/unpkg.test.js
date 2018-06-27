const unpkg = require("./unpkg")

it("XXX", (done) => {
  unpkg("bootstrap").then( importer => {
    console.log(importer)
    importer("functions", "/scss/bootstrap.scss", (r) => {
      done()
    })
  })
})