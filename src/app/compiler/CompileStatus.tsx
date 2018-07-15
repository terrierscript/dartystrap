import React, { SFC } from "react"
import { keyframes } from "emotion"
import styled from "react-emotion"
import { CompilerStatus } from "./BootstrapCompiler"

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled("span")`
  animation: ${spin} 1s ease infinite;
  display: inline-block;
`

const NowCompiling = () => {
  return (
    <div>
      <Spinner>😇</Spinner>
      Now Compiling
    </div>
  )
}

export const CompileStatus: SFC<{ status: CompilerStatus }> = ({ status }) => {
  switch (status) {
    case CompilerStatus.INIT:
      return <div>Click Button</div>
    case CompilerStatus.PROGRESS:
      return <NowCompiling />
    case CompilerStatus.SUCCESS:
      return <div data-test-id="success">✅ Compile Complete</div>
    case CompilerStatus.ERROR:
      return <div data-test-id="error">❌ Error!</div>
  }
}
