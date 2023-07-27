# Desafio Backend da Estoa

Sou Guilherme Vargas de Andrade e aqui esta o desafio mandado pela Estoa do seu processo de contratação.


## Primeiros passos

Assim que abri o projeto siga esses passos:

1- Altere o arquivo (`.env.example`) para os seus dados do banco de dados (Preferencial mySQL), e altere o nome do arquivo para (`.env`).
2- Apos alterado o arquivo  execute o comando (`npm run db:reset`) em seu terminal para iniciar o banco de dados.
3- Em seguida use o comando (`npm run dev`) em seu terminal para iniciar o servidor.

## Rotas de Users

GET (`/users`) Para verificar todos os usuarios.
GET (`/user/:id`) Para verificar determinado usuario pelo seu ID.
POST (`/register`) Para registrar um novo usuario.
PUT (`/user/:id`) Para fazer alteração nos dados do usuario.
DELETE (`/delUser/:id`) Para deletar determinado Usuario.

## Rotas de Planos

GET (`/plans`) Para verificar todos os Planos.
GET (`/plan/:id`) Para verificar determinado Plano pelo seu ID.
POST (`/create`) Para criar um novo Plano.
PUT (`/plan/:id`) Para fazer alteração nos dados do Plano.
DELETE (`/delPlan/:id`) Para deletar determinado Plano.

## Rotas de Assinaturas

GET (`/signature`) Para verificar todas as Assinaturas.
GET (`/signature/:id`) Para verificar determinada Assinatura pelo seu ID.
POST (`/sing`) Para registrar uma nova Assinatura.
DELETE (`/delUser/:id`) Para deletar determinada Assinatura.


## Alguns JSON para utilizar

**Cadatrar Usuario**
{
	"name": "Joaozinho",
	"email": "joaozinho@gmail.com",
	"password": "123456789",
	"typeUser": "Gratis"
}

**Cadatrar Plano**
{
	"name": "vip",
	"price": 20,
	"expiryPeriod": 20
}

**Cadatrar Plano**
{
	"userId": 1,
	"planId":1
}

## Finalizando

Agradeço desde ja pela oportunidade de estar realizando esse teste!

**Obrigado!**