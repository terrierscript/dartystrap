import React from "react"
import styled from "react-emotion"

const Pre = styled("pre")`
  width: 100%;
`
const Code = styled("code")`
  overflow-wrap: break-word;
  white-space: pre-wrap;
`
export const Result = ({ children }) => {
  return (
    <Pre>
      <Code>{children}</Code>
    </Pre>
  )
}
