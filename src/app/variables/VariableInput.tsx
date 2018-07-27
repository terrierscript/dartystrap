import * as React from "react"
import { SFC } from "react"
import { VariableType } from "../../compiler/scssVariables"
import styled from "react-emotion"
import { VariableChangeHandler } from "./VariablesState"
import { Input, Label, InlineBlock } from "reakit"

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
  let value = variable.value
  if (type === "color" && !value) {
    value = variable.defaultValue
  }

  const inputProps: any = {
    type,
    value,
    placeholder: variable.defaultValue,
    checked: value
  }
  return (
    <label>
      <InlineBlock width="50%">{variable.name}</InlineBlock>
      <InlineBlock width="100px">
        <Input
          {...inputProps}
          data-test-id={`input-form-${variable.name}`}
          onChange={(e) => {
            const newValue =
              type === "checkbox" ? e.target.checked : e.target.value
            onChangeVariable({ ...variable, value: newValue.toString() })
          }}
        />
      </InlineBlock>
    </label>
  )
}
