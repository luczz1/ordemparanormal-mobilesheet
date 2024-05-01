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
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/8fd57d0b-72d1-4fd4-963b-01117271cc18" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/51921889-728f-4604-9988-95262cbb3115" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/15e3d932-6b57-428c-b664-ae6bc15a242a" style="width: 20%" />
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/76e55865-e4c7-4a75-a20c-97ea27f56107" style="width: 20%"/>
  </div>
  
<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/d04eab09-5532-41a3-8027-a1f7e8557027" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/09a29fd5-4a2a-4435-ba3e-3493a9bf1b80" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/f14307c8-8ef1-4acf-95e2-4a7fb6399f8c" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/7fc81035-10e2-4948-a2d9-f05330483356" style="width: 20%"/>
  </div>
  
  <div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/41193369-a866-4578-953a-05ae1a43a674" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/d196479c-44cd-4394-ad9f-34e7173e1edf" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/9d50dfd6-e63a-418e-8fb5-b11c883e5262" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/7094982e-f7e1-4432-86ca-d4e8c2f3567d" style="width: 20%"/>
  </div>

  ## Backend do projeto
  Clone o backend do projeto aqui: https://github.com/luczz1/ordemparanormal-api
  
  ## Download tabelas do banco de dados
  Caso você queira rodar o projeto, precisará do banco de dados, abaixo estarei disponibilizando as tabelas, é só criar um banco de dados e importar essas tabelas.
  O nome de seu banco de dados deverá ser 'ordem-sheet', caso queira outro, terá que mudar o nome no connection.js (no backend), lembre-se de no connection.js também mudar o host, user
  e password de acordo com as credenciais do seu banco.

  Download: [Dump20240428.zip](https://github.com/luczz1/ordemparanormal-mobilesheet/files/15142866/Dump20240428.zip)

  ## Iniciando o projeto
  Você precisará ter instalado o node (abra o site e faça o download).
  Com o node instalado, abra o cmd e digite: ```npm install @ionic/cli```

  No projeto backend, abra-o e digite ```npm i```, e depois ```npm run server``` para iniciar a api. (ceritifique-se de ter configurado o banco de dados)

  Deixe a api rodando e volte ao frontend.

  Abra o projeto, em seguida abra o terminal do editor de código e digite ```npm install``` para instalar as depêndencias.
  E para iniciar o projeto de fato, digite ```ionic s``` para começar a rodá-lo.







