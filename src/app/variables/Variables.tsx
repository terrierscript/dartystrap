import * as React from "react"

import { VariablesState, VariableContextConsumer } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "../../compiler/scssVariables"

import { Button, Grid, Base } from "reakit"
import { VariableForm } from "./VariableForm"
import { BootstrapCompilerContext } from "../compiler/BootstrapCompiler"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
}

const BuildConsumer = ({ children }) => {
  return (
    <VariableContextConsumer>
      {([variables]) => (
        <BootstrapCompilerContext.Consumer>
          {({ doCompile }) => children({ variables, doCompile })}
        </BootstrapCompilerContext.Consumer>
      )}
    </VariableContextConsumer>
  )
}
export const Variables: SFC<{
  children: (props: VariableContainerChildProps) => ReactNode
}> = ({ children }) => {
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
                    <Button data-test-id="generate-button" onClick={doCompile}>
                      Generate
                    </Button>
                    <div>{children({ submitVariables: variables })}</div>
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
