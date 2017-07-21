title: My Presentation
class: animation-fade no-counter
layout: true

---

class: impact

# OO in JavaScript
# The Good Parts

Thales Mello https://github.com/thalesmello

Derek Stavis https://github.com/derekstavis

TDC São Paulo

---

# Por que você programa JavaScript?

--

Pode que seja pra criar aplicações web

--

Pode ser que seja pra criar servidores super performáticos

--

Pode ser que seja para reaproveitar o mesmo código no browser e no servidor 😉

--

Mas ainda assim, JavaScript é uma linguagem com um histórico bastante confuso.

--

É uma linguagem funcional? É uma linguagem imperativa?


---

# É uma mistura dos dois

Predominantemente, é uma linguagem .alt[imperativa] mas com características .alt[funcionais] e de .alt[orientação a objetos]

--

A comunidade tem seguido muito por uma linha funcional nos últimos anos, deixando a capacidade de trabalhar com objetos um pouco de lado

--

## O ponto é que
frequentemente, lidamos com problemas de arquitetura que são muito elegantemente resolvidos utilizando .alt[padrões de design OO]

---

class: impact

# É sobre isso que vamos falar hoje

---

# Por que diabos Orientação a Objetos é Relevante?

Afinal, programação funcional não é uma maneira muito melhor de se escrever código?

--

Isso não é *sempre* verdade

--

Por exemplo, é muito comum precisar trabalhar sempre com os mesmos conjunto de dados e funções

--

Numa situação dessas, faria muito sentido atrelar aquele conjunto de dados àquelas funções num único objeto

--

É disso que se trata orientação a objetos

---

Antes de a gente continuar, o primeiro passo para manter a sanidade mental ao se trabalhar com orientação a objetos é adotar

--

# Imutabilidade

--

Afinal, não é nenhum conceito exclusivo de linguagens funcionais.

--

Para trabalhar adotar imutabilidade, basta trabalhar com o conceito de que os métodos (ou funções) de um objeto sempre vão retornar .alt[novos objetos, sem mudar o estado]

--

---


```javascript
function main () {
  const user = {
    name: 'Filipe',
    surname: 'Devlin'
  }

  const getUserFullName = user => `${user.name} ${user.surname}`
  const modifyUser = (user, newProps) => Object.assign({}, user, newProps)

  console.log(getUserFullName(modifyUser(user, { name: 'Mestre' })))
}
```

---


```javascript
function main () {
  const user = new User({
    name: 'Filipe',
    surname: 'Devlin'
  })

  console.log(user.modify({ name: 'Mestre' }).fullName())
}

class User {
  constructor ({ name, surname }) {
    this.name = name
    this.surname = surname
  }

  fullName () {
    return `${this.name} ${this.surname}`
  }

  modify (newProps) {
    return new User(Object.assign({}, this, newProps))
  }
}
```

---

Sabe quando você tem um monte de `if (obj == null)` em várias partes do código?

--

# Null Object Pattern

Em vez de fazer isso, utilize um Null Object, que obedece à mesma interface do seu objeto original.

---


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
```

---

```javascript
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
function populatePageWithUser (user) {
*  if (user == null) {
*    document.getElementById('user-name').innerHTML = 'Visitante'
*    document.getElementById('status-message').innerHTML = 'Cadastre-se aqui!'
*  }
  else {
    document.getElementById('user-name').innerHTML = user.name
    document.getElementById('status-message').innerHTML = user.statusMessage
  }
}

function initializeHelpIcon (user) {
  let helpText
*  if (user == null) {
*    helpText = `Olá Visitante! Como posso te ajudar?`
*  }
  else {
    helpText = `Olá ${user.name}! Como posso te ajudar?`
  }

  document.getElementById('help-message-text').innerHTML = helpText
}
```

---

# Alternativa

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
```

---

```javascript
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

Puxa... orientação a objetos faz os objetos ficarem muito acoplados
e difíceis de testar!

--

# Dependency Injection and Factories

Quando isso acontecer, por que não passar as dependências do seu projeto
durante a construção do seu objeto?

---

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
```

---

```javascript
class DownloadManager {
  constructor (folder) {
    this.folder = folder
  }

  downloadFile (url, filename) {
*    const filePath = path.join(this.folder, filename)
*    return fetch(url)
      .then(data => data.json())
*      .then(contents => fs.writeFileAsync(filePath, contents))
  }

  listDownloadedFiles () {
*    return fs.readdirAsync(this.folder)
  }
}
```

---

```javascript
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

---

Puxa, mas são muitas dependências para se passar durante a criação de um
objeto. Isso é bastante trabalhoso.

--

# Repository Pattern

Não necessariamente. Com o repository pattern, você pode manter isntâncias de todas
as dependências do seu projeto em um objeto, o qual você pode passar como referência para a sua função ou na construção do seu objeto.

---

```javascript
const repo = initializeRepository()
...
const { db, config } = repo
```

---

Também, de vez em quando, queremos utilizar um objeto ou função que já existe, mas só pra adicionar uma característica...

--

# Decorator

Nessas situações, a gente pode criar um objeto obedecendo à mesma interface do objeto a ser modificado, repassando (ou não) as chamadas para ele.

---

```javascript
handleNewUser(console, { username: 'deschamps', password: 'renatinha<3' })

function handleNewUser(log, user) {
  log.info('New user is', user)
}

// New user is { username: 'deschamps', password: 'renatinha<3' }
```

---

```javascript
handleNewUser(console, { username: 'deschamps', password: 'renatinha<3' })

function handleNewUser(log, user) {
  log.info('New user is', user)
}

*// New user is { username: 'deschamps', password: 'renatinha<3' }
```

---

```
const log = makeSafeLog(console)
handleNewUser(log, { username: 'deschamps', password: 'renatinha<3' })

function makeSafeLog (log) {
  return {
    info (...args) {
      const safeArgs = []
      for (const arg of args) {
        if (Object.keys(arg).includes('password')) {
          const maskedArg = Object.assign({}, arg, { password: '***' })
          safeArgs.push(maskedArg)
        }
        else {
          safeArgs.push(arg)
        }
      }
      log.info(...safeArgs)
    }
  }
}

// New user is { username: 'deschamps', password: '***' }
```

---

# Strategy

* Objects that implements a specific strategy for solving a problem
* Depending on the inputs, select at runtime the strategy to be used

---

```javascript
const strategyBuilder = cond([
 [both(has('email'), has('password')), login.build],
 [has('api_key'), api.build],
 [has('encryption_key'), encryption.build],
 [T, rejectInvalidAuthObject],
])
```

---

# Adapter

* Adapta a interface de um objeto para outra
* Muito usado com inversão de dependencia

---
 
```javascript
class ArrayListAdapter {
  constructor(array) { this.array = array }
  length() { return 10 }
  getItem(index) { ... }
}

class MapListAdapter {
 constructor(object) { this.obj = obj }
  length() { return Object.keys(this.obj).length }
  getItem(index) { return Object.values(this.obj)[index] }
}
```

---

# Conclusão

Orientação a objetos se trata de uma maneira conveniente de utilizar polimorfismo

--

Ou seja, em vez de você ficar construindo o seu código com `if (...) {} else {}`, você consegue construir toda a lógica utilizando apenas objetos e chamadas de métodos.

--

---

# Já ouviu falar de Smalltalk?

É uma linguagem inteiramente orientada a objetos, que consegue funciona inteiramente a base de chamadas polimórfica de métodos. Não existe nem mesmo o `if` statement na linguagem.

--

JavaScript é uma linguagem multiparadigma. Portanto, o caminho para se escrever código legível é conhecer o melhor do que a linguagem tem a oferecer, e utilizar a arquitetura certa para resolver o problema certo.

--

Isso, muitas vezes, significa escrever código parte funcional, parte orientado a objetos.

---

class: impact

# Obrigado!

Slides disponíveis em https://github.com/thalesmello/slides/tree/master/2017/oo-in-js-the-good-parts

## Perguntas?
