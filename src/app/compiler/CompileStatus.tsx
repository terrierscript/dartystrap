import React from "react"
import { keyframes } from "emotion"
import styled from "react-emotion"

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

export const CompileStatus = ({ isCompiling }) => {
  return isCompiling ? <NowCompiling /> : <div>✅ Compile Complete</div>
}
