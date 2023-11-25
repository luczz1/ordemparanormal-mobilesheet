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
- ✅ Sistema de carga (normal ou sobrepeso, sobrepeso -3 deslocamento)
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
  
## Tecnologias utilizadas:
- Angular com Ionic (frontend, adaptação e importação mobile)
- NodeJS com Express (backend)
- MySQL (banco de dados)

## Imagens

> [!NOTE]
> As imagens não representam todas as telas/funções presente no projeto.

<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/591530c4-8e75-4c0f-8399-1c71e8fd618e" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/e15e5058-e72f-4c20-895e-39715854640c" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/c587962c-ad3e-4d12-af7f-b45ecf1f41e0" style="width: 20%" />
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/9fd09fb0-0771-4cba-b08e-3a0d07fb9dac" style="width: 20%"/>
  </div>
  
<div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/e368d319-88ed-4814-97f3-43a55a53e10e" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/40b0ee26-dd03-4a16-9a96-d8c5d4482bc0" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/934fb4ce-8579-4a1c-bcea-988a0e27f30a" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/76d03004-3a39-4bdf-8478-7aaa3ef85b4e" style="width: 20%"/>
  </div>
  
  <div style="display: flex; flex-direction: row">
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/cfecf829-1c1c-45ed-bcc0-b041068d86d7" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/31c25b53-9cd3-43d3-af3a-f9f26f2e615c" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/2da44d5a-8a1f-40e5-82c1-669830a83a7d" style="width: 20%"/>
    <img src="https://github.com/luczz1/ordemparanormal-mobilesheet/assets/63828861/81827e1f-9bb5-4ce9-a672-0ac158f72e6b" style="width: 20%"/>
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







