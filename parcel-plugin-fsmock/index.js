console.log("fsmockl")

module.exports = bundler => {
  throw "fffff"
  console.log("bundler")
  bundler.addAssetType("md", require.resolve("./MarkdownAsset.js"))
}
