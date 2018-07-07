import * as React from "react"
import { SFC } from "react"
import { VariableType } from "../scssVariables"
import { VariableChangeHandler } from "./Variables"
import { getType } from "./VariableForm"

export const VariableInput: SFC<{
  variable: VariableType
  onChangeVariable: VariableChangeHandler
}> = ({ variable, onChangeVariable }) => {
  const type = getType(variable.defaultValue)
  const value = variable.value === undefined || variable.defaultValue
  const inputProps = {
    type,
    value,
    placeholder: variable.defaultValue,
    checked: value === "true"
  }
  return (
    <div>
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
    </div>
  )
}
