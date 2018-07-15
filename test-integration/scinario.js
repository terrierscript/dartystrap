const Bundler = require("parcel-bundler")
const Path = require("path")
const puppeteer = require("puppeteer")

const file = Path.join(__dirname, "../parcel/index.html")

async function runBundle() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(file, { minify: false })

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.serve()
  const { port } = bundler.server.address()
  //
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`http://localhost:${port}`)
}

runBundle()
