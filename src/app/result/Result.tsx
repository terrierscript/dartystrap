import React from "react"
import styled from "react-emotion"
import { Base, Heading, Code } from "reakit"
// const Pre = styled("pre")`
//   width: 100%;
// `
// const Code = styled("code")`
//   overflow-wrap: break-word;
//   white-space: pre-wrap;
// `
export const Result = ({ code }) => {
  if (!code) {
    return null
  }
  return (
    <Base>
      <Heading>Output CSS</Heading>
      <Code block>{code}</Code>
    </Base>
  )
}
