# Estoa Backend challenge

O objetivo do challenge é criar uma API REST contendo 3 entidades: Usuário, Plano e Assinatura

## Algumas regras
- Usuário possui nome, email, senha, tipo do usuário e data de criação(created_at);
- Toda assinatura, possui um usuário e um plano; (Relacionamento N:M);
- Todo plano possui nome, preço, período de expiração (em meses) e  data da criação;
- Toda assinatura possui id do plano, id do usuário, data da criação e data de expiração (data atual + período de expiração do plano); 
- As entidades Planos e Usuários devem ter as seguintes funções: Criar, Alterar, Listar (todos e por id) e deletar.
- Todo usuário ao ser cadastrado deve possuir a assinatura gratuita (30 dias gratuito).

## Requisitos

- Node.js;
- MySql;
- Utilize algum ORM, sendo um diferencial o uso do Sequelize;
- Cruds Obrigatórios (Usuário e Planos);
- Assinatura não precisa do Crud completo, mas seria um diferencial uma listagem de usuários contendo a assinatura dos mesmos;
- Defina os endpoints em um Swagger ou no ROUTES.md da sua aplicação;
- Coloque o SQL da aplicação no git


- Bônus:
    - Endpoints de filtros de Usuário por no nome e data de criação

## Diferenciais

- Achou o teste até aqui fácil? 
- Que tal adicionar um endpoints filtro de usuário por assinatura;
- Alterar a assinatura do usuário;
- Todos gostamos de códigos limpos e testáveis, certo? Teste sua aplicação e os componentes, esse será um grande diferencial.

## Critérios de avaliação

- O código será avaliado considerando: semântica, estruturação, legibilidade, tamanho, entre outros fatores.
- O histórico do `git` também será avaliado.
- Não esqueça da documentação, pois como iremos avaliar o seu trabalho se não for possível inicializar o projeto em nossas máquinas?
- Prazo máximo para entrega do teste 4 dias, não conseguiu terminar? Não tem problema, vamos avalizar o que foi feito, não se esqueça é melhor o feito do que o perfeito.