import * as React from "react"
import { SFC } from "react"
import { Component, ReactNode } from "react"
import { VariableType, VariablesMap, convertToMap } from "./scssVariables"

type VariableChangeHandler = (value: VariableType) => any
type VariableContainerChildren = {
  variables: VariablesMap
  onChangeVariable: VariableChangeHandler
}

type Props = {
  children: (value: VariableContainerChildren) => ReactNode
}
type State = { variables: VariablesMap }

const initial: VariablesMap = convertToMap({
  blue: "#007bff"
})

class InternalVariablesContainer extends Component<Props, State> {
  state = { variables: initial }
  handleChange = (newVariableType: VariableType) => {
    const { name } = newVariableType
    this.setState({
      variables: {
        ...this.state.variables,
        [name]: newVariableType
      }
    })
  }
  render() {
    return this.props.children({
      variables: this.state.variables,
      onChangeVariable: this.handleChange
    })
  }
}

class Submitter<T> extends Component<
  { item: T; children: (item: T) => ReactNode },
  { item: T }
> {
  constructor(props) {
    super(props)
    this.state = { item: this.props.item }
  }
  handleClick = () => {
    this.setState({ item: this.props.item })
  }
  // update only state update
  shouldComponentUpdate(nextState) {
    const stateUpdated = this.state !== nextState
    console.log("stateUpdated", stateUpdated)
    return stateUpdated
  }
  render() {
    return (
      <>
        <button onClick={this.handleClick}>Update</button>
        {this.props.children(this.state.item)}
      </>
    )
  }
}

const VariableInput: SFC<{
  variable: VariableType
  onChangeVariable: VariableChangeHandler
}> = ({ variable, onChangeVariable }) => (
  <div key={variable.name}>
    <label>${variable.name}</label>
    <input
      value={variable.value}
      onChange={(e) => {
        onChangeVariable({
          ...variable,
          value: e.target.value
        })
      }}
    />
  </div>
)

const VariableForm: SFC<VariableContainerChildren> = ({
  variables,
  onChangeVariable
}) => {
  return (
    <>
      {Object.values(variables).map((variable) => {
        return (
          <VariableInput
            key={variable.name}
            variable={variable}
            onChangeVariable={onChangeVariable}
          />
        )
      })}
    </>
  )
}
const Console = (item) => {
  console.log(item)
  return null
}
export const VariableContainer = ({ children }) => {
  return (
    <InternalVariablesContainer>
      {(props) => (
        <>
          <Console variables={props.variables} />
          <VariableForm {...props} />
          <Submitter<VariablesMap> item={props.variables}>
            {({ variables }) => {
              return <div>{children(variables)}</div>
            }}
          </Submitter>
        </>
      )}
    </InternalVariablesContainer>
  )
}
