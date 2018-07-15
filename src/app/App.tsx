import React, { SFC, ReactNode } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerChildrenProps
} from "app/compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables, VariableContainerChildProps } from "app/variables/Variables"
import { Examples } from "app/examples/Examples"
import { FlexRow } from "./layout"
import { Result } from "./result/Result"
// import styled from "react-emotion"
import { CompileStatus } from "./compiler/CompileStatus"
import { Flex, Base } from "reakit"
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

export class MyApp extends Component {
  render() {
    return (
      <Base>
        <Container>
          {({ css, status }) => (
            <FlexRow>
              <FlexRow>
                <CompileStatus status={status} />
              </FlexRow>
              <FlexRow>
                <Examples baseCss={css} />
              </FlexRow>
              <FlexRow>
                <Result code={css} />
              </FlexRow>
            </FlexRow>
          )}
        </Container>
      </Base>
    )
  }
}
