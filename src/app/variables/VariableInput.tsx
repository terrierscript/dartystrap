import * as React from "react"
import { SFC } from "react"
import { VariableType } from "../scssVariables"
import styled from "react-emotion"
import { VariableChangeHandler } from "./VariablesState"

export const getType = (value) => {
  if (value === "true" || value === "false") {
    return "checkbox"
  }
  return value.indexOf("#") === 0 ? "color" : "text"
}

const Row = styled("div")`
  width: 200px;
`
export const VariableInput: SFC<{
  variable: VariableType
  onChangeVariable: VariableChangeHandler
}> = ({ variable, onChangeVariable }) => {
  const type = getType(variable.defaultValue)
  const value =
    // variable.value === undefined ? variable.value : variable.defaultValue
    variable.value
  console.log(variable.name, value)

  const inputProps: any = {
    type,
    value
    // placeholder: variable.defaultValue
    // checked: value
  }
  console.log(inputProps.value)
  return (
    <Row>
      <label>
        {variable.name}
        <input
          {...inputProps}
          onChange={(e) => {
            const newValue =
              type === "checkbox" ? e.target.checked : e.target.value
            console.log("newValue", newValue)
            onChangeVariable({ ...variable, value: newValue.toString() })
          }}
        />
      </label>
    </Row>
  )
}
