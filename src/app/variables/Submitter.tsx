import * as React from "react"
import { Component, ReactNode } from "react"

type Props<T> = { item: T; children: (item: T) => ReactNode }
type State<T> = { item: T }
export class Submitter<T> extends Component<Props<T>, State<T>> {
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
      <div>
        <button onClick={this.handleClick}>Generate</button>
        {this.props.children(this.state.item)}
      </div>
    )
  }
}
