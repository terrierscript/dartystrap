import { ReactNode, PureComponent } from "react"
import { VariablesMap, convertToKeyValue } from "../scssVariables"
import {
  compileWithWorker,
  compile,
  compileWithDynamicImport
} from "./compiler"

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
  state = { css: "", isCompiling: false }
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
      const { submitVariables } = this.props
      const variablesKeyValue = convertToKeyValue(submitVariables)
      compileWithDynamicImport(variablesKeyValue).then((css) => {
        this.setState({ css, isCompiling: false })
      })
    })
  }
  render() {
    return this.props.children(this.state)
  }
}
