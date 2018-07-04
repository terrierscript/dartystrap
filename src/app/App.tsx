import { BootstrapCompiler } from "./BootstrapCompiler"

import React from "react"
import { Component } from "react"
import { VariableContainer } from "./Variables"
import {
  VariablesMap,
  convertToMap,
  convertToKeyValue,
  KeyValue
} from "./scssVariables"

import { Examples } from "./Examples"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

type AppState = {
  variables: KeyValue
}

export class App extends Component<{}, AppState> {
  render() {
    return (
      <>
        <VariableContainer>
          {(variables) => (
            <BootstrapCompiler variablesKeyValue={variables}>
              {({ css, isCompiling }) => (
                <>
                  <div>{isCompiling ? "now Compile" : "compile Finished"}</div>
                  <Examples baseCss={css} />
                  <Result>{css}</Result>
                </>
              )}
            </BootstrapCompiler>
          )}
        </VariableContainer>
      </>
    )
  }
}
