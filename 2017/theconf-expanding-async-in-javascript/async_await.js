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
        var value = await remoteServer.compute(2)
        console.log(`A: Computation returned ${value}`)
    }
}

async function getServerB(bootTime) {
    console.log("B: Booting up system...")
    await delay(bootTime)
    console.log("B: Server up and running")
    return { compute }

    async function compute(value) {
        console.log("B: Starting heavy computation")
        await delay(2000)
        return 40 + value
    }
}
