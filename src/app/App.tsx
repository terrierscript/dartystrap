import React from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap"
import { Variables, VariablesMap } from "./Variables"
import { Examples } from "./Examples"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

export class App extends Component<any, any> {
  state = { cssResult: "", variables: {} }
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
    this.setState({ variables })
  }
  render() {
    return (
      <div>
        <Variables onChangeVariables={this.handleChangeVaribles} />
        <Examples variables={this.state.variables} />
        <Result>{this.state.cssResult}</Result>
      </div>
    )
  }
}
