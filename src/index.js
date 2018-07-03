import "./polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { App } from "./app/App"

ReactDOM.render(document.querySelector("#app"), <App />)

// console.time("css")
// build()
//   .then(css => {
//     document.querySelector("#result").innerText = css
//     console.timeEnd("css")
//   })
//   .catch(err => {
//     console.error(err)
//   })
// // //
