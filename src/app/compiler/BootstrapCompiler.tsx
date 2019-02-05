import React, { createContext } from "react"
import { PureComponent } from "react"
import { VariablesMap } from "../../compiler/scssVariables"
import { compileWithWorker, compileWithDynamicImport } from "../../compiler/"

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
const initialContextHandler = () => {
  throw new Error("Not Initilized BootstrapCompilerContext")
}
export const BootstrapCompilerContext = createContext<{
  css: string
  useWorker: boolean
  status: CompilerStatus
  executeCompile: (...args: unknown[]) => any
  handleUseWorker: (...args: unknown[]) => any
}>({
  ...initialState,
  executeCompile: initialContextHandler,
  handleUseWorker: initialContextHandler
})

export class BootstrapCompiler extends PureComponent<{}, State> {
  state = initialState
  currentTerminate: Function | null | undefined = null
  terminateIfExist() {
    if (this.currentTerminate) {
      // @ts-ignore
      this.currentTerminate()
    }
    this.currentTerminate = null
  }
  buildBootstrap = (submitVariables) => {
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
    const values = {
      css,
      status,
      useWorker,
      executeCompile: this.buildBootstrap,
      handleUseWorker: this.handleUseWorker
    }

    return (
      <BootstrapCompilerContext.Provider value={values}>
        {this.props.children}
      </BootstrapCompilerContext.Provider>
    )
  }
}
