import React from "react"
import { ReactNode, PureComponent } from "react"
import { VariablesMap, convertToKeyValue } from "../scssVariables"
import {
  compileWithWorker,
  // compile,
  compileWithDynamicImport
} from "./compiler"
import { Label, Input } from "reakit"

type Props = {
  submitVariables: VariablesMap
  children: (props: State) => ReactNode
}
export enum CompilerStatus {
  INIT = "init",
  PROGRESS = "progress",
  SUCCESS = "success",
  ERROR = "error"
}
type State = {
  css: string
  // isCompiling: boolean
  useWorker: boolean
  status: CompilerStatus
  lastError: any
}

export type BootstrapCompilerChildrenProps = State

export class BootstrapCompiler extends PureComponent<Props, State> {
  state = {
    css: "",
    status: CompilerStatus.INIT,
    useWorker: true,
    lastError: undefined
  }
  componentDidUpdate(prevProps) {
    if (prevProps == this.props) {
      return
    }
    this.buildBootstrap()
  }
  buildBootstrap() {
    this.setState({ status: CompilerStatus.PROGRESS }, () => {
      const { submitVariables } = this.props
      const variablesKeyValue = convertToKeyValue(submitVariables)
      const compiler = this.state.useWorker
        ? compileWithWorker
        : compileWithDynamicImport
      const { execute, terminate } = compiler(variablesKeyValue)
      execute
        .then((css) => {
          this.setState({ css, status: CompilerStatus.SUCCESS })
        })
        .catch((e) => {
          this.setState({
            status: CompilerStatus.ERROR,
            lastError: e
          })
        })
    })
  }
  handleUseWorker = (e) => {
    this.setState({ useWorker: e.target.checked })
  }
  render() {
    const { useWorker } = this.state
    return (
      <div>
        <Label>
          <Input
            type="checkbox"
            onChange={this.handleUseWorker}
            checked={useWorker}
          />
          <span>Enable Web Worker</span>
        </Label>
        {this.props.children(this.state)}
      </div>
    )
  }
}
