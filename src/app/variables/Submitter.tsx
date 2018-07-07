import * as React from "react"
import { Component, ReactNode, SFC } from "react"

export class Submitter<T> extends Component<
  { item: T; children: (props: { item: T | {}; Button: SFC }) => ReactNode },
  { item: T | {} }
> {
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
    const Button = () => <button onClick={this.handleClick}>Generate</button>

    return this.props.children({ item: this.state.item, Button })
  }
}
