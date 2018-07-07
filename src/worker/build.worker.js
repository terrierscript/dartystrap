import "./polyfill"
import { build } from "../lib/bootstrap"

console.log(self.modules)
self.modules = {
  fs() {
    return {
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
  }
}
self.require = (name) => {
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
console.log("require", require)

// console.log("polyfill", setImmediate)
// console.log("Buffer", Buffer)

self.addEventListener(
  "message",
  function(e) {
    build(e.data)
      .then((css) => {
        console.log(css)
        self.postMessage(css)
      })
      .catch((e) => {
        console.error(e)
      })
  },
  false
)
