
const axios = require("axios")

axios.get("https://unpkg.com/bootstrap@4.1.1/scss/")
  .then(r => {
    console.log(r)
  })