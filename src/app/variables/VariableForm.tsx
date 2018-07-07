import { VariableInput } from "./VariableInput"

import React, { SFC } from "react"
import { VariableType } from "../scssVariables"
import { VariableChangeHandler, VariableContainerChildren } from "./Variables"
import styled, { css } from "react-emotion"

export const getType = (value) => {
  if (value === "true" || value === "false") {
    return "checkbox"
  }
  return value.indexOf("#") === 0 ? "color" : "input"
}

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
