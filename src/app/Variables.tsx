import * as React from "react"
import { SFC } from "react"
import { Component, ReactNode } from "react"

type VariableType = {
  name: string
  defaultValue: string
  value: string
}

export type VariablesMap = { [key: string]: VariableType }
type VariableChangeHandler = (e: any, value: VariableType) => any
type VariableContainerChildren = {
  variables?: VariablesMap
  onChange?: VariableChangeHandler
}
type Props = {
  onChangeVariables: (value: VariablesMap) => any
  children: (value: VariableContainerChildren) => ReactNode
}
type State = { variables: VariablesMap }

const initial: VariablesMap = Object.entries({
  blue: "#007bff"
}).reduce((curr, [name, defaultValue]) => {
  return {
    ...curr,
    [name]: {
      name,
      defaultValue,
      value: ""
    }
  }
}, {})

class VariablesContainer extends Component<Props, State> {
  state = { variables: initial }
  handleChange = (e, v: VariableType) => {
    const { name } = v
    const newVariables: VariablesMap = {
      ...this.state.variables,
      [name]: {
        ...this.state.variables[name],
        value: e.target.value
      }
    }
    this.setState(
      {
        variables: newVariables
      },
      () => {
        this.props.onChangeVariables(this.state.variables)
      }
    )
  }
  render() {
    return (
      <>
        {this.props.children({
          variables: this.state.variables,
          onChange: this.handleChange
        })}
      </>
    )
  }
}

const VariableForm: SFC<VariableContainerChildren> = ({
  variables,
  onChange
}) => {
  return (
    <>
      {Object.values(variables).map(vars => {
        return (
          <div key={vars.name}>
            <label>${vars.name}</label>
            <input value={vars.value} onChange={e => onChange(e, vars)} />
          </div>
        )
      })}
    </>
  )
}

export const Variables = ({ onChangeVariables }) => {
  return (
    <VariablesContainer onChangeVariables={onChangeVariables}>
      {params => {
        return (
          <div>
            <VariableForm {...params} />
          </div>
        )
      }}
    </VariablesContainer>
  )
}
