import React from "react"
import { useContext } from "react"
import { Label, Input } from "reakit"
import { BootstrapCompilerContext } from "./BootstrapCompiler"

export const CompileModeCheckbox = () => {
  const { useWorker, handleUseWorker } = useContext(BootstrapCompilerContext)
  return (
    <Label>
      <Input type="checkbox" onChange={handleUseWorker} checked={useWorker} />
      <span>Enable Web Worker</span>
    </Label>
  )
}
