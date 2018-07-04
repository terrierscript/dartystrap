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

export const fetchWithStorage = (url: string, fetchFn = fetchPlain) => {
  if (!localStorage) {
    return fetchFn(url)
  }
  const item = localStorage.getItem(url)
  if (!item) {
    return fetchFn(url).then((item) => {
      localStorage.setItem(url, item)
      return item
    })
  }
  return Promise.resolve(item)
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
