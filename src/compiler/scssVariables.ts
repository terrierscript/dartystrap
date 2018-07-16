export type VariableType = {
  name: string
  defaultValue: string
  value?: string
}
export type VariablesMap = { [key: string]: VariableType }
type KeyValue = { [key: string]: string }

export const convertToMapFromArray = (arr: VariableType[]): VariablesMap => {
  return arr.reduce((curr, { name, defaultValue }) => {
    return {
      ...curr,
      [name]: {
        name,
        defaultValue,
        value: ""
      }
    }
  }, {})
}

export const convertToKeyValue = (map: VariablesMap): KeyValue => {
  return Object.entries(map)
    .filter(([k, v]) => {
      return !!v.value
    })
    .reduce((prev, [k, v]) => {
      return { ...prev, [k]: v.value }
    }, {})
}
