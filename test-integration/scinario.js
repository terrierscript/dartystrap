const Bundler = require("parcel-bundler")
const Path = require("path")
const puppeteer = require("puppeteer")

const file = Path.join(__dirname, "../parcel/index.html")

const log = (...args) => {
  console.log(...args)
}

const select = (id) => `[data-test=${id}]`

async function runBundle() {
  // Initializes a bundler using the entrypoint location and options provided
  const bundler = new Bundler(file, { minify: false })

  // Run the bundler, this returns the main bundle
  // Use the events if you're using watch mode as this promise will only trigger once and not for every rebuild
  await bundler.serve()
  const { port } = bundler.server.address()
  //
  log("start puppeteer")
  const headless = !!process.env.CI
  log(`headless: ${headless}`)
  const browser = await puppeteer.launch({ headless })
  log("browser launched")

  const page = await browser.newPage()
  log("page launched")

  await page.goto(`http://localhost:${port}`)
  const elm = await page.waitForSelector(select("generate-button"))
}

runBundle()
