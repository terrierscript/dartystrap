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
const BootstrapCompilerContext = createContext<{
  css: string
  status: CompilerStatus
  doCompile?: any
}>({
  ...initialState
  // doCompile: () => {
  //   throw new Error("Not Initilized BootstrapCompilerContext")
  // }
})

export const BootstrapCompilerContextConsumer =
  BootstrapCompilerContext.Consumer
export class BootstrapCompiler extends PureComponent<{}, State> {
  state = initialState
  currentTerminate: Function | null | undefined = null
  // TODO: wan't build first time
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
  buildBootstrap = (submitVariables) => {
    console.log("start compile")
    this.terminateIfExist()
    this.setState({ status: CompilerStatus.PROGRESS }, () => {
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
    console.log(values)

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
