// polyfill if need
if (!fetch) {
  const fetch = require("cross-fetch")
}

exports.fetchPlain = url => {
  return fetch(url).then(r => r.text())
}

exports.fetchWithStorage = url => {
  if (!localStorage) {
    return fetchPlain(url)
  }
  const item = localStorage.getItem(url)
  if (!item) {
    return fetchPlain(url).then(item => {
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
