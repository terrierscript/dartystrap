const { build } = require("./bootstrap.js")

build().then( css => {
  console.log(css)
}).catch(err => {
  console.error(err)
})


// const sass = require("sass")

// sass.renderSync({
// 	data: '@import "http://file.sass";',
// 	importer: url => {
//     console.log("impr", url);

// 		return { contents: '$foo: bar;' };
// 	},
// });