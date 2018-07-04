import React, { SFC } from "react"

import { build } from "../lib/bootstrap"
import { SampleButtons } from "./examples/SampleButtons"

export class Examples extends React.Component<any, any> {
  state = {
    css: ""
  }
  componentDidUpdate() {
    console.log("update")
    this.build()
  }
  componentDidMount() {
    this.build()
  }
  build() {
    // const decorator = scss => `.sample{ ${scss} }`
    // build(this.props.variables).then(css => {
    //   this.setState({ css })
    // })
  }
  render() {
    return (
      <div>
        <style>{this.state.css}</style>
        <div className="sample">
          <SampleButtons />
        </div>
      </div>
    )
  }
}
