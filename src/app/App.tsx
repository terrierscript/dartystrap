import { BootstrapCompiler } from "./BootstrapCompiler";

import React, from "react"
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
  state = { variables: {} }
  handleChangeVaribles = (v: VariablesMap) => {
    const variables = convertToKeyValue(v)
    this.setState({ variables })
  }
  render() {
    return (
      <>
        <VariableContainer>
          {(varaibles) => (
            <BootstrapCompiler variables={{}}>
              {(defaultBootstrap) => (
                <BootstrapCompiler variables={this.state.variables}>
                  {(customizedBootstrap) => (
                    <>
                      <Examples baseCss={customizedBootstrap} />}
                      <Examples baseCss={defaultBootstrap} />
                      <Result>{customizedBootstrap}</Result>
                    </>
                  )}
                </BootstrapCompiler>
              )}
            </BootstrapCompiler>
          )}
        </VariableContainer>
      </>
    )
  }
}export export 
