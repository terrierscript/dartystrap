import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  useContext
} from "react"
import { PureComponent } from "react"
import { VariablesMap } from "../../compiler/scssVariables"
import { compileWithWorker, compileWithDynamicImport } from "../../compiler/"
import { CompilerModeContext } from "./CompileModeCheckbox"

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
  lastError: undefined
}
const initialContextHandler = () => {
  throw new Error("Not Initilized BootstrapCompilerContext")
}

export const BootstrapCompilerContext = createContext<ContextState>({
  ...initialState,
  executeCompile: initialContextHandler
})

type MaybeFunction = Function | null

const useBootstrapCompiler = () => {
  const { isWorker } = useContext(CompilerModeContext)
  const [css, setCss] = useState("")
  const [status, setStatus] = useState(CompilerStatus.INIT)
  const terminateFn = useRef<MaybeFunction>(null)
  const [lastError, setLastError] = useState(undefined)

  const compiler = useMemo(() => {
    return isWorker ? compileWithWorker : compileWithDynamicImport
  }, [isWorker])

  const executeCompile = useCallback(
    async (submitVariables) => {
      console.log(compiler.name)
      setStatus(CompilerStatus.PROGRESS)
      if (typeof terminateFn.current === "function") {
        terminateFn.current()
        terminateFn.current = null
      }
      const { execute, terminate } = compiler(submitVariables)
      if (terminate) {
        terminateFn.current = terminate
      }
      try {
        const css = await execute
        setStatus(CompilerStatus.SUCCESS)
        setCss(css)
      } catch (e) {
        setStatus(CompilerStatus.ERROR)
        setLastError(e)
        console.error(e)
      }
    },
    [compiler]
  )

  return {
    css,
    status,
    lastError,
    executeCompile
  }
}

type ContextState = ReturnType<typeof useBootstrapCompiler>

export const BootstrapCompiler = ({ children }) => {
  const values: ContextState = useBootstrapCompiler()

  return (
    <BootstrapCompilerContext.Provider value={values}>
      {children}
    </BootstrapCompilerContext.Provider>
  )
}
