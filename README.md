# 🚀 Desafio Back-end da Estoa

Olá galera, bom, esse reade.me pode ficar um pouco extenso, desculpe...

Então, eu recebi o desafio quarta-feira (08/02) de manhã, acabei tendo muitas entrevista e um imprevisto aonde não consegui realizar o teste e confesso que caiu no esquecimento na quinta-feira (09/02) então, acabei fazendo hoje, desculpa.

# Packages:
- cors
- express
- mysql2
- sequelize

Em relação as versões, bom mesmo tendo alguns problemas com o modulo ES6 do node alguma versão especifica, consegui prosseguir fazendo de outra forma, então somente o básico já resolve `npm install --save {package}`.

# Handle:

O código em si não está dificil, não gosto de coisa muito bagunçada mas também estava com certo preguiça, então arrumei o código na medida do possivel.
<br>
Bom, data possui a conexão com o banco, model a estrutura do banco, as "classes" e a service são as apis em si.

    ├── README.md
    |   start.js
    └── src
        ├── model        
        ├── service        
        └── data 
    

# Database:

Em relação ao banco, syntax, .sql caso necessario me informe que eu adiciono ao diretorio raiz, mas sinceramente, não acho necessario já que fiz uso do ORM (Sequelize) então, é possivel obter o banco simplemente rodando, ainda sim. Eu coloquei o banco na azure então, você pode simplemente roda-lo sem se preocupar com o db. <img src="https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F997166573141905418.png&w=48&q=75" height="16" width="16"/>

# Observação

Bom, pensei em fazer um swagger para mostrar as rotas mas já perdi o limite de 14 dias free então, vai na print. Como eu não sabia como era para ser feito o uso dos parametros, usei 2 opções de 3. Sendo elas por: Body e usando o params, aqui no meu caso eu usei o postman, mas fique a vontade! <img src="https://discords.com/_next/image?url=https%3A%2F%2Fcdn.discordapp.com%2Femojis%2F997166573141905418.png&w=48&q=75" height="16" width="16"/>

Como foi solicitado as entidades plan e user possuem crud completo ou quase isso, me informe caso falte algo.

# Routes
Bom, eu fiz isso aqui de algumas formas, vou mostrar a seguir! 

**Rotas de consulta, não é necessario qualquer tipo de input:** [Desta forma](https://i.imgur.com/DadcqTO.png)

*Rotas aonde são necessario params:*
<!-- - `/users` -->
- `/user-search`
- `/plan-search`

- `/user-delete`
- `/plan-delete`

- `/user-update`
- `/plan-update`

**Rotas aonde é necessario incremento de body (json):** [Desta forma](https://i.imgur.com/0KmTzRI.png)

- `/user-add` - Rota para adiciona usúarios (body).
- `/plan-add` - Rota para adicionar plano (body).

**Rotas aonde são necessario params:** [Desta forma](https://i.imgur.com/Exf6Cm1.png)

- `/user-search` - Retorna um usúario específico
- `/plan-search` - Retorna um plano específico

- `/user-delete` - Deleta um usúario específico
- `/plan-delete` - Deleta um plano específico

- `/user-update` - Atualiza um usúario específico
- `/plan-update` - Atualiza um plano específico
