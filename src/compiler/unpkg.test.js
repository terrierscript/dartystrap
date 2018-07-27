const unpkg = require("./unpkg")

it("unpkg", done => {
  unpkg("bootstrap").then(importer => {
    importer("functions", "/scss/bootstrap.scss", r => {
      done()
    })
  })
})
