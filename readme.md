# DEV in Knowledge

<div align='center'>
<img height='100px' src='./images/Logo.png'>
</div>

<br>

Gerencie seus "**knowledges**" (dicas, curiosidades, conteúdos, explicações, etc.) sobre a área de TI.

Cada **knowledge** adicionado pode conter até 5 informações fornecidas pelo usuário:


- Título<br>
- Linguagem/Skill<br>
- Categoria<br>
- Descrição<br>
- Vídeo do Youtube (opcional)  

<br>

## It's LIVE

Experimente o app [online](https://devin-knowledge.herokuapp.com/)!

<br>

## Funcionalidades

A aplicação permite:

- Salvar novo **knowledge**
- Editar **knowledge**
- Exluir **knowledge**
- Filtrar lista de "**knowledges**" buscando por título e descrição

![App](./images/App.png)

<br>

## Modo Edição

Três características indicam que a aplicação está em **modo edição**.

- Cor no formulário e no botão de edição do **knowledge** que está sendo editado
- Título do formulário passa a informar "**Editando**"
- Formulário passa a exibit botão **Cancelar** ao invés de Limpar

![Modo edição](./images/Modo%20Edi%C3%A7%C3%A3o.png)

<br>

## Toasts

Avisos de sucesso nas operações de criação, edição ou exclusão de um **knowledge** aparecem no canto superior direito da tela, na forma de "**toasts**".

<div align='center'>
<img height='200px' src='./images/Toast.png'>
</div>

<br>

O mesmo sistema é utilizado para informar a quantidade de itens encontrados ao utilizar a barra de pesquisa para filtrar os "**knowledges**".

<div align='center'>
<img height='220px' src='./images/Toast filtro.png'>
</div>

<br>

## Filtro

Botão de limpar filtro indica a quantidade de "**knowledges**" atualmente filtrados pelo valor digitado no campo de busca (2, no exemplo abaixo).

![filtro](./images/Filtro.png)

<br>

## Confirmação de exclusão

Um modal de confirmação gera uma **Promise** que será resolvida quando o usuário confirmar a exclusão ou rejeitada caso ele cancele.

O cancelamento pode ser realizado clicando no botão **cancelar** ou simplesmente clicando "fora" do modal.

<div align='center'>
<img height='250px' src='./images/Exclusão.png'>
</div>

<br>

## Rodando a aplicação*

Após baixar os arquivos do repositório, instale as dependências rodando o comando:

```
npm install
```

Rode a aplicação através do comando:
```
npm start
```

Dirija-se ao endereço ```localhost:3000``` para utilizar a aplicação.

#### * necessário ter o [Node.js](https://nodejs.org/en/) instalado.