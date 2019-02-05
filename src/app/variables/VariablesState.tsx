import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "../../compiler/scssVariables"
import { useState, SFC, useCallback } from "react"
import { fields } from "./init"
export type VariableChangeHandler = (value: VariableType) => any

export type State = { variables: VariablesMap }

export const initial: VariablesMap = convertToMapFromArray(fields)

type UseVariableState = [VariablesMap, VariableChangeHandler]

const useVariableState = (): UseVariableState => {
  const [variables, setVariables] = useState(initial)
  const onChangeVariable = useCallback(
    (newVariableType: VariableType) => {
      const { name } = newVariableType
      const newVariables = {
        ...variables,
        [name]: newVariableType
      }
      setVariables(newVariables)
    },
    [variables]
  )
  return [variables, onChangeVariable]
}
export const VariableContext = React.createContext<UseVariableState>([
  {},
  (value: VariableType) => {}
])

export const VariablesState: SFC<{}> = ({ children }) => {
  const context = useVariableState()
  return (
    <VariableContext.Provider value={context}>
      {children}
    </VariableContext.Provider>
  )
}
