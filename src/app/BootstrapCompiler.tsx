import { ReactNode, PureComponent } from "react"
import { Component } from "react"
import { build } from "../lib/bootstrap"
import { KeyValue } from "./scssVariables"

type Props = {
  variablesKeyValue: KeyValue
  children: (props: BootstrapCompilerChildrenProps) => ReactNode
}
type State = {
  css: string
  isCompiling: boolean
}
export type BootstrapCompilerChildrenProps = State

export class BootstrapCompiler extends PureComponent<Props, State> {
  state = {
    css: "",
    isCompiling: false
  }
  componentDidMount() {
    this.buildBootstrap()
  }
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      return
    }
    this.buildBootstrap()
  }
  buildBootstrap() {
    this.setState({ isCompiling: true }, () => {
      const { variablesKeyValue } = this.props
      build(variablesKeyValue).then((css) => {
        this.setState({ css, isCompiling: false })
      })
    })
  }
  render() {
    return this.props.children(this.state)
  }
}
