import React from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap"
import { Variables } from "./Variables"
import {
  VariablesMap,
  convertToMap,
  convertToKeyValue,
  KeyValue
} from "./scssVariables"

import { Examples } from "./Examples"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

export class App extends Component<
  any,
  { cssResult: string; variables: KeyValue }
> {
  state = { cssResult: "", variables: {} }
  componentDidMount() {
    this.sync()
  }
  sync(variables = {}) {
    build(variables).then((cssResult) => {
      this.setState({ cssResult })
    })
  }
  handleChangeVaribles = (v: VariablesMap) => {
    const variables = convertToKeyValue(v)
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
