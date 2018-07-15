import React, { SFC, ReactNode } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerChildrenProps
} from "app/compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables, VariableContainerChildProps } from "app/variables/Variables"
import { Examples } from "app/examples/Examples"
import { Result } from "./result/Result"
import { CompileStatus } from "./compiler/CompileStatus"
import { Flex, Base, Block } from "reakit"
import styled from "styled-components"
const Container: SFC<{
  children: (
    props: VariableContainerChildProps & BootstrapCompilerChildrenProps
  ) => ReactNode
}> = ({ children }) => (
  <Variables>
    {(variableProps) => (
      <BootstrapCompiler submitVariables={variableProps.submitVariables}>
        {(bsProps) => children({ ...variableProps, ...bsProps })}
      </BootstrapCompiler>
    )}
  </Variables>
)

const AppSytle = styled(Base)`
  font-family: "Source Sans Pro", sans-serif;
  -webkit-font-smoothing: antialiased;
`

export class MyApp extends Component {
  render() {
    return (
      <AppSytle>
        <Container>
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
        </Container>
      </AppSytle>
    )
  }
}
