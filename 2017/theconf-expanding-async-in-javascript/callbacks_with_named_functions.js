var timeout = (time, fn) => setTimeout(fn, time)
var progress = fn => {
  var handle = setInterval(() => process.stdout.write('.'), 50)
  fn(() => clearTimeout(handle))
}

var aBootTime = 1000
var bBootTime = 1000
var queueCallback = null
var serverHandler = null

progress((done) => {
  serverA(done)
  serverB()
})

function serverA(done) {
  console.log("A: Booting up system...")
  timeout(1000, checkNetwork)

  function checkNetwork() {
    console.log("A: Checking network connection")
    timeout(500, sendRequest)
  }

  function sendRequest() {
    console.log("A: Request complex computation")
    sendNetworkRequest(callback)
  }

  function callback(value) {
    console.log("A: Computation returned " + value)
    done()
  }
}

function serverB() {
  console.log("B: Booting up system...")
  timeout(1000, listenRequests)

  function listenRequests() {
    console.log("B: Server up and running")
    serverHandler = handler

    if (queueCallback) {
      serverHandler(queueCallback)
      queueCallback = null
    }
  }

  function handler(callback) {
    console.log("B: Starting heavy computation")
    timeout(2000, () => callback(42))
  }
}

function sendNetworkRequest(callback) {
  if(serverHandler) {
    serverHandler(callback)
  } else {
    queueCallback = callback
  }
}
// A: Booting up system...
// B: Booting up system...
// A: Checking network connection
// B: Server up and running
// A: Request complex computation
// B: Starting heavy computation
// A: Computation returned 42
