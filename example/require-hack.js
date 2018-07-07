window.require = name => {
  console.log("poly require", name)
  if (name !== "fs") {
    return false
  }
  const fsMock = {
    statSync(name) {
      return {
        isFile: () => {
          return false
        },
        isDirectory: () => {
          return false
        }
      }
    }
  }
  return fsMock
}
