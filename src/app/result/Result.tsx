import React from "react"
import styled from "react-emotion"
import { Code } from "reakit"
// const Pre = styled("pre")`
//   width: 100%;
// `
// const Code = styled("code")`
//   overflow-wrap: break-word;
//   white-space: pre-wrap;
// `
export const Result = ({ children }) => {
  return <Code block>{children}</Code>
}
