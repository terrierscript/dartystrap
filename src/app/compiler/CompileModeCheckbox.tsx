import React, { createContext, useCallback } from "react"
import { Label, Input } from "reakit"

import { useState } from "react"

enum CompilerMode {
  WORKER = "WORKER",
  ASYNC = "ASYNC"
}
export const CompilerModeContext = createContext(true)

export const CompileModeCheckbox = () => {
  const [compilerMode, setCompilerMode] = useState(CompilerMode.WORKER)
  const handleUseWorker = useCallback(
    (e) => {
      const mode = e.value.checked ? CompilerMode.WORKER : CompilerMode.ASYNC
      setCompilerMode(mode)
    },
    [setCompilerMode]
  )
  const isWorker = compilerMode === CompilerMode.WORKER

  return (
    <CompilerModeContext.Provider value={isWorker}>
      <Label>
        <Input type="checkbox" onChange={handleUseWorker} checked={isWorker} />
        <span>Enable Web Worker</span>
      </Label>
    </CompilerModeContext.Provider>
  )
}
