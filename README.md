# Se Avexe Não Açaiteria - E-Commerce

![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

Um e-commerce web de açaí para a empresa Se Avexe Não Açaiteria. Este projeto conta com a integração do Stripe para pagamentos e do ViaCep para auto completar endereços.

## Sumário

- [Preparando Ambiente](#preparando-ambiente)
  - [Clonar Repositório](#clonar-repositório)
  - [Pré-Requisitos](#pré-requisitos)
  - [Váriaveis de Ambiente](#variáveis-de-ambiente)
  - [Instalar Dependências](#instalando-dependências)
  - [Criar Banco de Dados (Sem Docker)](#criar-banco-de-dados-caso-não-esteja-usando-docker)
  - [Adicionar Dados Fictícios para Testes (Sem Docker)](#adicionar-dados-fictícios-para-testes-sem-docker)
- [Executando a Aplicação](#executando-a-aplicação)
  - [Com Docker](#com-docker)
  - [Sem Docker](#sem-docker)

## Outras Documentações

- [Diagrama Relacional](docs/db/relational.dbml)

## Preparando Ambiente

Esta seção envolve todas instruções necessárias para configurar o ambiente do projeto.

### Clonar Repositório

```bash
git clone https://github.com/nicollasprado/avexe-nao.git
```

### Pré-Requisitos

- [Node.Js](https://nodejs.org/en/download/current)
- [Postgresql](https://www.postgresql.org/download/)
- [Docker](https://www.docker.com/) (Opcional)

### Variáveis de Ambiente

Copie o arquivo `.env.example`, renomeie para `.env` e edite as variáveis com as suas informações.

### Instalando Dependências

Execute o seguinte comando no diretório raiz do projeto:

```bash
pnpm install
```

### Criar Banco de Dados (Sem Docker)

1. Entre no terminal
2. Entre no cmd do postgres:

```bash
sudo psql -U postgres
```

3. Crie o banco de dados:

```bash
CREATE DATABASE avexe-nao;
```

### Adicionar Dados Fictícios para Testes (Sem Docker)

Execute o seguinte comando no diretório raiz do projeto:

```bash
npx prisma migrate dev
```

## Executando a Aplicação

Essa seção explica como executar a aplicação em modo de desenvolvimento tanto com docker quanto sem.

### Com Docker

1. Entre no diretório raiz do projeto;
2. Suba os containers:

```bash
docker-compose up -d
```

### Sem Docker

1. Entre no diretório raiz do projeto;
2. Rode a aplicação:

```bash
yarn dev
```
