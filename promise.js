const success = new Promise( (res, rej) => {
  setTimeout( () => {
    res("success")
  },1000)
})
const fail = new Promise( (res, rej) => {
  setTimeout( () => {
    rej("fail")
  },500)
})

Promise.race([success, fail])
  .then( (a) => {
    console.log(a)
  }).catch( b => {

  })