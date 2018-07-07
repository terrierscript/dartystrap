import React, { SFC, ReactNode } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerChildrenProps
} from "app/BootstrapCompiler"
import { Component } from "react"
import {
  VariableContainer,
  VariableContainerChildProps
} from "app/variables/Variables"
import { Examples } from "app/examples/Examples"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

const Container: SFC<{
  children: (
    props: VariableContainerChildProps & BootstrapCompilerChildrenProps
  ) => ReactNode
}> = ({ children }) => (
  <VariableContainer>
    {(variableProps) => (
      <BootstrapCompiler variablesKeyValue={variableProps.variables}>
        {(bsProps) => children({ ...variableProps, ...bsProps })}
      </BootstrapCompiler>
    )}
  </VariableContainer>
)

export class MyApp extends Component {
  render() {
    return (
      <div>
        <Container>
          {({ css, isCompiling }) => (
            <div>
              <div>{isCompiling ? "now Compile" : "compile Finished"}</div>
              <div>
                <Examples baseCss={css} />
              </div>
              <div>
                <Result>{css}</Result>
              </div>
            </div>
          )}
        </Container>
      </div>
    )
  }
}
