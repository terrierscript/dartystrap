import React, { createContext } from "react"
import { Label, Input } from "reakit"

import { useState } from "react"

export const CompilerModeContext = createContext({ useWorker: true })

export const CompileModeCheckbox = () => {
  const [useWorker, handleUseWorker] = useState(true)
  return (
    <CompilerModeContext.Provider value={{ useWorker, handleUseWorker }}>
      <Label>
        <Input type="checkbox" onChange={handleUseWorker} checked={useWorker} />
        <span>Enable Web Worker</span>
      </Label>
    </CompilerModeContext.Provider>
  )
}
