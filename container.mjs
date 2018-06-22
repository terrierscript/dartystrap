import { html, render } from 'https://dev.jspm.io/lit-html';

const input = ({value, onChange}) => {
  console.log(onChange)
  return html`<input 
    value=${value} 
    onchange=${(e) => {
      console.log(e, onChange)
      onChange(e)
    }}
  ></input>`
}

export const container = () => {
  let inputVal = "val"
  const onChange = (e) => {
    console.log(e)
    inputVal = e.target.value
  }
  return html`
    <div>${inputVal}</div>
    ${input({value: inputVal, onChange}) }
  `
}