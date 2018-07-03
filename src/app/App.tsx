import React from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap"
import { Variables, VariablesMap } from "./Variables"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

export class App extends Component<any, any> {
  state = { cssResult: "" }
  componentDidMount() {
    this.sync()
  }
  sync(variables = {}) {
    build(variables).then(cssResult => {
      this.setState({ cssResult })
    })
  }
  handleChangeVaribles = (v: VariablesMap) => {
    const variables = Object.entries(v)
      .filter(([k, v]) => {
        return !!v.value
      })
      .reduce((prev, [k, v]) => {
        return {
          ...prev,
          [k]: v.value
        }
      }, {})
    this.sync(variables)
  }
  render() {
    return (
      <div>
        <Variables onChangeVariables={this.handleChangeVaribles} />
        <Result>{this.state.cssResult}</Result>
      </div>
    )
  }
}
