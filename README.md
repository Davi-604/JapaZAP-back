# JapaZAP API ♨️ ㊗️  

## Projeto desenvolvido com:  

<div style="display:inline_block">
    <img align="center" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="NODE.JS">
    <img align="center" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TYPESCRIPT">
    <img align="center" src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" alt="PRISMA">
    <img align="center" src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="POSTGRESQL">
    <img align="center" src="https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white" alt="AWS">
    <img align="center" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="EXPRESS">
</div>  

---

## Descrição do Projeto 🚀  

A **API JapaZAP** é responsável por gerenciar todas as funcionalidades do backend para o sistema [JapaZAP](https://github.com/Davi-604/JapaZAP), incluindo:  

- **Gerenciamento de Produtos e Categorias**: Um sistema completo de CRUD que cuida dos produtos e categorias do restaurante.  
- **Manipulação de Imagens**: Upload, armazenamento e exclusão de imagens utilizando **AWS S3, Multer e Sharp**, garantindo performance e segurança para os arquivos.  
- **Integração com Frontend**: API RESTful que suporta toda a comunicação com o frontend do projeto.  
- **Autenticação Segura**: Middleware de autenticação do tipo **JWT** para proteger as rotas privadas.  

---

## Funcionalidades principais 🧾  

- **Gerenciamento de Produtos**:  
  - Adicione, edite e remova produtos.  
  - Faça upload de imagens para os produtos e salve os arquivos no **AWS S3**.  
  - Exclusão automática de imagens associadas ao produto quando ele é deletado.  

- **Gerenciamento de Categorias**:  
  - Criação e organização de categorias para se relacionar com os produtos.  
  - Funcionalidades de edição e exclusão.  

- **Manipulação de Imagens**:  
  - Upload de arquivos usando **Multer**.  
  - Armazenamento seguro em **AWS S3**.  
  - Imagens configuradas com **ACL pública** para facilitar o acesso no frontend.  

- **APIs RESTful**:  
  - Rotas bem definidas e organizadas para operações CRUD de produtos e categorias.  
  - Respostas bem estruturadas para facilitar a integração com o frontend.  

---

## Como executar o projeto 🖥️  

### Pré-requisitos:  

- Node.js (versão 16 ou superior).  
- Gerenciador de pacotes npm ou yarn.  
- Uma conta AWS configurada com acesso ao S3.  

### Passo a passo:  

1. Clone o repositório:
   
   ```bash  
   git clone https://github.com/seu-usuario/japazap-api.git
   ````
   <br/>
   
2. Instale as depedências:  
    ```bash  
    npm install
    ````
    <br/>
   
3. Configure as variáveis de ambiente no arquivo **.env**:  
    ```bash  
    NEXT_PUBLIC_API_URL=http://sua-api-url  
    ````
    <br/>

4. Execute as migrations do Prisma para configurar o banco de dados: 
    ```bash  
    npx prisma migrate dev    
    ````
    <br/>

5. Inicie o servidor rodando o código:  
    ```bash  
    npm run dev  
    ````
