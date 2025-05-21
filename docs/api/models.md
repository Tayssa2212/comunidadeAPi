# Modelos de Dados

Esta página documenta os principais modelos de dados utilizados na API de Comunidades Sustentáveis.

## Comunidade

Representa uma comunidade sustentável.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Identificador único da comunidade |
| nome | String | Nome da comunidade |
| localizacao | String | Localização geográfica da comunidade |
| descricao | Text | Descrição detalhada da comunidade |
| dataFundacao | Date | Data de fundação da comunidade |
| metaSustentabilidade | Text | Metas de sustentabilidade da comunidade |
| createdAt | DateTime | Data de criação do registro |
| updatedAt | DateTime | Data da última atualização do registro |

## Morador

Representa um morador de uma comunidade sustentável.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Identificador único do morador |
| nome | String | Nome completo do morador |
| email | String | Email do morador (único) |
| telefone | String | Número de telefone do morador |
| dataNascimento | Date | Data de nascimento do morador |
| comunidadeId | Integer | ID da comunidade à qual o morador pertence |
| createdAt | DateTime | Data de criação do registro |
| updatedAt | DateTime | Data da última atualização do registro |

## Iniciativa

Representa uma iniciativa sustentável dentro de uma comunidade.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Identificador único da iniciativa |
| titulo | String | Título da iniciativa |
| descricao | Text | Descrição detalhada da iniciativa |
| categoria | Enum | Categoria da iniciativa (ENERGIA, AGUA, RESIDUOS, ALIMENTACAO, TRANSPORTE, OUTRO) |
| dataInicio | Date | Data de início da iniciativa |
| dataFim | Date | Data de término da iniciativa |
| status | Enum | Status da iniciativa (PLANEJADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA) |
| comunidadeId | Integer | ID da comunidade à qual a iniciativa pertence |
| responsavelId | Integer | ID do morador responsável pela iniciativa |
| createdAt | DateTime | Data de criação do registro |
| updatedAt | DateTime | Data da última atualização do registro |

## Métrica

Representa uma métrica de impacto ambiental de uma iniciativa.

| Campo | Tipo | Descrição |
|-------|------|-----------|
| id | Integer | Identificador único da métrica |
| iniciativaId | Integer | ID da iniciativa à qual a métrica está associada |
| tipo | String | Tipo da métrica (ex: reducaoCO2, economiaAgua, residuosReciclados) |
| valor | Float | Valor numérico da métrica |
| unidade | String | Unidade de medida (ex: kg, litros, kWh) |
| dataRegistro | DateTime | Data em que a métrica foi registrada |
| createdAt | DateTime | Data de criação do registro |
| updatedAt | DateTime | Data da última atualização do registro |

## Relacionamentos

### Comunidade - Morador
- Uma comunidade pode ter muitos moradores
- Um morador pertence a uma comunidade

### Comunidade - Iniciativa
- Uma comunidade pode ter muitas iniciativas
- Uma iniciativa pertence a uma comunidade

### Morador - Iniciativa
- Um morador pode ser responsável por muitas iniciativas
- Uma iniciativa tem um morador responsável

### Iniciativa - Métrica
- Uma iniciativa pode ter muitas métricas
- Uma métrica pertence a uma iniciativa
