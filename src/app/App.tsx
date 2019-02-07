import React from "react"
import { BootstrapCompiler } from "./compiler/BootstrapCompiler"
import { Layout } from "./main/Layout"
import { Base } from "reakit"
import { VariablesState } from "./variables/VariablesState"
import { CompileModeCheckboxState } from "./compiler/CompileModeCheckbox"

const States = ({ children }) => {
  return (
    <VariablesState>
      <CompileModeCheckboxState>
        <BootstrapCompiler>{children}</BootstrapCompiler>
      </CompileModeCheckboxState>
    </VariablesState>
  )
}
export const MyApp = () => {
  return (
    <Base>
      <States>
        <Layout />
      </States>
    </Base>
  )
}
