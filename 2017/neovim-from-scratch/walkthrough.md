Como configurar o seu NeoVim do Zero

---

Então você está começando a usar Vim?

Você sabe o que todas as linhas no seu Vimfile significam?

---

São tantas opções de configuração, que isso acaba afugentando novatos

E foi isso que me afastou do Vim durante tanto tempo

---

Depois de ter me baseado no Vimfile de alguns amigos, eu personalizei o meu próprio.

E isso me possibilita ser bastante produtivo ao editar texto hoje em dia.

---

Entretanto, esse processo pode ser bastante trabalhoso para um iniciante.

Meu objetivo com esta talk é mostrar apenas *um* caminho das pedras que você
pode seguir para configurar o seu Neovim de uma maneira que seja mais útil
do que as configurações padrão.

---

A propósito, você já ouviu falar do Neovim?

![](./neovim.png)

---

Para quem não conhece, o Neovim é um fork do Vim, só que com uma participação mais
ativa da comunidade. Ele acaba tendo algumas features adicionais que tornam ele
mais atraente do que o Vim padrão.

Por conta disso, vamos utilizar o Neovim nesta talk.

---

Neovim
https://github.com/neovim/neovim

---

Roteiro

- Configurações básicas e úteis, explicando o que cada uma faz
- Como criar atalhos customizados com a tecla "leader"
- Substituição de texto com preview em tempo real
- Gerenciamento de plugin básico com o "vim-plug"
- Deixar o seu NeoVim bonitão com o tema "gruvbox"
- Editando texto com múltiplos cursores estilo "Sublime"
- Navegação de arquivos "fuzzy" estilo "Sublime Ctrl-P" com "fzf-vim"
- Auto completar código com o "nvim-completion-manager"
- Linting da sua linguagem favorita com o "ale"
- Auto completar pares "()", "{} e "[]" com o "auto-pairs"
- Expansão de snippets com o "UltiSnips"
- Como usar comandos "bash" para manipular seu código

---

Mão no código!

---

Gerenciador de pacotes `vim-plug`

https://github.com/junegunn/vim-plug

---

`gruvbox`
https://github.com/morhetz/gruvbox

---

`vim-multiple-cursors`

https://github.com/terryma/vim-multiple-cursors

---

`vim-polyglot`

https://github.com/sheerun/vim-polyglot

---

`vim-fzf`

https://github.com/junegunn/fzf.vim

```
Plug 'junegunn/fzf', { 'dir': '~/.fzf', 'do': './install --all'  }
Plug 'junegunn/fzf.vim'
```

---

`nvim-completion-manager`

https://github.com/roxma/nvim-completion-manager

---

`ale`
https://github.com/w0rp/ale

---

`auto-pairs`
https://github.com/jiangmiao/auto-pairs

---

`ultisnips`
https://github.com/SirVer/ultisnips

```
Plugin 'SirVer/ultisnips'
Plugin 'honza/vim-snippets'"

let g:UltiSnipsEditSplit="vertical"
let g:UltiSnipsSnippetsDir = '~/.config/nvim/UltiSnips'
```

---

Orientações finais

- Configure o Neovim pra ficar do seu jeito
- Leia a documentação

---

Talk disponível em:
https://github.com/thalesmello/slides/tree/master/2017/neovim-from-scratch


