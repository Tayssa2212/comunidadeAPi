# Endpoints da API

Esta página documenta os principais endpoints disponíveis na API de Comunidades Sustentáveis.

## Autenticação

*Nota: A autenticação será implementada em versões futuras.*

## Comunidades

### Listar todas as comunidades

```
GET /api/comunidades
```

**Resposta de Sucesso:**
```json
[
  {
    "id": 1,
    "nome": "Comunidade Verde",
    "localizacao": "São Paulo, SP",
    "descricao": "Comunidade focada em sustentabilidade urbana",
    "dataFundacao": "2022-01-15",
    "metaSustentabilidade": "Reduzir em 30% a emissão de CO2 até 2025",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  }
]
```

### Obter uma comunidade específica

```
GET /api/comunidades/:id
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "nome": "Comunidade Verde",
  "localizacao": "São Paulo, SP",
  "descricao": "Comunidade focada em sustentabilidade urbana",
  "dataFundacao": "2022-01-15",
  "metaSustentabilidade": "Reduzir em 30% a emissão de CO2 até 2025",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z",
  "moradores": [],
  "iniciativas": []
}
```

### Criar uma nova comunidade

```
POST /api/comunidades
```

**Corpo da Requisição:**
```json
{
  "nome": "Comunidade Verde",
  "localizacao": "São Paulo, SP",
  "descricao": "Comunidade focada em sustentabilidade urbana",
  "dataFundacao": "2022-01-15",
  "metaSustentabilidade": "Reduzir em 30% a emissão de CO2 até 2025"
}
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "nome": "Comunidade Verde",
  "localizacao": "São Paulo, SP",
  "descricao": "Comunidade focada em sustentabilidade urbana",
  "dataFundacao": "2022-01-15",
  "metaSustentabilidade": "Reduzir em 30% a emissão de CO2 até 2025",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "updatedAt": "2023-01-01T12:00:00.000Z"
}
```

### Atualizar uma comunidade

```
PUT /api/comunidades/:id
```

**Corpo da Requisição:**
```json
{
  "nome": "Comunidade Verde Atualizada",
  "metaSustentabilidade": "Reduzir em 40% a emissão de CO2 até 2025"
}
```

**Resposta de Sucesso:**
```json
{
  "id": 1,
  "nome": "Comunidade Verde Atualizada",
  "localizacao": "São Paulo, SP",
  "descricao": "Comunidade focada em sustentabilidade urbana",
  "dataFundacao": "2022-01-15",
  "metaSustentabilidade": "Reduzir em 40% a emissão de CO2 até 2025",
  "createdAt": "2023-01-01T12:00:00.000Z",
  "updatedAt": "2023-01-01T12:30:00.000Z"
}
```

### Remover uma comunidade

```
DELETE /api/comunidades/:id
```

**Resposta de Sucesso:**
```json
{
  "message": "Comunidade removida com sucesso"
}
```

## Moradores

### Listar todos os moradores

```
GET /api/moradores
```

### Obter um morador específico

```
GET /api/moradores/:id
```

### Criar um novo morador

```
POST /api/moradores
```

### Atualizar um morador

```
PUT /api/moradores/:id
```

### Remover um morador

```
DELETE /api/moradores/:id
```

## Iniciativas

### Listar todas as iniciativas

```
GET /api/iniciativas
```

### Obter uma iniciativa específica

```
GET /api/iniciativas/:id
```

### Criar uma nova iniciativa

```
POST /api/iniciativas
```

### Atualizar uma iniciativa

```
PUT /api/iniciativas/:id
```

### Remover uma iniciativa

```
DELETE /api/iniciativas/:id
```

## Métricas

### Listar todas as métricas

```
GET /api/metricas
```

### Obter uma métrica específica

```
GET /api/metricas/:id
```

### Criar uma nova métrica

```
POST /api/metricas
```

### Atualizar uma métrica

```
PUT /api/metricas/:id
```

### Remover uma métrica

```
DELETE /api/metricas/:id
```

## Dashboard

### Obter métricas consolidadas

```
GET /api/dashboard/metricas
```

**Resposta de Sucesso:**
```json
{
  "totalComunidades": 5,
  "totalMoradores": 120,
  "totalIniciativas": 25,
  "iniciativasPorCategoria": {
    "ENERGIA": 8,
    "AGUA": 5,
    "RESIDUOS": 7,
    "ALIMENTACAO": 3,
    "TRANSPORTE": 2
  },
  "iniciativasPorStatus": {
    "PLANEJADA": 5,
    "EM_ANDAMENTO": 15,
    "CONCLUIDA": 3,
    "CANCELADA": 2
  },
  "impactoEstimado": {
    "reducaoCO2": 1250,
    "economiaAgua": 25000,
    "residuosReciclados": 3500
  },
  "comunidadesAtivas": [
    {
      "id": 1,
      "nome": "Comunidade Verde",
      "totalIniciativas": 10
    },
    {
      "id": 3,
      "nome": "Eco Vila",
      "totalIniciativas": 8
    }
  ]
}
```
