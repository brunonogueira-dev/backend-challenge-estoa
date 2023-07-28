# Desafio Backend da Estoa

Esta é minha implementação do Desafio Backend da Estoa.

## Configuração do ambiente Docker

Primeiro, deve-se clonar o projeto usando o comando `git clone`.

Para rodar o ambiente, utilizei um container Docker, que pode ser configurado através do comando `docker compose up -d` (ou `docker-compose up -d`).

Ao executar o `docker compose`, ele automaticamente roda um script que configura o ambiente MySQL para uso da aplicação Node e roda a aplicação no ambiente `development`.

## Arquitetura

O projeto foi desenvolvido usando Node.js com TypeScript, e foi escolhido o framework Express para desenvolvimento da API. Para comunicar com o banco de dados, foi utilizado o Sequelize, e o banco de dados escolhido foi o MySQL.

O projeto está dividido em duas pastas principais:

1. A pasta `api`, responsável pelos controllers, interfaces, middlewares, serviços e rotas
2. A pasta `db`, responsável por conter os modelos utilizados, os script de migration e seed para criação e população das tabelas respectivamente, e o arquivo de configuração de conexão com o banco de dados.

A aplicação principal se encontra dentro do arquivo `index.ts`. Além disso, o projeto também conta com o uso do Swagger UI para documentação da API, e o mesmo pode ser acessado via `http://localhost:{sua_porta_aqui}/docs`

## Funcionalidades

A API tem como proposta disponibilizar as funcionalidades padrão de CRUD (Create, Read, Update, Delete) para as entidades de Usuário e Plano. Além disso, a entidade de Usuário possui duas funcionalidades adicionais: é possível pesquisar usuários através do nome e da data de criação.
Ao criar um usuário, ele recebe automaticamente o plano gratuito. Como adicional, foi feita uma implementação que não permite cadastrar mais de um usuário com o mesmo endereço de email.
