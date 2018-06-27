const resolver = require( "./resolver")
// it("resolver", () => {
  const files = [
    "/scss/bootstrap",
    "/scss/_functions"
  ]
  console.log(
  resolver(files, "/scss/bootstrap", "functions")
  )
// })