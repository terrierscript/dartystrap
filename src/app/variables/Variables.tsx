import * as React from "react"
import { SFC } from "react"
import { Component, ReactNode } from "react"
import {
  VariableType,
  VariablesMap,
  convertToMap,
  convertToKeyValue,
  convertToMapFromArray
} from "app/scssVariables"

import { Submitter } from "app/Submitter"
import { fields } from "./init"

type VariableChangeHandler = (value: VariableType) => any
type VariableContainerChildren = {
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}

type Props = {
  children: (value: VariableContainerChildren) => ReactNode
}
type State = { variables: VariablesMap }

const initial: VariablesMap = convertToMapFromArray(fields)

class InternalVariablesContainer extends Component<Props, State> {
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

const VariableInput: SFC<{
  variable: VariableType
  onChangeVariable: VariableChangeHandler
}> = ({ variable, onChangeVariable }) => (
  <div key={variable.name}>
    <label>{variable.name}</label>
    <input
      placeholder={variable.defaultValue}
      value={variable.value}
      onChange={(e) => {
        onChangeVariable({
          ...variable,
          value: e.target.value
        })
      }}
    />
  </div>
)

const VariableForm: SFC<VariableContainerChildren> = ({
  variables,
  onChangeVariable
}) => {
  return (
    <>
      {Object.values(variables).map((variable) => {
        return (
          <VariableInput
            key={variable.name}
            variable={variable}
            onChangeVariable={onChangeVariable}
          />
        )
      })}
    </>
  )
}
const Console = (item) => {
  console.log("Console", item)
  return null
}
export const VariableContainer = ({ children }) => {
  return (
    <InternalVariablesContainer>
      {(props) => (
        <>
          <Console variables={props.variables} />
          <VariableForm {...props} />
          <Submitter<VariablesMap> item={props.variables}>
            {(item) => {
              const variablesKeyValue = convertToKeyValue(item)
              return <div>{children(variablesKeyValue)}</div>
            }}
          </Submitter>
        </>
      )}
    </InternalVariablesContainer>
  )
}
