import * as React from "react"

import {
  VariableType,
  VariablesMap,
  convertToMapFromArray
} from "app/scssVariables"
import { ReactNode } from "react"
import { fields } from "./init"
import { VariableForm } from "./VariableForm"
import { FlexRow } from "../layout/index"
import { Grid } from "reakit"
export type VariableChangeHandler = (value: VariableType) => any
export type VariableContainerChildren = {
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}

export type Props = {
  children: (value: VariableContainerChildren) => ReactNode
}
export type State = { variables: VariablesMap }

export const initial: VariablesMap = convertToMapFromArray(fields)

export class VariablesState extends React.Component<Props, State> {
  state = { variables: initial }
  handleChange = (newVariableType: VariableType) => {
    const { name } = newVariableType
    const newState = {
      variables: { ...this.state.variables, [name]: newVariableType }
    }
    this.setState(newState)
  }
  render() {
    const props = {
      variables: this.state.variables,
      onChangeVariable: this.handleChange
    }
    return (
      <FlexRow>
        <Grid columns="1fr 2fr">
          <Grid.Item>
            <VariableForm key="form" {...props} />
          </Grid.Item>
          <Grid.Item>{this.props.children(props)}</Grid.Item>
        </Grid>
      </FlexRow>
    )
  }
}
