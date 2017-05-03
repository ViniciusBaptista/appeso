---
author: |
  | Giuliana Marquesi
  | Vinícius Baptista
date: "4 de maio de 2017"
header-includes:
  \pgfdeclareimage[width=3.25cm]{logo}{img/logo2.png}
  \logo{\pgfuseimage{logo}}
---

# Integração com o Facebook
___

Giuliana Marquesi

Vinicius Baptista

## Conta desenvolvedor

### Criar ID do projeto

Na página de [Desenvolvedor do Facebook](https://developers.facebook.com/apps)

![Ao clicar adicionar novo app](img/ao-clicar-adicionar-novo-aplicativo.png "IMG1: click criar novo aplicativo")

### Criar ID do projeto

![Visão geral do painel de configurações](/home/gigik/Documentos/trocas/esse_semestre/PDM/facebook-apresentacao/img/visao-geral-painel-configuracoes.png)

## Plugin

### Pesquisa

É possível encontrar plugins cordova em uma página própria do [projeto](https://cordova.apache.org/plugins/?q=facebook&platforms=cordova-android)

![Procurando plugin do facebook](img/procurando-plugins-site-cordova.png)

### Pesquisa

- Essa pesquisa rendeu 27 plugins encontrados que redirecionavam, a maioria, para a página do NPM.

. . .

- O projeto dito como oficial do Facebook pode ser encontrado em diversos pacotes NPM de diferentes usuários, mas que levam à mesma referência:
[https://github.com/Wizcorp/phonegap-facebook-plugin/](https://github.com/Wizcorp/phonegap-facebook-plugin/)

. . .

- Seguimos o README do repositório git para instalar e rodar os primeiros métodos.

### Instalação do plugin

**IMPORTANTE: Este plugin só é suportado até a versão do Android 5.**

. . .

- É possível instalar um _fork_ do plugin com base na versão  mais recente da API do [Facebook, 4]( https://github.com/jeduan/cordova-plugin-facebook4). Ele possui suporte para o Android 6 e 7.

. . .

- Caso possua versões 6 e 7 do Android é possível também _marcar_ a versão 5 como a plataforma escolhida para o projeto cordova ao adicionar a plataforma:

```
  cordova platform add android@5.1.1
```

### Instalação do plugin

- Para instalar o plugin.

. . .

No diretório do projeto, digitar o comando que inclui o plugin:

~~~
cordova -d plugin add phonegap-facebook-plugin --variable APP_ID="APP_ID" --variable APP_NAME="NOME_APP"
~~~

. . .

APP_ID

: É o ID gerado quando criada a aplicação, aparece logo de inicio na tela

NOME_APP

: É o nome que foi definido quando criado o app na sessão de desenvolvedor

Ambos são encontrados na pare de configurações da sessão do desenvolvedor.

## Avaliação do plugin

### Prós
- Não é necessário conhecimento sobre conexões remotas e todo seu funcionamento.
- É só usar os métodos disponíveis pela API.

### Contras
- O plugin é apegado a determinadas versões do Cordova.
- O plugin é apegado a determinadas versões do Android.
- Logo, não é possivel usar as versões independentes das coisas.
- Não é possivel usar a versão mais recente da API.
