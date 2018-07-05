import { ReactNode, PureComponent } from "react"
import { Component } from "react"
// import { build } from "../lib/bootstrap"
import { KeyValue } from "./scssVariables"

type Props = {
  variablesKeyValue: KeyValue
  children: (props: State) => ReactNode
}
type State = {
  css: string
  isCompiling: boolean
}
export class BootstrapCompiler extends PureComponent<Props, State> {
  state = {
    css: "",
    isCompiling: false
  }
  worker = new Worker("../worker/build.worker.js")
  componentDidMount() {
    this.buildBootstrap()
    this.worker.addEventListener("message", (e) => {
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
      const { variablesKeyValue } = this.props
      this.worker.postMessage(variablesKeyValue)
      // build(variablesKeyValue).then((css) => {
      //   this.setState({ css, isCompiling: false })
      // })
    })
  }
  render() {
    return this.props.children(this.state)
  }
}
