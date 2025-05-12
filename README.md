# API de Comunidades Sustentáveis

API para gestão de comunidades e iniciativas sustentáveis, desenvolvida com Node.js, Express e Sequelize.

## Descrição

Esta API foi desenvolvida para gerenciar comunidades sustentáveis, permitindo o registro de moradores, iniciativas de sustentabilidade e métricas de impacto ambiental. O objetivo é promover a sustentabilidade em comunidades locais, facilitando a organização e o acompanhamento de ações que contribuem para um futuro mais sustentável.

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize ((ORM))
- PostgreSQL
- Jest (Testes)
- Swagger (Documentação da API)
- Winston (Logs)
- MkDocs (Documentação do projeto)

## Estrutura do Projeto

```
comunidade-sustentavel/
├── server.js                 # Ponto de entrada da aplicação
├── package.json              # Dependências e scripts
├── logs/                     # Diretório para arquivos de log
├── src/
│   ├── routes/               # Rotas da API
│   │   ├── index.js
│   │   ├── comunidadeRoutes.js
│   │   ├── moradorRoutes.js
│   │   ├── iniciativaRoutes.js
│   │   ├── metricaRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── docsRoutes.js
│   ├── controllers/          # Controladores
│   │   ├── comunidadeController.js
│   │   ├── moradoresController.js
│   │   ├── iniciativaController.js
│   │   ├── metricaController.js
│   │   ├── dashboardController.js
│   │   └── docsController.js
│   ├── models/               # Modelos do Sequelize
│   │   ├── index.js
│   │   ├── comunidadeModel.js
│   │   ├── moradorModel.js
│   │   ├── iniciativaModel.js
│   │   └── metricaModel.js
│   ├── middlewares/          # Middlewares
│   │   ├── loggerMiddleware.js
│   │   ├── corsMiddleware.js
│   │   └── errorMiddleware.js
│   ├── config/               # Configurações
│   │   ├── config.js
│   │   └── database.js
│   ├── utils/                # Utilitários
│   │   └── logger.js
│   └── docs/                 # Documentação da API
│       └── swagger.js
├── __tests__/                # Testes
│   ├── comunidade.test.js
│   ├── morador.test.js
│   ├── iniciativa.test.js
│   ├── metrica.test.js
│   └── dashboard.test.js
└── docs/                     # Documentação do projeto (MkDocs)
    ├── index.md
    └── api/
        ├── endpoints.md
        └── models.md
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/kauecalixto/comunidadeAPi.git
cd comunidadeAPi
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
Crie um arquivo `.env` na raiz do projeto com base no `.env.example`.

4. Inicie o servidor:
```bash
npm start
```

Para desenvolvimento com recarga automática:
```bash
npm run dev
```

## Endpoints da API

A API possui os seguintes endpoints principais:

### Comunidades
- `GET /api/comunidades` - Lista todas as comunidades
- `GET /api/comunidades/:id` - Obtém uma comunidade pelo ID
- `POST /api/comunidades` - Cria uma nova comunidade
- `PUT /api/comunidades/:id` - Atualiza uma comunidade
- `DELETE /api/comunidades/:id` - Remove uma comunidade

### Moradores
- `GET /api/moradores` - Lista todos os moradores
- `GET /api/moradores/:id` - Obtém um morador pelo ID
- `POST /api/moradores` - Cria um novo morador
- `PUT /api/moradores/:id` - Atualiza um morador
- `DELETE /api/moradores/:id` - Remove um morador

### Iniciativas
- `GET /api/iniciativas` - Lista todas as iniciativas
- `GET /api/iniciativas/:id` - Obtém uma iniciativa pelo ID
- `POST /api/iniciativas` - Cria uma nova iniciativa
- `PUT /api/iniciativas/:id` - Atualiza uma iniciativa
- `DELETE /api/iniciativas/:id` - Remove uma iniciativa

### Métricas
- `GET /api/metricas` - Lista todas as métricas
- `GET /api/metricas/:id` - Obtém uma métrica pelo ID
- `POST /api/metricas` - Cria uma nova métrica
- `PUT /api/metricas/:id` - Atualiza uma métrica
- `DELETE /api/metricas/:id` - Remove uma métrica

### Dashboard
- `GET /api/dashboard/metricas` - Obtém métricas consolidadas para o dashboard

## Documentação

A documentação da API está disponível através do Swagger UI:

```
http://localhost:3000/api-docs
```

A documentação do projeto está disponível através do MkDocs:

```bash
npm run docs:dev
```

## Testes

Para executar os testes:

```bash
npm test
```

Para executar os testes com cobertura:

```bash
npm run test:coverage
```

## Hospedagem

A API está hospedada no Render.com e pode ser acessada através do seguinte URL:

```
https://comunidade-sustentavel-api.onrender.com
```

O banco de dados PostgreSQL está hospedado no Neon.tech.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova feature'`)
4. Faça push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
