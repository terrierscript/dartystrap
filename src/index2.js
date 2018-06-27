require("setimmediate")

const sass = require("sass")

console.log(sass.renderSync(".foo{ color: red }"))
