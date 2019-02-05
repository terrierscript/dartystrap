import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "../../compiler/scssVariables"
import { ReactNode, useState, SFC, useCallback } from "react"
import { fields } from "./init"
// import { VariableForm } from "./VariableForm"
// import { FlexRow } from "../layout/index"
// import { Grid } from "reakit"
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
      console.log(variables, "=>", newVariables)
      setVariables(newVariables)
    },
    [variables]
  )
  return [variables, onChangeVariable]
}
const VariableContext = React.createContext<UseVariableState>([
  {},
  (value: VariableType) => {}
])

export const VariableContextConsumer = VariableContext.Consumer

export const VariablesState: SFC<{}> = ({ children }) => {
  const context = useVariableState()
  return (
    <VariableContext.Provider value={context}>
      {children}
    </VariableContext.Provider>
  )
}
