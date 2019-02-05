import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useRef
} from "react"
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

export const BootstrapCompilerContext = createContext<ContextState>({
  ...initialState,
  executeCompile: initialContextHandler,
  handleUseWorker: initialContextHandler
})

type MaybeFunction = Function | null | undefined

const useBootstrapCompiler = () => {
  const [css, setCss] = useState("")
  const [status, setStatus] = useState(CompilerStatus.INIT)
  const terminateFn = useRef<MaybeFunction>(null)
  const [lastError, setLastError] = useState(undefined)
  const [useWorker, setUseWorker] = useState(true)

  const compiler = useMemo(() => {
    return useWorker ? compileWithWorker : compileWithDynamicImport
  }, [useWorker])
  const executeCompile = useCallback(
    (submitVariables) => {
      setStatus(CompilerStatus.PROGRESS)
      if (typeof terminateFn.current === "function") {
        terminateFn.current()
        terminateFn.current = null
      }
      const { execute, terminate } = compiler(submitVariables)
      terminateFn.current = terminate

      execute
        .then((css) => {
          setStatus(CompilerStatus.SUCCESS)
          setCss(css)
        })
        .catch((e) => {
          setStatus(CompilerStatus.ERROR)
          setLastError(e)
        })
    },
    [compiler]
  )
  return {
    css,
    status,
    lastError,
    useWorker,
    executeCompile,
    handleUseWorker: setUseWorker
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
