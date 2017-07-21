# OO in JavaScript: The Good Parts
TDC São Paulo

- Thales Mello http://github.com/thalesmello
- Derek Stavis http://github.com/derekstavis

---

Por que você programa JavaScript?

---

## Por que Orientação a Objetos é Relevante?

- Juntar Objetos e Dados pode deixar seu sistema mais coeso

---

## Imutabilidade

O primeiro passo para evitar os problemas mais comuns da OO à la Java é evitar mutabilidade, simplesmente
simplesmente evite mudar estado. Basta tr'abalhar com o conceito de que o seu objeto recebe o seu estado
na criação e que qualquer um de seus métodos só retorna um novo objeto.

---

## Null Object Pattern

```javascript
document.onload = onPageLoad

function onPageLoad () {
  Promise.resolve(localStorage)
    .then(({ token }) => {
      if (token) {
        return fetch('https://my-cool-app.com/get-user', { token })
      }
    })
    .then(user => {
      populatePageWithUser(user)
      initializeHelpIcon(user)
    })
}

function populatePageWithUser (user) {
  if (user == null) {
    document.getElementById('user-name').innerHTML = 'Visitante'
    document.getElementById('status-message').innerHTML = 'Cadastre-se aqui!'
  }
  else {
    document.getElementById('user-name').innerHTML = user.name
    document.getElementById('status-message').innerHTML = user.statusMessage
  }
}

function initializeHelpIcon (user) {
  let helpText
  if (user == null) {
    helpText = `Olá Visitante! Como posso te ajudar?`
  }
  else {
    helpText = `Olá ${user.name}! Como posso te ajudar?`
  }

  document.getElementById('help-message-text').innerHTML = helpText
}
```

---

```javascript
document.onload = onPageLoad

function onPageLoad () {
  Promise.resolve(localStorage)
    .then(({ token }) => {
      if (token) {
        return fetch('https://my-cool-app.com/get-user', { token })
      }
      else {
        return makeNullUser()
      }
    })
    .then(user => {
      populatePageWithUser(user)
      initializeHelpIcon(user)
    })
}

function makeNullUser () {
  return {
    name: 'Visitante',
    statusMessage: 'Cadastre-se aqui!'
  }
}

function populatePageWithUser (user) {
  document.getElementById('user-name').innerHTML = user.name
  document.getElementById('status-message').innerHTML = user.statusMessage
}

function initializeHelpIcon (user) {
  const helpText = `Olá ${user.name}! Como posso te ajudar?`
  document.getElementById('help-message-text').innerHTML = helpText
}
```

---

# Dependency Injection and Factories

```javascript
class DownloadManager {
  constructor (folder) {
    this.folder = folder
  }

  downloadFile (url, filename) {
    const filePath = path.join(this.folder, filename)
    return fetch(url)
      .then(data => data.json())
      .then(contents => fs.writeFileAsync(filePath, contents))
  }

  listDownloadedFiles () {
    return fs.readdirAsync(this.folder)
  }
}

class DownloadManager {
  constructor (fetch, readdir, pathJoin, writeFile, folder) {
    this.fetch = fetch
    this.readdir = readdir
    this.pathJoin = pathJoin
    this.writeFile = writeFile
    this.folder = folder
  }

  downloadFile (url, filename) {
    const filePath = this.pathJoin(this.folder, filename)
    return this.fetch(url)
      .then(data => data.json())
      .then(contents => this.writeFile(filePath, contents))
  }

  listDownloadedFiles () {
    return readdir(this.folder)
  }
}

```

# Decorator

```javascript
handleNewUser(makeLog(), user)
function handleNewUser(log, user) {
  log.info('New user is', user)
}

// New user is { username: deschamps, password: renatinha<3 }

handleNewUser(makeSafeLog(makeLog()), user)

function makeSafeLog (log) {
  return {
    info (...args) {
      const safeArgs = []
      for (const arg of args) {
        if (Object.keys(arg).includes('password')) {
          const obj = Object.assign({}, { passowrd: '***' })
        }
      }
      log.info(...safeArgs)
    }
  }
}

```
