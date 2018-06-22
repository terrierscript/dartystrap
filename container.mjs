import { html, render, directive } from 'https://dev.jspm.io/lit-html/lib/lit-extended.js';

const input = ({value, onChange}) => {
  console.log(onChange)
  return html`<input 
    value=${value} 
    on-change=${(e) => {
      console.log(e, onChange)
      onChange(e)
    }}
  ></input>`
}


export const container = () => {
  let inputVal = "val"
  const val = (e) => directive( (part) => {
    part.setValue()
  })
  const onChange = (e) => {
    inputVal = e.target.value
    console.log(inputVal)
  }
  return html`
    <div>${inputVal}</div>
    ${input({value: inputVal, onChange}) }
  `
}