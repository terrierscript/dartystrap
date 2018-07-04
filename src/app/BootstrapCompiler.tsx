import { ReactNode } from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap"
import { KeyValue } from "./scssVariables"

type Props = {
  variables: KeyValue
  children: (css: string) => ReactNode
}
type State = {
  css: string
  isCompiling: boolean
}
export class BootstrapCompiler extends Component<Props, State> {
  state = {
    css: "",
    isCompiling: false
  }
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      console.log("not update")
      return
    }
  }
  build() {
    const { variables } = this.props
    build(variables).then((css) => {
      this.setState({ css })
    })
  }
  render() {
    const { css } = this.state
    return this.props.children(css)
  }
}
