import "./polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { MyApp } from "app/App"
export const start = () => {
  ReactDOM.render(<MyApp />, document.querySelector("#app"))
}
