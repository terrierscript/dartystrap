import { BootstrapCompilerContext } from "../compiler/BootstrapCompiler"
import * as React from "react"
import { SFC, useContext, useEffect, useCallback } from "react"
import { Base, Button, Grid } from "reakit"
import { VariablesMap } from "../../compiler/scssVariables"
import { VariableForm } from "./VariableForm"
import { VariableContext, VariablesState } from "./VariablesState"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
}

const BuildConsumer = ({ children }) => {
  const [variables] = useContext(VariableContext)
  const { doCompile } = useContext(BootstrapCompilerContext)
  const compile = useCallback(() => {
    doCompile(variables)
  }, [variables, doCompile])
  useEffect(() => {
    compile()
  }, [])
  return <div>{children({ compile })}</div>
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
              {({ compile }) => {
                return (
                  <div>
                    <Button
                      data-test-id="generate-button"
                      onClick={() => {
                        compile()
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
