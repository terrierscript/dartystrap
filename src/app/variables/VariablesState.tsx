import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "../../compiler/scssVariables"
import { useState, SFC, useCallback, useReducer } from "react"
import { fields } from "./init"
export type VariableChangeHandler = (value: VariableType) => any

export type State = { variables: VariablesMap }

export const initial: VariablesMap = convertToMapFromArray(fields)

type UseVariableState = [VariablesMap, VariableChangeHandler]

const variableReducer = (state, action: VariableType) => {
  return {
    ...state,
    [action.name]: action
  }
}
const useVariableState = (): UseVariableState => {
  const [variables, onChangeVariable] = useReducer(variableReducer, initial)
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
