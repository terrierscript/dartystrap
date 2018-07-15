import * as React from "react"

import { VariablesState, VariableContainerChildren } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "app/scssVariables"

import { Submitter } from "./Submitter"
import { Button } from "reakit"

// import { VariableForm } from "./VariableForm"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
}

export const Variables: SFC<{
  children: (props: VariableContainerChildProps) => ReactNode
}> = ({ children }) => {
  return (
    <VariablesState>
      {(props: VariableContainerChildren) => {
        // const Form: SFC = () => <VariableForm key="form" {...props} />

        return (
          <Submitter<VariablesMap> item={props.variables}>
            {({ onSubmit, item }) => {
              return (
                <div>
                  <Button onClick={onSubmit}>Generate</Button>
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
