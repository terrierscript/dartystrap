const { Packager } = require("parcel-bundler")
const JSPackager = require("parcel-bundler/src/packagers/JSPackager")

class MyPackager extends Packager {
  async start() {
    console.log("start")
    // optional. write file header if needed.
    // await this.dest.write(header)
  }

  async addAsset(asset) {
    // console.log("add", asset.name)
    // required. write the asset to the output file.
    // await this.dest.write(asset.generated.foo)
  }

  async end() {
    console.log("end")

    // optional. write file trailer if needed.
    // await this.dest.end(trailer)
  }
}
module.exports = bundler => {
  // throw "fffff"
  console.log(bundler)
  console.log("bundler")

  // bundler.addPackager("js", MyPackager)
}
