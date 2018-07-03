import React from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap.js"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

export class App extends Component<any, any> {
  state = {
    css: ""
  }
  componentDidMount() {
    console.log("start")
    build().then(css => {
      this.setState({ css })
    })
  }
  render() {
    return (
      <div>
        <Result>{this.state.css}</Result>
      </div>
    )
  }
}
