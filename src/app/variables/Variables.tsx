import * as React from "react"

import { VariablesState, VariableContainerChildren } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap } from "app/scssVariables"

import { Submitter } from "./Submitter"
// import { VariableForm } from "./VariableForm"

export type VariableContainerChildProps = {
  submitVariables: VariablesMap
  // Form: SFC
  Button: SFC
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
            {({ Button, item }) => {
              return (
                <div>
                  {children({
                    submitVariables: item,
                    Button
                  })}
                </div>
              )
            }}
          </Submitter>
        )
      }}
    </VariablesState>
  )
}
