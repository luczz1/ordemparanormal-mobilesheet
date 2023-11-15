# Ordem Paranormal - Ficha Mobile

### Sobre

Este projeto sem fins lucrativos foi desenvolvido especialmente para os fãs de Ordem Paranormal, com o intuito de proporcionar uma maneira conveniente e acessível de criar fichas de personagens.

>Ordem Paranormal é criada por Rafael Lange e todos os direitos da marca pertencem a ele.


## Progresso

- ✅ Criação de personagem 
- ✅ Seleção/exclusão de personagem
- ✅ Visualização de personagem
- ✅ Editar pontos de vida/sanidade/esforço
- ✅ Atributos e perícias editáveis
- ✅ Rolagem de dados para um atributo, uma perícia ou uma perícia + atributo (dinâmicos com base nos pontos)
- ✅ Rolagem de dados personalizados
- ✅ Listar, adicionar e excluir rituais e habilidades
- ✅ Sistema de inventário
- ✅ Editar informações do personagem (nex, deslocamento, etc.)
- ✅ Sistema de carga (normal ou sobrepeso, sobrepeso -3 deslocamento)
- ✅ Atributos de combate (pontos de defesa, ataques, resistências, etc)
- ✅ Proficiências
- ✅ Tela de anotações, um bloco de texto com diversas opção de fonte, anexar imagem, cores, e +
- ✅ Tela de "sobre" da personagem, com infos da sua história, personalidade e objetivos.
- ✅ Sistema de login

### Adicionais

- ⌛ Painel do(a) mestre
- ⌛ Atualização de dados em tempo real para o(a) mestre

## Tecnologias utilizadas:
- Angular com Ionic (frontend, adaptação e importação mobile)
- NodeJS com Express (backend)
- MySQL (banco de dados)

## Imagens

> [!NOTE]
> As imagens não representam todas as telas/funções presente no projeto.
> Elas também podem estar desatualizadas.

<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/44287f93-2725-4955-a736-d3cde88034c6" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/21354434-ea9c-40ad-be78-df7464a2a861" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/51dd6e6f-8976-4755-a2da-ce1b38fb9d7d" style="width: 20%" />
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/0f2303a1-2f87-4121-b2d6-66305f1d592e" style="width: 20%"/>
  </div>
  
<div style="display: flex; flex-direction: row">
    <img src=https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/9dc05f36-8933-4a00-922b-cfb7523c4638" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/04f9dc56-a1e8-4b73-82d7-1903b7e92964" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/8a7c1c98-db8e-40ef-a62a-4110ceeb1494" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/e77c58bf-5866-43b1-bc7e-888a50b921d0" style="width: 20%"/>
  </div>
  
  <div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/5b2ef618-008d-45fa-b47a-b97cbadb364f" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/d628263f-d055-4c4b-ac47-9ae59c8df852" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/a11976d7-cc60-4596-8ddd-f1e85a9cc076" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/3a81db23-a154-477f-978f-9554c6884dac" style="width: 20%"/>
  </div>

  ## Backend do projeto
  Clone o backend do projeto aqui: https://github.com/luczz1/ordemparanormal-api
  
  ## Download tabelas do banco de dados
  Caso você queira rodar o projeto, precisará do banco de dados, abaixo estarei disponibilizando as tabelas, é só criar um banco de dados e importar essas tabelas.
  O nome de seu banco de dados deverá ser 'ordem-sheet', caso queira outro, terá que mudar o nome no connection.js (no backend), lembre-se de no connection.js também mudar o host, user
  e password de acordo com as credenciais do seu banco.

  Download: [Dump20231115 (2).zip](https://github.com/luczz1/ordemparanormal-mobilesheet/files/13366269/Dump20231115.2.zip)

  ## Iniciando o projeto
  Você precisará ter instalado o node (abra o site e faça o download).
  Com o node instalado, abra o cmd e digite: ```npm install @ionic/cli```

  No projeto backend, abra-o e digite ```npm i```, e depois ```npm run server``` para iniciar a api. (ceritifique-se de ter configurado o banco de dados)

  Deixe a api rodando e volte ao frontend.

  Abra o projeto, em seguida abra o terminal do editor de código e digite ```npm install``` para instalar as depêndencias.
  E para iniciar o projeto de fato, digite ```ionic s``` para começar a rodá-lo.







