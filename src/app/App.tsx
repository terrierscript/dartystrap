import React from "react"
import { BootstrapCompiler } from "app/BootstrapCompiler"
import { Component } from "react"
import { VariableContainer } from "app/variables/Variables"
import { Examples } from "app/examples/Examples"

const Result = ({ children }) => {
  return (
    <pre>
      <code>{children}</code>
    </pre>
  )
}

const Container = (children) => (
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
    )
  }
}
