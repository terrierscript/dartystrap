import React, { SFC } from "react"
import { VariableType } from "../scssVariables"
import { VariableChangeHandler, VariableContainerChildren } from "./Variables"
import styled, { css } from "react-emotion"

const getType = (value) => {
  if (value === "true" || value === "false") {
    return "checkbox"
  }
  return value.indexOf("#") === 0 ? "color" : "input"
}

const Row = styled("div")`
  width: 300px;
`
const VariableInput: SFC<{
  variable: VariableType
  onChangeVariable: VariableChangeHandler
}> = ({ variable, onChangeVariable }) => {
  const type = getType(variable.defaultValue)
  const value = variable.value || variable.defaultValue
  const inputProps = {
    type,
    value,
    placeholder: variable.defaultValue,
    checked: value === "true"
  }
  return (
    <Row>
      <label>
        {variable.name}
        <input
          {...inputProps}
          onChange={(e) => {
            const newValue =
              type === "checkbox" ? e.target.checked : e.target.value
            onChangeVariable({ ...variable, value: newValue.toString() })
          }}
        />
      </label>
    </Row>
  )
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
