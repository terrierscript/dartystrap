import * as React from "react"
import { SFC } from "react"
import { Component, ReactNode } from "react"
import {
  VariableType,
  VariablesMap,
  // convertToMap,
  convertToKeyValue,
  convertToMapFromArray,
  KeyValue
} from "app/scssVariables"

import { Submitter } from "./Submitter"
import { fields } from "./init"
import { VariableForm } from "./VariableForm"

export type VariableChangeHandler = (value: VariableType) => any
export type VariableContainerChildren = {
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}

type Props = {
  children: (value: VariableContainerChildren) => ReactNode
}
type State = { variables: VariablesMap }

const initial: VariablesMap = convertToMapFromArray(fields)

class InternalVariablesContainer extends React.Component<Props, State> {
  state = { variables: initial }
  handleChange = (newVariableType: VariableType) => {
    const { name } = newVariableType
    this.setState({
      variables: {
        ...this.state.variables,
        [name]: newVariableType
      }
    })
  }
  render() {
    return this.props.children({
      variables: this.state.variables,
      onChangeVariable: this.handleChange
    })
  }
}

const Console = (item) => {
  console.log("Console", item)
  return null
}

export const VariableContainer: SFC<{
  children: (props: { variables: KeyValue }) => ReactNode
}> = ({ children }) => {
  return (
    <InternalVariablesContainer>
      {(props: VariableContainerChildren) => (
        <div>
          <VariableForm {...props} />
          <Submitter<VariablesMap> item={props.variables}>
            {(item) => {
              const variablesKeyValue = convertToKeyValue(item)
              return <div>{children({ variables: variablesKeyValue })}</div>
            }}
          </Submitter>
        </div>
      )}
    </InternalVariablesContainer>
  )
}
