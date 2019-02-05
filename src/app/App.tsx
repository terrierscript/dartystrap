import React, { SFC } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerContext
} from "./compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables } from "./variables/Variables"
import { Examples } from "./examples/Examples"
import { Result } from "./result/Result"
import { CompileStatus } from "./compiler/CompileStatus"
import { Base, Block } from "reakit"
import styled from "styled-components"
const Container: SFC<{}> = ({ children }) => (
  <Variables>
    {(variableProps) => (
      <BootstrapCompiler submitVariables={variableProps.submitVariables}>
        {children}
      </BootstrapCompiler>
    )}
  </Variables>
)

export class MyApp extends Component {
  render() {
    return (
      <Base>
        <Container>
          <BootstrapCompilerContext.Consumer>
            {({ css, status }) => (
              <Block>
                <Block>
                  <CompileStatus status={status} />
                </Block>
                <Block>
                  <Examples baseCss={css} />
                </Block>
                <Block>
                  <Result code={css} />
                </Block>
              </Block>
            )}
          </BootstrapCompilerContext.Consumer>
        </Container>
      </Base>
    )
  }
}
