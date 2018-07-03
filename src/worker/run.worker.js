self.addEventListener(
  "message",
  function(e) {
    console.log(e)
    // const result = e.data()
    // self.postMessage(result)
  },
  false
)
