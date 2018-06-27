const { build } = require("../src/lib/bootstrap.js")

export default () => {
  build()
    .then(css => {
      console.log(css)
    })
    .catch(err => {
      console.error(err)
    })
  return <div>aaa</div>
}
