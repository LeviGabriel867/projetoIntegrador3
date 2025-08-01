### ChefControl
## Figma: https://www.figma.com/design/fsmEQ2bmZ5WYFDGjSioQ7R/Projeto-Integrador-3?node-id=102-2&t=MJT5FRABg9hxFol1-1
## Descrição do Projeto

O ChefControl é uma aplicação web completa, desenvolvida com React no frontend e Node.js no backend, para gerenciar pedidos em um ambiente de restaurante de forma eficiente. O sistema permite a criação e visualização de pedidos em tempo real por garçons e oferece um painel administrativo para gerenciamento de colaboradores. A aplicação é totalmente containerizada usando Docker para facilitar o desenvolvimento, implantação e escalabilidade.

## Principais Funcionalidades

* *Gestão de Pedidos:* Garçons podem criar novos pedidos, que são exibidos em tempo real em um painel de visualização.
* *Atualização de Status:* Os pedidos podem ter seu status atualizado (ex: "Em Espera", "Preparando", "Finalizado").
* *Comunicação em Tempo Real:* Utiliza Server-Sent Events (SSE) para notificar automaticamente o frontend sobre atualizações de pedidos, garantindo que o painel de pedidos esteja sempre sincronizado.
* *Autenticação de Usuários:* Sistema de login com autenticação baseada em JWT, suportando diferentes níveis de acesso (admin e garcom).
* *Controle de Acesso:* Rotas protegidas que garantem que apenas usuários com as permissões corretas possam acessar determinadas páginas (ex: apenas admin pode gerenciar funcionários).
* *Gerenciamento de Colaboradores:* Administradores podem registrar novos funcionários com diferentes funções (ex: garcom, admin).

## Tecnologias Utilizadas

*Frontend*
* *Framework:* React
* *Build Tool:* Vite
* *Gerenciamento de Rotas:* React Router DOM
* *Estilização:* CSS

*Backend*
* *Ambiente de Execução:* Node.js
* *Framework:* Express.js
* *Banco de Dados:* MongoDB
* *ORM:* Mongoose
* *Autenticação:* JSON Web Tokens (JWT), bcrypt.js
* *Arquitetura:* Clean Architecture (padrão de camadas: Domain, Use Cases, Infrastructure)

*Infraestrutura e Ferramentas*
* *Containerização:* Docker e Docker Compose
* *Servidor Web (Produção):* Nginx
* *Package Manager:* npm
* *Comunicação em Tempo Real:* WebSockets.

## Como Iniciar o Projeto (Desenvolvimento)

1.  *Pré-requisitos:* Certifique-se de ter o Docker e Docker Compose instalados em sua máquina.

2.  *Clone o repositório:*
    bash
    git clone [https://github.com/levigabriel867/projetointegrador3.git](https://github.com/levigabriel867/projetointegrador3.git)
    cd projetointegrador3
    

3.  *Configurar variáveis de ambiente:*
    O arquivo docker-compose.yml já configura o backend para se conectar a um container MongoDB. O frontend utiliza a variável VITE_API_URL que é configurada no vite.config.js e no arquivo .env para a URL do backend.
    
    frontEnd/chefControl/.env
    
    VITE_API_URL=http://localhost:3000
    

4.  *Inicie os containers:*
    bash
    docker-compose up --build
    
    Este comando irá:
    * Construir e iniciar o container mongo.
    * Construir e iniciar o container backend, que irá rodar em http://localhost:3000.
    * Construir e iniciar o container frontend em modo de desenvolvimento, que irá rodar em http://localhost:5173.

5.  *Acesse a aplicação:*
    Abra seu navegador e navegue para http://localhost:5173.

## Como Iniciar o Projeto (Produção)

1.  *Construa o projeto:*
    O docker-compose.prod.yml usa os Dockerfile do frontend e backend para construir as imagens de produção.
    * O Dockerfile do frontend constrói o projeto com Vite (npm run build) e o serve usando um container Nginx.
    * O Dockerfile do backend constrói a imagem e a executa.

2.  *Configurar variáveis de ambiente:*
    O arquivo docker-compose.prod.yml espera que você defina a variável MONGO_URI no seu ambiente. Você pode fazer isso criando um arquivo .env na raiz do projeto (fora das pastas frontEnd e backEnd).
    
    /.env
    
    MONGO_URI=<sua_uri_de_producao_do_mongodb>
    

3.  *Inicie os containers de produção:*
    bash
    docker-compose -f docker-compose.prod.yml up --build -d
    
    Este comando irá iniciar a aplicação em modo de produção. O frontend estará disponível na porta 4000.

## Informações Adicionais

* *Chave Secreta JWT:* A chave secreta usada para assinar os tokens JWT está hardcoded como 'SEU_SEGREDO_SUPER_SECRETO_AQUI' nos arquivos authMiddleware.js e LoginUser.js. Em um ambiente de produção, é *altamente recomendável* que esta chave seja armazenada de forma segura em uma variável de ambiente e nunca seja exposta no código-fonte.
