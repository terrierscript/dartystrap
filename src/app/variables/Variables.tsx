import * as React from "react"

import { VariablesState, VariableContextConsumer } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "../../compiler/scssVariables"

import { Submitter } from "./Submitter"
import { Button, Grid, Base } from "reakit"
import { VariableForm } from "./VariableForm"
// import { FlexRow } from "../layout/index"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
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
            <VariableContextConsumer>
              {([variables]) => {
                return (
                  <Submitter<VariablesMap> item={variables}>
                    {({ onSubmit, item }) => {
                      return (
                        <div>
                          <Button
                            data-test-id="generate-button"
                            onClick={onSubmit}
                          >
                            Generate
                          </Button>
                          <div>{children({ submitVariables: item })}</div>
                        </div>
                      )
                    }}
                  </Submitter>
                )
              }}
            </VariableContextConsumer>
          </Grid.Item>
        </Grid>
      </Base>
    </VariablesState>
  )
}
