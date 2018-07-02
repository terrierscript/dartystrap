const path = require("path")
module.exports = () => {
  return {
    target: "web",
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "build"),
      filename: "index.js"
    },
    mode: "development",
    resolve: {
      alias: {
        fs: "./fs.js"
      }
    }
  }
}
