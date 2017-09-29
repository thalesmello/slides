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

class ProcessActor {
    async sayHello(to) {
        var sleep = time => {
            let start = new Date().getTime()
            let expire = start + time;

            while (new Date().getTime() < expire);
        }

        await sleep(1000)

        return `Hello to ${to} from ProcessActor`;
    }
}

var actorSystem = actors();

asyncProgress(() => {
    return actorSystem
        .rootActor()
        .then(rootActor => rootActor.createChild(ProcessActor, { mode: 'forked' }))

        .then(myActor => {
            console.log('Going to send my actor a message')
            return myActor.sendAndReceive('sayHello', 'World')
        })
        .then(reply => {
            console.log(`ProcessAct replied: ${reply}`);
        })
        .finally(() => actorSystem.destroy());
})
