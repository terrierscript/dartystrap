import React from "react"
import { BootstrapCompiler } from "./compiler/BootstrapCompiler"
import { Component } from "react"
import { Layout } from "./main/Layout"
import { Base } from "reakit"
import { VariablesState } from "./variables/VariablesState"

export const MyApp = () => {
  return (
    <Base>
      <BootstrapCompiler>
        <VariablesState>
          <Layout />
        </VariablesState>
      </BootstrapCompiler>
    </Base>
  )
}
