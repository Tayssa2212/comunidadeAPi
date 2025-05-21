# 🌱 API de Comunidades Sustentáveis

API para **gestão de comunidades e iniciativas sustentáveis**, desenvolvida com Node.js, Express e Sequelize. Ela permite o registro de moradores, ações sustentáveis e métricas de impacto ambiental para fomentar a sustentabilidade em nível local.

## 📌 Objetivo

Promover o engajamento em práticas sustentáveis dentro de comunidades, facilitando a organização, o monitoramento e a análise de iniciativas ecológicas.

---

## 🛠 Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** (ORM)
- **PostgreSQL**
- **Jest** (Testes)
- **Swagger** (Documentação da API)
- **Winston** (Logs)
- **MkDocs** (Documentação do Projeto)

---

## 📁 Estrutura do Projeto

```
comunidade-sustentavel/
├── server.js
├── package.json
├── logs/
├── src/
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── docs/
├── __tests__/
└── docs/
```

---

## 🚀 Instalação

```bash
git clone https://github.com/kauecalixto/comunidadeAPi.git
cd comunidadeAPi
npm install
```

Crie um arquivo `.env` com base no `.env.example`.

### Iniciar o servidor:

```bash
npm start
```

### Desenvolvimento com recarga automática:

```bash
npm run dev
```

---

## 📚 Endpoints da API

### 📦 Comunidades

| Método | Rota                      | Descrição                         |
|--------|---------------------------|-----------------------------------|
| GET    | `/api/comunidades`        | Lista todas as comunidades        |
| GET    | `/api/comunidades/:id`    | Detalha uma comunidade            |
| POST   | `/api/comunidades`        | Cria uma nova comunidade          |
| PUT    | `/api/comunidades/:id`    | Atualiza uma comunidade existente |
| DELETE | `/api/comunidades/:id`    | Remove uma comunidade             |

### 👥 Moradores

| Método | Rota                      | Descrição                     |
|--------|---------------------------|-------------------------------|
| GET    | `/api/moradores`          | Lista todos os moradores     |
| GET    | `/api/moradores/:id`      | Detalha um morador           |
| POST   | `/api/moradores`          | Cria um novo morador         |
| PUT    | `/api/moradores/:id`      | Atualiza um morador          |
| DELETE | `/api/moradores/:id`      | Remove um morador            |

### 🌿 Iniciativas Sustentáveis

| Método | Rota                      | Descrição                          |
|--------|---------------------------|------------------------------------|
| GET    | `/api/iniciativas`        | Lista todas as iniciativas         |
| GET    | `/api/iniciativas/:id`    | Detalha uma iniciativa             |
| POST   | `/api/iniciativas`        | Cria uma nova iniciativa           |
| PUT    | `/api/iniciativas/:id`    | Atualiza uma iniciativa existente  |
| DELETE | `/api/iniciativas/:id`    | Remove uma iniciativa              |

### 📈 Métricas Ambientais

| Método | Rota                      | Descrição                      |
|--------|---------------------------|--------------------------------|
| GET    | `/api/metricas`           | Lista todas as métricas        |
| GET    | `/api/metricas/:id`       | Detalha uma métrica            |
| POST   | `/api/metricas`           | Cria uma nova métrica          |
| PUT    | `/api/metricas/:id`       | Atualiza uma métrica existente |
| DELETE | `/api/metricas/:id`       | Remove uma métrica             |

### 📊 Dashboard

| Método | Rota                         | Descrição                            |
|--------|------------------------------|--------------------------------------|
| GET    | `/api/dashboard/metricas`    | Retorna métricas consolidadas        |

---

## 🧪 Testes

Para rodar os testes:

```bash
npm test
```

Com cobertura:

```bash
npm run test:coverage
```

---

## 📄 Documentação

### Swagger UI (API)

Acesse via navegador:  
📎 [`http://localhost:3000/api-docs`](http://localhost:3000/api-docs)

### MkDocs (Projeto)

```bash
npm run docs:dev
```

---

## 🌐 Hospedagem

- **API**: [https://comunidade-sustentavel-api.onrender.com](https://comunidade-sustentavel-api.onrender.com)
- **Banco de Dados**: PostgreSQL hospedado no **Neon.tech**

---

## 🤝 Contribuição

1. Faça um **fork** do repositório
2. Crie uma branch: `git checkout -b feature/sua-feature`
3. Commit: `git commit -m 'Descrição da feature'`
4. Push: `git push origin feature/sua-feature`
5. Abra um **Pull Request**

---

## 📜 Licença

Este projeto está licenciado sob a licença **MIT**. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
