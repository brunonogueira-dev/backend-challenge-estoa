<h1>Desafio Backend da Estoa</h1>

<h2>Instalação</h2>

Para clonar o projeto é necessário inserir o comando:
<ul>
    <li>git clone git@github.com:EduardoSimoess/backend-challenge-estoa.git.</li>
</ul>

Em seguida é necessário instalar as dependências do projeto localmente:
<ul>
    <li>npm i.</li>
</ul>

Também optei por utilizar o docker no design do projeto, por isso para subir os containers é necessário usar o comando:
<ul>
    <li>docker-compose up -d.</li>
</ul>

Os comando a seguir devem ser inseridos dentro do terminal do container “modelo”, para abri-lo use o comando:
<ul>
    <li>docker exec -it modelo bash.</li>
</ul>

Agora, afim de criar o banco de dados, as tabelas e támbem popula-las inserimos:
<ul>
    <li>npm run db:reset.</li>
</ul>

Por fim, parar iniciar a aplicação:
<ul>
    <li>npm start.</li>
</ul>

<h2>Desenvolvimento</h2>

O back-end foi desenvolvido utilizando Node.js e a linguagem escolhida foi o TypeScript, além disso optei por utilizar programação orientada a objetos na construção da API, o armazenamento de dados foi feito com MySQL2, Express e Sequelize.

Para melhor organização do projeto utilizei a arquitetura MSC. De modo que, a camada Model fica responsável pela integração com o banco de dados, a Service contém todas as lógicas de negócio utilizadas na aplicação e, por fim, a Controller fica responsável por passar o resultado das requisições.

<h2>Funcionalidades</h2>

<h3>Planos</h3>
Aqui podemos criar, atualizar, deletar e atualizar os planos. Além disso é possível pesquisar planos individualmente utilizando uma rota específica para o id de cada plano.

<h3>Usuários</h3>
As rotas de usuários tem as mesmas funcionalidades que as de planos, além delas também é possível filtrar os planos de acordo com o nome dos usuários e data em que eles foram criados.

Vale dizer que asim que um novo usuário é inserido no banco, também é criada uma assinatura relacionada a ele e o tipo do plano escolhido é "Gratuíto" como defalt.

Ao atualizar as informações do usuário é possível mudar o tipo do seu plano, uma vez que isso aconteça a tabela de assinaturas também tem seus respectivos campos atualizados.
