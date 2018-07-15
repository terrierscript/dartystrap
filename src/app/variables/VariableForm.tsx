import { VariableInput } from "./VariableInput"

import React from "react"
import { VariableContainerChildren } from "./VariablesState"
import { Grid } from "reakit"

export class VariableForm extends React.Component<VariableContainerChildren> {
  render() {
    const { variables, onChangeVariable } = this.props
    return (
      <Grid columns="repeat(1, 1fr)" autoRows="auto">
        {Object.values(variables).map((variable) => {
          return (
            <Grid.Item key={variable.name}>
              <VariableInput
                variable={variable}
                onChangeVariable={onChangeVariable}
              />
            </Grid.Item>
          )
        })}
      </Grid>
    )
  }
}
