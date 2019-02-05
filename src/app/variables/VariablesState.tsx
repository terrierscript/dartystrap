import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "../../compiler/scssVariables"
import { SFC, useReducer } from "react"
import { fields } from "./init"
export type VariableChangeHandler = (value: VariableType) => any

export const initial: VariablesMap = convertToMapFromArray(fields)

const variableReducer = (state, action: VariableType) => {
  return {
    ...state,
    [action.name]: action
  }
}
const useVariableState = () => {
  const [variables, onChangeVariable] = useReducer(variableReducer, initial)
  return { variables, onChangeVariable }
}
export const VariableContext = React.createContext<{
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}>({
  variables: {},
  onChangeVariable: (...args) => {}
})

export const VariablesState: SFC<{}> = ({ children }) => {
  const context = useVariableState()
  return (
    <VariableContext.Provider value={context}>
      {children}
    </VariableContext.Provider>
  )
}
