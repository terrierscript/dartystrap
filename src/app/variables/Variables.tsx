import * as React from "react"

import { VariablesState, VariableContainerChildren } from "./VariablesState"

import { SFC } from "react"
import { ReactNode } from "react"
import { VariablesMap, convertToKeyValue, KeyValue } from "app/scssVariables"

import { Submitter } from "./Submitter"
import { VariableForm } from "./VariableForm"

export type VariableContainerChildProps = {
  variables: KeyValue
  Form: SFC
  Button: SFC
}

export const Variables: SFC<{
  children: (props: VariableContainerChildProps) => ReactNode
}> = ({ children }) => {
  return (
    <VariablesState>
      {(props: VariableContainerChildren) => {
        const Form: SFC = () => <VariableForm key="form" {...props} />
        // const item = props.variables
        // const variablesKeyValue = convertToKeyValue(item)

        return (
          <div>
            <Submitter<VariablesMap> item={props.variables}>
              {({ Button, item }) => {
                const variablesKeyValue = convertToKeyValue(item)
                return (
                  <div>
                    {children({
                      variables: variablesKeyValue,
                      Form,
                      Button
                    })}
                  </div>
                )
              }}
            </Submitter>
          </div>
        )
      }}
    </VariablesState>
  )
}
