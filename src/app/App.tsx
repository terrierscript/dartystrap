import React, { useContext } from "react"
import {
  BootstrapCompiler,
  BootstrapCompilerContext
} from "./compiler/BootstrapCompiler"
import { Component } from "react"
import { Variables } from "./variables/Variables"
import { Examples } from "./examples/Examples"
import { Result } from "./result/Result"
import { CompileStatus } from "./compiler/CompileStatus"
import { Base, Block } from "reakit"

const Status = () => {
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

export const MyApp = () => {
  return (
    <Base>
      <BootstrapCompiler>
        <Variables>
          <Status />
        </Variables>
      </BootstrapCompiler>
    </Base>
  )
}
