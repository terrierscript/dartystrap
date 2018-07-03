import React, { SFC } from "react"

import { build } from "../lib/bootstrap"
const SampleBootstrap = () => (
  <div
    dangerouslySetInnerHTML={{
      __html: `
<button type="button" class="btn btn-primary">Primary</button>
<button type="button" class="btn btn-secondary">Secondary</button>
<button type="button" class="btn btn-success">Success</button>
<button type="button" class="btn btn-danger">Danger</button>
<button type="button" class="btn btn-warning">Warning</button>
<button type="button" class="btn btn-info">Info</button>
<button type="button" class="btn btn-light">Light</button>
<button type="button" class="btn btn-dark">Dark</button>

<button type="button" class="btn btn-link">Link</button>
  `
    }}
  />
)

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
    console.log(this.props.variables)
    // const decorator = scss => `.sample{ ${scss} }`
    build(this.props.variables).then(css => {
      this.setState({ css })
    })
  }
  render() {
    console.log(this.state.css)
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
