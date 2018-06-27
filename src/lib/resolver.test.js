const { resolver } = require("./resolver")
const assert = require("assert")

it("resolver", () => {
  const files = ["/scss/bootstrap.scss", "/scss/_functions.scss"]
  assert.equal(
    resolver(files, "functions", "/scss/bootstrap"),
    "/scss/_functions.scss"
  )
})
it("stdin", () => {
  const files = ["/scss/bootstrap.scss", "/scss/_functions.scss"]
  assert.equal(
    resolver(files, "/scss/bootstrap", "stdin"),
    "/scss/bootstrap.scss"
  )
})
