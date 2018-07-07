import * as React from "react"
import { Component, ReactNode } from "react"

export class Submitter<T> extends Component<
  { item: T; children: (item: T) => ReactNode },
  { item: T }
> {
  constructor(props) {
    super(props)
    this.state // = { item: this.props.item }
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
    return (
      <>
        <button onClick={this.handleClick}>Generate</button>
        {this.props.children(this.state.item)}
      </>
    )
  }
}
