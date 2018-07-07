import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "app/scssVariables"
import { ReactNode } from "react"
import { fields } from "./init"

export type VariableChangeHandler = (value: VariableType) => any
export type VariableContainerChildren = {
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}

export type Props = {
  children: (value: VariableContainerChildren) => ReactNode
}
export type State = { variables: VariablesMap }

export const initial: VariablesMap = convertToMapFromArray(fields)

export class VariablesState extends React.Component<Props, State> {
  state = { variables: initial }
  handleChange = (newVariableType: VariableType) => {
    const { name } = newVariableType
    const newState = {
      variables: { ...this.state.variables, [name]: newVariableType }
    }
    // console.log(newState.variables["$link-decoration"])
    this.setState(newState)
  }
  render() {
    // console.log(this.state.variables["$link-decoration"])
    return this.props.children({
      variables: this.state.variables,
      onChangeVariable: this.handleChange
    })
  }
}
