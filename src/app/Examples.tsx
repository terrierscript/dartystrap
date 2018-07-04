import React, { SFC } from "react"
import sass from "sass"
// import { build } from "../lib/bootstrap"
import { SampleButtons } from "./examples/SampleButtons"
import ShadowDOM from "react-shadow"

const ExampleWithCss = ({ css }) => {
  return (
    <ShadowDOM>
      <div>
        <style>{css}</style>
        <div className="sample">
          <SampleButtons />
        </div>
      </div>
    </ShadowDOM>
  )
}
const ExampleWithDefaultBootstrap = () => {
  const bootstrapUrl =
    "https://unpkg.com/bootstrap@4.1.1/dist/css/bootstrap.min.css"
  return (
    <ShadowDOM include={[bootstrapUrl]}>
      <div className="sample">
        <SampleButtons />
      </div>
    </ShadowDOM>
  )
}

export class Examples extends React.Component<{ baseCss: string }, {}> {
  render() {
    return (
      <>
        <ExampleWithCss css={this.props.baseCss} />
        <ExampleWithDefaultBootstrap />
      </>
    )
  }
}
