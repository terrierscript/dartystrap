import "./polyfill"
const build = self.addEventListener(
  "message",
  function(e) {
    import("../lib/index.js").then(({ build }) => {
      build(e.data)
        .then((css) => {
          self.postMessage(css)
        })
        .catch((e) => {
          console.error(e)
        })
    })
  },
  false
)
