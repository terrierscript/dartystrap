import { VariableInput } from "./VariableInput"

import React, { SFC } from "react"
import { VariableContextConsumer } from "./VariablesState"
import { Grid } from "reakit"

export const VariableForm: SFC<{}> = () => {
  // const { variables, onChangeVariable } = props
  return (
    <VariableContextConsumer>
      {([variables, onChangeVariable]) => {
        return (
          <Grid columns="repeat(1, 1fr)" autoRows="auto">
            {Object.values(variables).map((variable) => {
              return (
                <div key={variable.name}>
                  <VariableInput
                    variable={variable}
                    onChangeVariable={onChangeVariable}
                  />
                </div>
              )
            })}
          </Grid>
        )
      }}
    </VariableContextConsumer>
  )
}
