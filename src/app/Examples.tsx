import React, { SFC } from "react"
import sass from "sass"
// import { build } from "../lib/bootstrap"
import { SampleButtons } from "./examples/SampleButtons"
import ShadowDOM from "react-shadow"

export class Examples extends React.Component<{ baseCss: string }, {}> { //  { css: string }
  // state = { css: "" }
  // componentDidUpdate(prevProps) {
  //   if (prevProps.baseCss === this.props.baseCss) {
  //     return
  //   }
  //   console.log("update")
  //   this.build()
  // }
  // componentDidMount() {
  //   this.build()
  // }
  // build() {
  //   const { baseCss } = this.props
  //   const scss = `
  //     .sample{
  //       ${baseCss}
  //     }
  //   `
  //   const result = sass.renderSync({
  //     data: scss
  //   })
  //   // (err, result) => {
  //   //   if (err) {
  //   //   }
  //   this.setState({ css: result.css.toString() })
  //   // }
  // }
  render() {
    return (
      <ShadowDOM>
        <div>
          <style>{this.props.baseCss}</style>
          <div className="sample">
            <SampleButtons />
          </div>
        </div>
      </ShadowDOM>
    )
  }
}
