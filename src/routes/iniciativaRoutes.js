/**
 * Rotas para operações relacionadas a Iniciativas
 */

const express = require("express")
const iniciativaController = require("../controllers/iniciativaController")

const router = express.Router()

/**
 * @swagger
 * /api/iniciativas:
 *   get:
 *     summary: Retorna todas as iniciativas
 *     tags: [Iniciativas]
 *     responses:
 *       200:
 *         description: Lista de iniciativas
 */
router.get("/", iniciativaController.getAllIniciativas)

/**
 * @swagger
 * /api/iniciativas/{id}:
 *   get:
 *     summary: Retorna uma iniciativa pelo ID
 *     tags: [Iniciativas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da iniciativa
 *       404:
 *         description: Iniciativa não encontrada
 */
router.get("/:id", iniciativaController.getIniciativaById)

/**
 * @swagger
 * /api/iniciativas:
 *   post:
 *     summary: Cria uma nova iniciativa
 *     tags: [Iniciativas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - categoria
 *               - status
 *               - comunidadeId
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [ENERGIA, AGUA, RESIDUOS, ALIMENTACAO, TRANSPORTE, OUTRO]
 *               dataInicio:
 *                 type: string
 *                 format: date
 *               dataFim:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PLANEJADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA]
 *               comunidadeId:
 *                 type: integer
 *               responsavelId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Iniciativa criada com sucesso
 *       404:
 *         description: Comunidade não encontrada ou Responsável não encontrado
 */
router.post("/", iniciativaController.createIniciativa)

/**
 * @swagger
 * /api/iniciativas/{id}:
 *   put:
 *     summary: Atualiza uma iniciativa existente
 *     tags: [Iniciativas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descricao:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [ENERGIA, AGUA, RESIDUOS, ALIMENTACAO, TRANSPORTE, OUTRO]
 *               dataInicio:
 *                 type: string
 *                 format: date
 *               dataFim:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [PLANEJADA, EM_ANDAMENTO, CONCLUIDA, CANCELADA]
 *               comunidadeId:
 *                 type: integer
 *               responsavelId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Iniciativa atualizada com sucesso
 *       404:
 *         description: Iniciativa não encontrada, Comunidade não encontrada ou Responsável não encontrado
 */
router.put("/:id", iniciativaController.updateIniciativa)

/**
 * @swagger
 * /api/iniciativas/{id}:
 *   delete:
 *     summary: Remove uma iniciativa
 *     tags: [Iniciativas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Iniciativa removida com sucesso
 *       404:
 *         description: Iniciativa não encontrada
 */
router.delete("/:id", iniciativaController.deleteIniciativa)

module.exports = router
