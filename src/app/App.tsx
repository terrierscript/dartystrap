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

type AppState = { cssResult: string; variables: KeyValue }

export class App extends Component<{}, AppState> {
  state = { cssResult: "", variables: {} }
  componentDidMount() {
    this.sync()
  }
  sync(variables = {}) {
    console.log("sync")

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
    const { cssResult } = this.state
    return (
      <div>
        <Variables onChangeVariables={this.handleChangeVaribles} />
        <Examples baseCss={cssResult} />
        <Result>{cssResult}</Result>
      </div>
    )
  }
}
