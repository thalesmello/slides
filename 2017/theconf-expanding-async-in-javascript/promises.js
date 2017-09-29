var Promise = require('bluebird')
var { delay } = Promise
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

function main () {
    return Promise.props({
        serverA: getServerA(1000),
        serverB: getServerB(100)
    }).then(({ serverA, serverB }) => {
        return serverA.sendRequest(serverB)
    })
}

function getServerA(bootTime) {
    console.log("A: Booting up system...")

    return Promise.delay(bootTime)
        .then(checkNetwork)
        .then(() => ({ sendRequest }))

    function checkNetwork() {
        console.log("A: Checking network connection")
        return delay(500)
    }

    function sendRequest(remoteServer) {
        console.log("A: Request complex computation")
        return remoteServer
            .compute(2)
            .then(value => {
                console.log
                console.log(`A: Computation returned ${value}`)
            })
    }
}

function getServerB(bootTime) {
    console.log("B: Booting up system...")

    return Promise.delay(bootTime).then(() => {
        console.log("B: Server up and running")
        return { compute }
    })

    function compute(value) {
        console.log("B: Starting heavy computation")
        return delay(2000).then(() => 40 + value)
    }
}
