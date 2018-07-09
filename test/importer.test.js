const sass = require("sass")
const fetch = require("cross-fetch")
it("", () => {
  const css = `
    @import 'scss/bootstrap';
  `
  sass.render(
    {
      data: css,
      importer: (url, prev, done) => {
        console.log(url, prev)
        const unpkgUrl = getUnpkgFilePath(url, prev)
        fetch(unpkgUrl)
          .then((r) => r.text())
          .then((contents) => {
            done({ contents })
          })
      }
    },
    (err, res) => {
      if (err) {
        console.log(err)
        return
      }
      if (!res) {
      }
      console.log(res.css.toString())
    }
  )
})
