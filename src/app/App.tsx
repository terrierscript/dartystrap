import React from "react"
import { build } from "./lib/bootstrap.js"

export class App extends React.Component {
  state = {}
  componentDidMount() {
    build()
  }
  render() {
    return <div />
  }
}
