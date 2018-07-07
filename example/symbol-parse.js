const fetch = require("cross-fetch")
const symbolsParser = require("scss-symbols-parser")

fetch("https://unpkg.com/bootstrap@4.1.1/scss/_variables.scss")
  .then((r) => r.text())
  .then((text) => {
    const { variables } = symbolsParser.parseSymbols(text)
    const keyValue = variables
      // not include map-merge
      .filter((item) => item.value.indexOf("map-merge") == -1)
      // not include ()
      .filter((item) => item.value.indexOf("(") == -1)
      // not include show another value
      .filter((item) => item.value.indexOf("$") == -1)
      .map(({ name, value }) => {
        return {
          name,
          defaultValue: value.replace("!default", "").trim()
        }
      })
    console.log(JSON.stringify(keyValue, null, 2))
  })
