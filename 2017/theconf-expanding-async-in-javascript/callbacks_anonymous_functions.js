var timeout = (time, fn) => setTimeout(fn, time)
var progress = fn => {
  var handle = setInterval(() => process.stdout.write('.'), 50)
  fn(() => clearTimeout(handle))
}

progress(done => {
  var aBootTime = 1000
  var bBootTime = 2000
  var queueCallback = null
  var serverHandler = null
  console.log("A: Booting up system...")
  timeout(aBootTime, () => {
    console.log("A: Checking network connection")
    timeout(500, () => {
      console.log("A: Request complex computation")
      sendRequest(value => {
        console.log("A: Computation returned " + value)
        done()
      })
    })
  })

  console.log("B: Booting up system...")
  timeout(bBootTime, () => {
    console.log("B: Server up and running")
    serverHandler = (callback) => {
      console.log("B: Starting heavy computation")
      timeout(2000, () => callback(42))
    }
    if (queueCallback) {
      serverHandler(queueCallback)
      queueCallback = null
    }
  })

  function sendRequest(callback) {
    if (serverHandler) { serverHandler(callback) }
    else { queueCallback = callback }
  }
})
