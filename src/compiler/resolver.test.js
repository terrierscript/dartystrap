const { resolver } = require("./resolver")
const assert = require("assert")

xit("resolver", () => {
  const files = ["/scss/bootstrap.scss", "/scss/_functions.scss"]
  assert.equal(
    resolver(files, "functions", "/scss/bootstrap"),
    "/scss/_functions.scss"
  )
})
xit("stdin", () => {
  const files = ["/scss/bootstrap.scss", "/scss/_functions.scss"]
  assert.equal(
    resolver(files, "/scss/bootstrap", "stdin"),
    "/scss/bootstrap.scss"
  )
})
