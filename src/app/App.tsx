import React, { SFC, ReactNode } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerChildrenProps
} from "app/compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables, VariableContainerChildProps } from "app/variables/Variables"
import { Examples } from "app/examples/Examples"
import { Flexbox } from "./layout"
import { Result } from "./result/Result"
import styled from "react-emotion"

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

const Center = styled(Flexbox)`
  max-width: 800px;
`
export class MyApp extends Component {
  render() {
    return (
      <Center>
        <Container>
          {({ Button, css, isCompiling }) => (
            <Flexbox>
              <Flexbox>
                <Button />
              </Flexbox>
              <Flexbox>
                {isCompiling ? "now Compile" : "compile Finished"}
              </Flexbox>
              <Flexbox>
                <Examples baseCss={css} />
              </Flexbox>
              <Flexbox>
                <Result>{css}</Result>
              </Flexbox>
            </Flexbox>
          )}
        </Container>
      </Center>
    )
  }
}
