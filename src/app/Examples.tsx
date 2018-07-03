import React, { SFC } from "react"

import { build } from "../lib/bootstrap"
const SampleBootstrap = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
  <div class="row">
    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-blue">Blue</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-indigo">Indigo</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-purple">Purple</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-pink">Pink</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-red">Red</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-orange">Orange</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-yellow">Yellow</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-green">Green</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-teal">Teal</div>
    </div>

    <div class="col-md-4">
      <div class="p-3 mb-3 swatch-cyan">Cyan</div>
    </div>
  </div>
  `
    }}
  />
)

export class Examples extends React.Component<any, any> {
  state = {
    css: ""
  }
  componentDidUpdate() {
    this.build()
  }
  componentDidMount() {
    this.build()
  }
  build() {
    const decorator = scss => `.sample{ ${scss} }`
    build(this.props.variables, decorator).then(css => {
      console.log(css)
      this.setState({ css })
    })
  }
  render() {
    return (
      <div>
        <style>{this.state.css}</style>
        <div className="sample">
          <SampleBootstrap />
        </div>
      </div>
    )
  }
}
