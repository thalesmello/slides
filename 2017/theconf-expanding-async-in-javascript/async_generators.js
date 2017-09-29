const { delay } = require('bluebird')
async function * producer() {
  const stream = [1, 2, 3, 4, 5]
  for (let val of stream) {
    await delay(1000)
    yield val
  }
}

async function consumer () {
  for await (let val of producer()) {
    console.log(val)
  }
}

consumer()
