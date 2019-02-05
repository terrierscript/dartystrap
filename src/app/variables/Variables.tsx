import * as React from "react"

import { VariablesState, VariableContextConsumer } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "../../compiler/scssVariables"

import { Button, Grid, Base } from "reakit"
import { VariableForm } from "./VariableForm"
import { BootstrapCompilerContextConsumer } from "../compiler/BootstrapCompiler"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
}

const BuildConsumer = ({ children }) => {
  return (
    <VariableContextConsumer>
      {([variables]) => (
        <BootstrapCompilerContextConsumer>
          {({ doCompile }) => children({ variables, doCompile })}
        </BootstrapCompilerContextConsumer>
      )}
    </VariableContextConsumer>
  )
}
export const Variables: SFC<{}> = ({ children }) => {
  return (
    <VariablesState>
      <Base>
        <Grid columns="1fr 2fr">
          <Grid.Item>
            <VariableForm key="form" />
          </Grid.Item>
          <Grid.Item>
            <BuildConsumer>
              {({ variables, doCompile }) => {
                return (
                  <div>
                    <Button
                      data-test-id="generate-button"
                      onClick={() => {
                        doCompile(variables)
                      }}
                    >
                      Generate
                    </Button>
                    <div>{children}</div>
                  </div>
                )
              }}
            </BuildConsumer>
          </Grid.Item>
        </Grid>
      </Base>
    </VariablesState>
  )
}
