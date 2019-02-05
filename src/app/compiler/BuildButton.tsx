import { BootstrapCompilerContext } from "./BootstrapCompiler"
import React from "react"
import { useContext, useEffect, useCallback } from "react"
import { Button } from "reakit"
import { VariableContext } from "../variables/VariablesState"

export const BuildButton = () => {
  const [variables] = useContext(VariableContext)
  const { doCompile } = useContext(BootstrapCompilerContext)
  const compile = useCallback(() => {
    doCompile(variables)
  }, [variables, doCompile])
  useEffect(() => {
    compile()
  }, [])
  return (
    <div>
      <Button
        data-test-id="generate-button"
        onClick={() => {
          compile()
        }}
      >
        Generate
      </Button>
    </div>
  )
}
