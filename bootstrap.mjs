import sass from "sass"
import fs from "fs"
import path from "path"
// import promisify from "promisify"

const bsRoot = "./node_modules/bootstrap/scss"
const baseBs = fs.readFileSync(
  path.resolve(bsRoot, "bootstrap.scss"),
  {encoding: "UTF-8"}
)

const result = sass.renderSync({
  data: baseBs,
  includePaths: [
    bsRoot
  ]
})

console.log(result.css.toString())