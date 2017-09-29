var actors = require('comedy');
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

class Actor {
    async sayHello(to) {
        var { delay } = require('bluebird')

        await delay(1000)

        return `Hello to ${to} from Actor`;
    }
}

// Create an actor system.
var actorSystem = actors();

asyncProgress(() => {
    return actorSystem
        // Get a root actor reference.
        .rootActor()
        // Create a class-defined child actor, that is run in a separate process (forked mode).
        .then(rootActor => rootActor.createChild(Actor))
        // Send a message to our forked actor with a self process PID.

        .then(myActor => {
            console.log('Going to send my actor a message')
            return myActor.sendAndReceive('sayHello', 'World')
        })
        .then(reply => {
            // Output result.
            console.log(`Actor replied: ${reply}`);
        })
        // Destroy the system, killing all actor processes.
        .finally(() => actorSystem.destroy());
})
