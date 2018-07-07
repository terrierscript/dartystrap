import { VariableInput } from "./VariableInput"

import React, { SFC } from "react"
import { VariableContainerChildren } from "./VariablesState"

export const VariableForm: SFC<VariableContainerChildren> = ({
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
