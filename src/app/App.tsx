import React, { SFC } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerContextConsumer
} from "./compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables } from "./variables/Variables"
import { Examples } from "./examples/Examples"
import { Result } from "./result/Result"
import { CompileStatus } from "./compiler/CompileStatus"
import { Base, Block } from "reakit"

const Container: SFC<{}> = ({ children }) => (
  <BootstrapCompiler>
    <Variables>{children}</Variables>
  </BootstrapCompiler>
)

export class MyApp extends Component {
  render() {
    return (
      <Base>
        <Container>
          <BootstrapCompilerContextConsumer>
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
          </BootstrapCompilerContextConsumer>
        </Container>
      </Base>
    )
  }
}
