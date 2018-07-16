import * as React from "react"

import { VariablesState, VariableContainerChildren } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "../scssVariables"

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
      {(props: VariableContainerChildren) => {
        return (
          <Base>
            <Grid columns="1fr 2fr">
              <Grid.Item>
                <VariableForm key="form" {...props} />
              </Grid.Item>
              <Grid.Item>
                <Submitter<VariablesMap> item={props.variables}>
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
              </Grid.Item>
            </Grid>
          </Base>
        )
      }}
    </VariablesState>
  )
}
