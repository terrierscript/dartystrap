const sass = require("../../dart-sass/build/npm/sass.dart")
// const sass = require("sass")

exports.build = () => {
  const scss = `.foo { .baz { color: red } }`
  return new Promise(res => {
    res(sass.renderSync({ data: scss }).css.toString())
  })
}
