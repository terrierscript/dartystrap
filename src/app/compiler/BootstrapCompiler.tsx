import React from "react"
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
  useWorker: boolean
}
export type BootstrapCompilerChildrenProps = State

export class BootstrapCompiler extends PureComponent<Props, State> {
  state = { css: "", isCompiling: false, useWorker: false }
  // componentDidMount() {
  //   this.buildBootstrap()
  // }
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
      const compilerFn = this.state.useWorker
        ? compileWithWorker
        : compileWithDynamicImport
      compilerFn(variablesKeyValue).then((css) => {
        this.setState({ css, isCompiling: false })
      })
    })
  }
  handleUseWorker = (e) => {
    this.setState({
      useWorker: e.target.checked
    })
  }
  render() {
    const { useWorker } = this.state
    return (
      <div>
        <label>
          <input
            type="checkbox"
            onChange={this.handleUseWorker}
            checked={useWorker}
          />Use WebWorker
        </label>
        {this.props.children(this.state)}
      </div>
    )
  }
}
