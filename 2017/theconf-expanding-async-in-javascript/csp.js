var csp = require('js-csp')
var Promise = require('bluebird')
var { delay, all } = Promise
var asyncProgress = fn => {
    var handle = setInterval(() => process.stdout.write('.'), 50)
    return new Promise((resolve, reject) => {
        fn().then(value => {
            clearTimeout(handle)
            resolve(value)
        }).catch(error => {
            clearTimeout(handle)
            reject(error)
        })
    })
}
var toPromise = channel => {
    return new Promise(resolve =>
        csp.go(function * () {
            resolve(yield csp.take(channel))
        })
    )
}

asyncProgress(main)

async function main () {
    var [serverA, serverB] = await all([getServerA(), getServerB()])
    await serverA.sendRequest(serverB)
}

async function getServerA(bootTime) {
    console.log("A: Booting up system...")
    await delay(bootTime)
    await checkNetwork()

    return { sendRequest }

    function checkNetwork() {
        console.log("A: Checking network connection")
        return delay(500)
    }

    async function sendRequest(remoteServer) {
        console.log("A: Request complex computation")
        var channel = remoteServer.compute(2)

        var value = await toPromise(csp.go(function * () {
            var acc = 0
            var count = 0
            while (true) {
                var value = yield csp.take(channel)

                console.log(`A: Received ${value}`)

                acc += value
                count += 1

                if (count > 10) {
                    channel.close()
                    return acc
                }
            }
        }))

        console.log(`A: Computation returned ${value}`)
    }
}

async function getServerB(bootTime) {
    console.log("B: Booting up system...")
    await delay(bootTime)
    console.log("B: Server up and running")
    return { compute }

    function compute(value) {
        console.log("B: Starting heavy computation")

        var channel = csp.chan()

        csp.go(function * () {
            var current = value
            var i = 1

            while (yield csp.put(channel, current)) {
                current += i * 2
                i++

                yield csp.timeout(200)
            }
        })

        return channel
    }
}
