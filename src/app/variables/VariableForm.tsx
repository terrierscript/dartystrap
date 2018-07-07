import { VariableInput } from "./VariableInput"

import React from "react"
import { VariableContainerChildren } from "./VariablesState"

export class VariableForm extends React.Component<VariableContainerChildren> {
  render() {
    const { variables, onChangeVariable } = this.props
    return Object.values(variables).map((variable) => {
      return (
        <VariableInput
          key={variable.name}
          variable={variable}
          onChangeVariable={onChangeVariable}
        />
      )
    })
  }
}
