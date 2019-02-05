import React from "react"
import { useContext } from "react"
import { BootstrapCompilerContext } from "../compiler/BootstrapCompiler"
import { Examples } from "../examples/Examples"
import { Result } from "../result/Result"
import { CompileStatus } from "../compiler/CompileStatus"
import { Block } from "reakit"

export const Status = () => {
  const { css, status } = useContext(BootstrapCompilerContext)
  return (
    <Block>
      <Block>
        <CompileStatus status={status} />
      </Block>
      <Block>
        <Examples baseCss={css} />
      </Block>
      <Block>
        <Result code={css} />
      </Block>
    </Block>
  )
}
