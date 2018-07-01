const { Packager } = require("parcel-bundler")

class MyPackager extends Packager {}
module.exports = bundler => {
  // throw "fffff"
  console.log("bundler")
  bundler.addAssetType("js")
}
