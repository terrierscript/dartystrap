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
  noopMode: boolean
}

export class Submitter<T> extends Component<Props<T>, State<T>> {
  constructor(props) {
    super(props)
    // TODO
    this.state = { item: {}, noopMode: false } // = { item: this.props.item }
  }
  handleClick = () => {
    this.setState({ item: this.props.item })
  }
  // update only state update
  shouldComponentUpdate(_, nextState) {
    if (this.state.noopMode) {
      return true
    }
    const stateUpdated = this.state !== nextState
    return stateUpdated
  }
  render() {
    const item = this.state.noopMode ? this.props.item : this.state.item
    return this.props.children({
      item,
      onSubmit: this.handleClick
    })
  }
}
