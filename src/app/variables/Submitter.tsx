import * as React from "react"
import { Component, ReactNode, SFC } from "react"
import { Button } from "reakit"
type ChildProps<T> = {
  item: T | {}
  onSubmit: () => void
}

type Props<T> = { item: T; children: (props: ChildProps<T>) => ReactNode }
type State<T> = {
  item: T | {}
}

export class Submitter<T> extends Component<Props<T>, State<T>> {
  constructor(props) {
    super(props)
    // TODO
    this.state = { item: {} } // = { item: this.props.item }
  }
  handleClick = () => {
    this.setState({ item: this.props.item })
  }
  // update only state update
  shouldComponentUpdate(_, nextState) {
    const stateUpdated = this.state !== nextState
    return stateUpdated
  }
  render() {
    return this.props.children({
      item: this.state.item,
      onSubmit: this.handleClick
    })
  }
}
