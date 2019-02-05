import React from "react"
import { SFC } from "react"
import { Base, Grid } from "reakit"
import { VariableForm } from "../variables/VariableForm"
import { BuildButton } from "../compiler/BuildButton"
import { Status } from "./Status"
import { CompileModeCheckbox } from "../compiler/CompileModeCheckbox"

export const Layout: SFC<{}> = () => {
  return (
    <Base>
      <Grid columns="1fr 2fr">
        <Grid.Item>
          <VariableForm key="form" />
        </Grid.Item>
        <Grid.Item>
          <BuildButton />
          <CompileModeCheckbox />
          <Status />
        </Grid.Item>
      </Grid>
    </Base>
  )
}
