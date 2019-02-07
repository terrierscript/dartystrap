import React, { SFC } from "react"
import ShadowDOM from "react-shadow"
import { examples } from "./samples"

const ExmapleSnippet = ({ html }) => (
  <div dangerouslySetInnerHTML={{ __html: html }} />
)

const ExampleWithCss = ({ css, html }) => {
  return (
    <ShadowDOM>
      <div>
        <style>{css}</style>
        <ExmapleSnippet html={html} />
      </div>
    </ShadowDOM>
  )
}

const ExampleWithDefaultBootstrap = ({ html }) => {
  const bootstrapUrl =
    "https://unpkg.com/bootstrap@4.1.1/dist/css/bootstrap.min.css"
  return (
    <ShadowDOM include={[bootstrapUrl]}>
      <div>
        <ExmapleSnippet html={html} />
      </div>
    </ShadowDOM>
  )
}

export const Examples = ({ baseCss }) => {
  // console.debug("update css", baseCss)
  const html = examples["button"]
  return (
    <div>
      <h1>Customize</h1>
      <ExampleWithCss css={baseCss} html={html} />
      <h1>Default</h1>
      <ExampleWithDefaultBootstrap html={html} />
    </div>
  )
}
