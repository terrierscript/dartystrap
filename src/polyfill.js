require("core-js/web/immediate")
window.Buffer = require("buffer/").Buffer
console.log("polyfill", setImmediate)
