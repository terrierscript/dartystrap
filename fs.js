const fsMock = {
  statSync(name) {
    return {
      isFile: () => {
        // return true;
        // console.log("isFile")
        return false
      },
      isDirectory: () => {
        // console.log("isDirectroy")

        return false
      }
    }
  }
}
exports.modules = fsMock
