# HACKATHON FIAP

Este projeto foi desenvolvido para HackathonFIAP G23

## 🛠️ Tecnologias

- **Node.js**: Ambiente de execução JavaScript no servidor. [Node.js](https://nodejs.org/)
- **Express**: Framework para Node.js utilizado para construir a API e gerenciar rotas. [Express](https://expressjs.com/)
- **JWT (JSON Web Tokens)**: Mecanismo para autenticação e autorização segura. [JWT](https://jwt.io/)
- **bcryptjs**: Biblioteca para criptografia de senhas. [bcryptjs](https://github.com/dcodeIO/bcrypt.js)

## 🧩 Detalhes

- **Autenticação**: Utilizamos JWT para gerenciar autenticação e sessões dos usuários. 
- **Criptografia de Senha**: Usamos bcryptjs para criptografar e comparar senhas de forma segura.
- **Arquitetura Hexagonal**: Adotamos a arquitetura hexagonal (ou Ports and Adapters) para promover uma separação clara entre a lógica de negócios e os detalhes de implementação. Isso permite uma estrutura de código mais modular e facilitada para testes e manutenção

## 📚 Documentação

- [Node.js Documentation](https://nodejs.org/en/docs/)
- [Express Documentation](https://expressjs.com/en/4x/api.html)
- [JWT Documentation](https://jwt.io/introduction/)
- [bcryptjs Documentation](https://github.com/dcodeIO/bcrypt.js)


## 📁 Estrutura de Diretórios

Este projeto possui a seguinte estrutura de diretórios:

```plaintext
📁 adapters
|       
📁 application
|   📁 api
|   |   📁 middler
|   |   |       
|   |   📁 routes
|   |           
|   📁 core
|   |       
|   📁 exception
|           
📁 controllers
|        
📁 Diagramas
|       
📁 entity
|   📁 enum
|           
📁 external
|       
📁 gateway
|       
📁 interfaces
|          
📁 testes
|   📁 domain
|       📁 entity
|               
📁 types
|       
📁 useCase
```

## .ENV Variables

```bash
    MARIADB_HOST=maria-db-agendamento
    MARIADB_USER=root
    MARIADB_PASS=12345678
    MARIADB_DATABASE=projeto-agendamento
    MARIADB_PORT=3306
    PORT=3000
```
## 📊 Diagrama Entidade-Relacionamento

Aqui está o diagrama entidade-relacionamento (DER) do projeto:

<img src="https://github.com/FiapTechHackathon/Agendamento/blob/Init/Diagramas/DER.svg" alt="Diagrama Entidade-Relacionamento" width="800" />


## Data Base

Banco de dados do projeto é feito com MariaDB, dentro do arquivo de conexão com o banco de dados existe um processo no qual já é criado toda a base de dados assim que for executado o build do projeto.
Cada nova tabela desenvolvida DEVE ser adicionado o create no arquivo para que seja atualizado em todas as imagens.

```bash
  path: external/mariadbConnection.ts
  example:
  await db.query(`
         CREATE TABLE IF NOT EXISTS Usuario (
            ID INT PRIMARY KEY AUTO_INCREMENT,
            Senha VARCHAR(100) NOT NULL
        );

        ...
  `);
```

## Install Application

1. Docker DEVE estar instalado na sua maquina.

2. Baixar o Projeto na sua maquina

```bash
git clone https://github.com/FiapTechHackathon/Agendamento.git
```

3. Build Project
   `Para Criar o projeto digite o codigo abaixo no console`

```bash
docker-compose up -d --build

## Running tests

Aplicação realiza testes unitários com ...

```bash
    npm run test
```


## Videos



## Relatório RPID LGPD:
- [RPID LGPD]()

Rota para solicitação de exclusão de dados da plataforma:

>Adicionado um metodo POST  - /cliente/desabilitar.

[Rota adicionada](https://github.com/FiapTechHackathon/Agendamento/blob/main/application/api/routes/UsuariosDesabilitarRoutes.ts)

## AWS :: Componentes


## DATA ENGENERING :: Componentes

