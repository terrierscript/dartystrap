import { BootstrapCompilerContext } from "./BootstrapCompiler"
import React from "react"
import { useContext, useEffect, useCallback } from "react"
import { Button } from "reakit"
import { VariableContext } from "../variables/VariablesState"

const useCompile = () => {
  const { variables } = useContext(VariableContext)
  const { executeCompile: doCompile } = useContext(BootstrapCompilerContext)

  // compile関数は外出しできる
  const compile = useCallback(() => {
    doCompile(variables)
  }, [variables, doCompile])

  // componentDidMountの代わりとして初回にcompile実行をする
  useEffect(() => {
    compile()
  }, [])
  return compile
}

export const BuildButton = () => {
  const compile = useCompile()
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
