import { ReactNode, PureComponent } from "react"
import { Component } from "react"
// import { build } from "../lib/bootstrap"
import { KeyValue, VariablesMap, convertToKeyValue } from "./scssVariables"

type Props = {
  submitVariables: VariablesMap
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
  worker = new Worker("../worker/build.worker.js")
  componentDidMount() {
    this.buildBootstrap()
    this.worker.addEventListener("message", (e) => {
      // console.log(e)
      this.setState({ css: e.data, isCompiling: false })
    })
  }
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      return
    }
    this.buildBootstrap()
  }
  buildBootstrap() {
    this.setState({ isCompiling: true }, () => {
      const { submitVariables } = this.props
      const variablesKeyValue = convertToKeyValue(submitVariables)

      this.worker.postMessage(variablesKeyValue)
    })
  }
  render() {
    return this.props.children(this.state)
  }
}
