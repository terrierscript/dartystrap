type File = {
  [key: string]: any
  files: File[]
}

type FileMap = {
  [key: string]: File
}

export const flatten = (files: File[]): FileMap => {
  return files.reduce((prev: FileMap, curr: File) => {
    if (curr.files) {
      const child = flatten(curr.files)
      return { ...prev, ...child }
    }
    return { ...prev, [curr.path]: curr }
  }, {})
}
