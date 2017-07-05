# TimL: um Lisp à la Clojure no seu Vim

## By thalesmello

## Talks available at github.com/thalesmello/slides

---

Boa tarde!

---

Vamos falar de Vim

![](./vim-logo.png)

---

E um pouco de Clojure (indiretamente)

![](./clojure-logo.png)

---

Clojure é um LISP com algumas características interessantes

- Compilada para Java Bytecode
- Interop com Java
- Tipos persistentes
- Concorrência

---

TimL é um LISP inspirado em Clojure
https://github.com/tpope/timl

- Compila para VimScript
- Interop com Vim
- Tipos persistentes
- Single threaded (aí já seria pedir demais, né?)

Criada pelo Tim Pope, pai dos plugins do Vim.

---

Mas podemos usá-la pra fazer plugins!

![](./vault_boy.png)

---

Instale o plugin com seu Package Manager favorito ;)

Recomendação: *vim-plug*
https://github.com/junegunn/vim-plug

```vim
Plug 'tpope/timl'
```

---

Tome cuidado com o bug #12
https://github.com/tpope/timl/issues/12

```vim
let do_symbol = timl#symbol#intern('do')
let number_one = timl#reader#read_string_all('1')
let code = timl#cons#create(do_symbol, number_one)
call timl#loader#eval(code)
```

---

Como funciona?

- Core da linguagem foi escrito em Vimscript
- Extensões foram escritas em TimL (como Clojure)
- Arquivos gerados são cacheados

---

Vou usar pra programar meu vim!

** Não faça isso! **

---

Este é apenas um experimento, pra ver até onde seria
possível chegar com Vimscript.

---

Existem formas melhores de se colocar escrever
plugins em Clojure... ou Haskell... ou na sua
linguagem de preferência.

Usando `remote plugins` do Neovim.

- Clojure: https://github.com/clojure-vim/neovim-client
- Haskell: https://github.com/neovimhaskell/nvim-hs
- Outros: https://github.com/neovim/neovim/wiki/Related-projects

![](./neovim.png)

---

Obrigado!
