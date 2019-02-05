import React, { createContext } from "react"
import { PureComponent } from "react"
import { VariablesMap } from "../../compiler/scssVariables"
import { compileWithWorker, compileWithDynamicImport } from "../../compiler/"
import { Label, Input } from "reakit"

type Props = {
  submitVariables: VariablesMap
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

const initialState = {
  css: "",
  status: CompilerStatus.INIT,
  useWorker: true,
  lastError: undefined
}
export const BootstrapCompilerContext = createContext<{
  css: string
  status: CompilerStatus
  doCompile: () => any
}>({ ...initialState, doCompile: () => {} })

export class BootstrapCompiler extends PureComponent<Props, State> {
  state = initialState
  currentTerminate: Function | null | undefined = null
  // componentDidUpdate(prevProps: Props) {
  //   if (prevProps == this.props) {
  //     return
  //   }
  //   this.buildBootstrap()
  // }
  terminateIfExist() {
    if (this.currentTerminate) {
      // @ts-ignore
      this.currentTerminate()
    }
    this.currentTerminate = null
  }
  buildBootstrap() {
    this.terminateIfExist()
    this.setState({ status: CompilerStatus.PROGRESS }, () => {
      const { submitVariables } = this.props
      // const variablesKeyValue = convertToKeyValue(submitVariables)
      const compiler = this.state.useWorker
        ? compileWithWorker
        : compileWithDynamicImport
      // const compiler = compileLocal
      const { execute, terminate } = compiler(submitVariables)
      this.currentTerminate = terminate
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
  handleUseWorker = (e: any) => {
    this.setState({ useWorker: e.target.checked })
  }
  render() {
    const { useWorker, css, status } = this.state
    const values = { css, status, doCompile: this.buildBootstrap }

    return (
      <BootstrapCompilerContext.Provider value={values}>
        <div>
          <Label>
            <Input
              type="checkbox"
              onChange={this.handleUseWorker}
              checked={useWorker}
            />
            <span>Enable Web Worker</span>
          </Label>
          {this.props.children}
        </div>
      </BootstrapCompilerContext.Provider>
    )
  }
}
