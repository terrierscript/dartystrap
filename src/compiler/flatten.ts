export const flatten = (files) => {
  return files.reduce((prev, curr) => {
    if (curr.files) {
      const child = flatten(curr.files)
      return {
        ...prev,
        ...child
      }
    }
    return {
      ...prev,
      [curr.path]: curr
    }
  }, {})
}
