# N.O.V.A. - Ficha para Ordem Paranormal

### Sobre

Este projeto sem fins lucrativos foi desenvolvido especialmente para os fãs de Ordem Paranormal, com o intuito de proporcionar uma maneira conveniente e acessível de criar fichas de personagens.

>Ordem Paranormal é um produto de <a href="https://jamboeditora.com.br/" target="_blank">Jambô Editora</a> e seus respectivos criadores, todos os direitos reservados.


## Progresso

- ✅ Criação de personagem 
- ✅ Seleção/exclusão de personagem
- ✅ Visualização de personagem
- ✅ Editar pontos de vida/sanidade/esforço
- ✅ Atributos e perícias editáveis
- ✅ Rolagem de dados para um atributo, uma perícia ou uma perícia + atributo (dinâmicos com base nos pontos)
- ✅ Rolagem de dados personalizados
- ✅ Listar, adicionar, editar e excluir rituais e habilidades
- ✅ Sistema de inventário
- ✅ Editar informações do personagem (nex, deslocamento, etc.)
- ✅ Sistema de carga (normal ou sobrepeso)
- ✅ Atributos de combate (pontos de defesa, ataques, resistências, etc)
- ✅ Proficiências
- ✅ Tela de anotações, um bloco de texto com diversas opção de fonte, anexar imagem, cores, e +
- ✅ Tela de "sobre" da personagem, com infos da sua história, personalidade e objetivos
- ✅ Sistema de login
- ✅ Habilidades/perícias/proficiências/defesa automáticos com base na sua classe/trilha/origem
- ✅ Pontos de vida/sanidade/esforço automáticos com base nas suas escolhas
- ✅ Upload de imagens

### Adicionais

- ⌛ Painel do(a) mestre
- ⌛ Criação de campanhas
- ⌛ Homebrew
  
## Tecnologias utilizadas:
- Angular com Ionic (frontend, adaptação e importação mobile)
- NodeJS com Express (backend)
- MySQL (banco de dados)

## Imagens

> [!NOTE]
> As imagens não representam todas as telas/funções presente no projeto.

<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/0c1be251-0b75-4cd6-8d12-d8c603beba48" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/1384ea74-be77-409f-ad8e-e6342378ee44" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/c735839a-d84b-45a2-8826-b21ea5821c9e" style="width: 20%" />
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/d1a5fd1c-a84f-4832-9a86-ed36722e7cf1" style="width: 20%"/>
  </div>
  
<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/9776223e-8b6a-4a21-9e9c-85c7f7dff7cf" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/81d7a8af-f574-4538-b2c7-4e3c85ed0253" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/0963f892-e0c6-4a53-8870-fda5d2a2a2e5" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/fcffede0-a400-4de8-b562-c6c59fa982fc" style="width: 20%"/>
  </div>
  
  <div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/58dcb9f0-c59b-4b61-aee3-f983ba910761" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/1c0f4de2-9c5f-47fa-a3d1-a159659b808e" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/25c2578c-2a95-46bb-88c1-86e25d9193d8" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/4dc79b6f-e5d2-44bd-a643-fb02a1c17a8a" style="width: 20%"/>
  </div>

  ## Backend do projeto
  Clone o backend do projeto aqui: https://github.com/luczz1/ordemparanormal-api
  
  ## Download tabelas do banco de dados
  Caso você queira rodar o projeto, precisará do banco de dados, abaixo estarei disponibilizando as tabelas, é só criar um banco de dados e importar essas tabelas.
  O nome de seu banco de dados deverá ser 'ordem-sheet', caso queira outro, terá que mudar o nome no connection.js (no backend), lembre-se de no connection.js também mudar o host, user
  e password de acordo com as credenciais do seu banco.

  Download: [Dump20231120.zip](https://github.com/luczz1/ordemparanormal-mobilesheet/files/13420143/Dump20231120.zip)

  ## Iniciando o projeto
  Você precisará ter instalado o node (abra o site e faça o download).
  Com o node instalado, abra o cmd e digite: ```npm install @ionic/cli```

  No projeto backend, abra-o e digite ```npm i```, e depois ```npm run server``` para iniciar a api. (ceritifique-se de ter configurado o banco de dados)

  Deixe a api rodando e volte ao frontend.

  Abra o projeto, em seguida abra o terminal do editor de código e digite ```npm install``` para instalar as depêndencias.
  E para iniciar o projeto de fato, digite ```ionic s``` para começar a rodá-lo.







