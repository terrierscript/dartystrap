import * as React from "react"

import { VariablesState, VariableContainerChildren } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "app/scssVariables"

import { Submitter } from "./Submitter"
import { Button } from "reakit"

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
          <Submitter<VariablesMap> item={props.variables}>
            {({ onSubmit, item }) => {
              return (
                <div>
                  <Button data-test-id="generate-button" onClick={onSubmit}>
                    Generate
                  </Button>
                  <div>
                    {children({
                      submitVariables: item
                    })}
                  </div>
                </div>
              )
            }}
          </Submitter>
        )
      }}
    </VariablesState>
  )
}
