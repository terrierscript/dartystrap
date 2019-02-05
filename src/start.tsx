import React from "react"
import ReactDOM from "react-dom"
import { MyApp } from "./app/App"

// const App = () => <div>hello</div>
export const start = () => {
  ReactDOM.render(<MyApp />, document.querySelector("#app"))
}
