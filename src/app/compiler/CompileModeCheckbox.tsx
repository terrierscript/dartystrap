import React, {
  createContext,
  useCallback,
  useMemo,
  Children,
  useContext
} from "react"
import { Label, Input } from "reakit"

import { useState } from "react"

enum CompilerMode {
  WORKER = "WORKER",
  ASYNC = "ASYNC"
}
export const CompilerModeContext = createContext({
  isWorker: true,
  handleUseWorker: (e) => {}
})

export const CompileModeCheckboxState = ({ children }) => {
  const [compilerMode, setCompilerMode] = useState(CompilerMode.WORKER)
  const handleUseWorker = useCallback(
    (e) => {
      const mode = e.target.checked ? CompilerMode.WORKER : CompilerMode.ASYNC
      setCompilerMode(mode)
    },
    [setCompilerMode]
  )
  const isWorker = useMemo(() => {
    return compilerMode === CompilerMode.WORKER
  }, [compilerMode])
  const value = {
    isWorker,
    handleUseWorker
  }
  return (
    <CompilerModeContext.Provider value={value}>
      {children}
    </CompilerModeContext.Provider>
  )
}

export const CompileModeCheckbox = () => {
  const { isWorker, handleUseWorker } = useContext(CompilerModeContext)
  return (
    <Label>
      <Input type="checkbox" onChange={handleUseWorker} checked={isWorker} />
      <span>Enable Web Worker</span>
    </Label>
  )
}
