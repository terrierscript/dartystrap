// polyfill if need
if (!fetch) {
  const fetch = require("cross-fetch")
}

export const fetchPlain = (url: string) => {
  return fetch(url).then((r) => r.text())
}

export const fetchJson = (url: string) => {
  return fetch(url).then((r) => r.json())
}

export const fetchWithStorage = (url: string) => {
  const item = localStorage.getItem(url)
  if (!item) {
    return fetchPlain(url).then((item) => {
      localStorage.setItem(url, item)
      return item
    })
  }
  return Promise.resolve(item)
}

export const fetchWithStorageJson = (url: string) => {
  const item = localStorage.getItem(url)
  if (!item) {
    return fetchJson(url).then((item) => {
      localStorage.setItem(url, JSON.stringify(item))
      return item
    })
  }
  return Promise.resolve(JSON.parse(item))
}

// const worker = new Worker("../worker/dl.worker.js")

// const fetchWithWorker = url => {
//   return new Promise((res, rej) => {
//     worker.addEventListener("message", e => {
//       res(e.data)
//     })
//     worker.postMessage(url)
//   })
// }
