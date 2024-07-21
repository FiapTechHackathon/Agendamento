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

## Domain Driven Design
[Miro DDD](https://miro.com/app/board/uXjVKyVj5Tc=/)

## Relatório RPID LGPD:
- [RPID LGPD]()

Rota para solicitação de exclusão de dados da plataforma:

>Adicionado um metodo POST  - /cliente/desabilitar.

[Rota adicionada](https://github.com/FiapTechHackathon/Agendamento/blob/main/application/api/routes/UsuariosDesabilitarRoutes.ts)

## AWS :: Componentes
### Versão Completa
![AWS Componentes versão full](AWS%20-%20Componentes%20versão%20full.drawio.png)

#### SES
Adicionado o SES para envio de emails para confirmação de consulta e envio de link e Recusa da consulta ou qualquer outra notificação que sejamos realizar. O serviço tem um free tire de 50 mil envios antes de começar a ser cobrado.

#### S3 
Aqui adicionaremos os arquivos dos referentes ao prontuário médico de cada paciente, esse serviço em curta e longa escala se torna o mais barato quando se refere ao gerenciamento de arquivos, alem disso temos alta disponibilidade e uma segurança extra pois podemos configura-lo para que somente a aplicação tenha permissão de abrir e por um periodo de tempo.

#### Apigateway, lambda e cognito
Esse será nosso meio para autenticação do usuario, essa parte da aplicação optamos pela simplicidade do servless usando o lambda sendo acionado por uma apigateway, nela para termos mais seguraça pode adicionar algumas retrições de acesso ja predefinidas pela AWS e por ultimo o cognito para gerenciamento de usuario na aplicação, esse serviçon se torna barato e robusto ao mesmo tempo visto que só sera utilizado somente quando o usuario for logar no sistema.

#### Aurora e MYSQL
Iremos utilizar o Aurora com o MYSQL para guardar os dados e só sera possivel acessão pela VPC ou usando o Bastion para abrir acesso externo para usuários com perfil administrativo da empresa, o Aurora é usado para escalar horizontalmente o banco de dados de acordo com a demanda ou seja ele não aumentara o espaço em disco mais sim as CPUs para processar mais rapido a informação e assim nao gerando gargalo.

#### EKS, ECR
Será utilizado o EKS pois iremos criar varias aplicações tanto de back quando de front e com ele teremos a escalability necessária para gerenciamento de pods, assim garantindo a alta demanda de requisição. A principio elas terão configurações diferentes aplicação aonde iremos disponibilizar os serviços de prontuários, Consultas e Agendamento terá mais pods e mais CPU pois tendem a ser mais requisitadas.
Já a de medicos e pacientes terá uma configuração mais enxuta sendo possivel alterações se for preciso.

ECR iremos guardar as versões das imagens geradas em cada deploy.

#### VPC e Subnets 
Será configurada uma VPC e SUbnets para manter a aplicação em um ambiente seguro, a seguraça do servidor será garantida desta forma e somente usuários com autorização e aplicações poderão acessar os componentes dessa arquitetura.


### Versão MVP
![AWS Componentes versão full](AWS%20-%20Componentes%20versão%20mvp.drawio.png)

Uma Versão minimalista será criada para que possamos validar a aplicação como um todo, se será bem aceita no mercado e se estaremos no caminho certo.

A ideia será cria um monolito modularizado, com seus contextos bem separados para ficar mais simples e facil o estrangulamento e criar os microserços e foram descritos na versão mais robusta.
Foi pensando desta forma pelo primeiro investimento Health&Med não ser tão alto então o capacity para desenvolvimento teve que ser bem pensando e reduzido nessa primeira versão, logo assim será mais simples controlar e desenvolver a aplicação e colocar o mais rapido possivel no mercado para validar o negócio.

## DATA ENGENERING :: Componentes
![DATA ENGENERING](Data%20engenering.png)

Acima esta composto a nossa engenharia de banco de dados, como podemos ver teremos uma instancia de banco de dados Aurora e estaremos usando a engine do mysql para os cluster de bancos de dados.

Adicionei tambem o S3 pos podemos usar ele no sistema de armazenamento de dados, se por acaso em algum momento A Health&Med criar uma equipe de B.I sendo possivel assim criar um fluxo de DataWare House com o GLUE consultando dados de um BUCKET, esse processo será robusto e mais barato para a empresa.

### COMUNICAÇÃO ENTRE SERVIÇOS
![](Data%20engenering-Arquitetura%20de%20sincronização%20microservice.drawio.svg)

Adicionado o padrão saga pois temos alguns processos que vão exigir mais do software então foi decidido também usar o KAFKA para garantir que os serviços estejam conextados ao topico e que tambem executem com sucesso, em caso de erro será devolvida para a fila e feita a comunicação de falha, 
Nesse contexto o kafka será uma otima ferramenta para os processos mais pesados e deixa-los assim em segundo plano.

Será levantado um serviço para os subscribe executarem sem carregar o processamento do ambiente de produção dos endpoints, visto que essa prática é um dos topicos de boas praticas para serviços paralelos.


## Pipeline de CI.
Na Imagem esta sendo mostrado o Pipeline de DEV com testes automatizados e também com Sonar, no caso de DEV não enviamos requisição nenhuma para deploy, somente em MAIN que montamos no kubernets a nossa imagem.

[Ver o Arquivo da pipeline](https://github.com/FiapTechHackathon/Agendamento/blob/main/.github/workflows/main.yml)

![alt text](image.png)

## Pipeline de CD.


## QUALIDADE DE CODIGO PROJETO

[![SonarCloud](https://sonarcloud.io/images/project_badges/sonarcloud-white.svg)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FiapTechHackathon_Agendamento&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=FiapTechHackathon_Agendamento&metric=bugs)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=FiapTechHackathon_Agendamento&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=FiapTechHackathon_Agendamento&metric=coverage)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=FiapTechHackathon_Agendamento&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=FiapTechHackathon_Agendamento)