/**
 * Rotas para operações relacionadas a Comunidades
 */

const express = require("express")
const comunidadeController = require("../controllers/comunidadeController")

const router = express.Router()

/**
 * @swagger
 * /api/comunidades:
 *   get:
 *     summary: Retorna todas as comunidades
 *     tags: [Comunidades]
 *     responses:
 *       200:
 *         description: Lista de comunidades
 */
router.get("/", comunidadeController.getAllComunidades)

/**
 * @swagger
 * /api/comunidades/{id}:
 *   get:
 *     summary: Retorna uma comunidade pelo ID
 *     tags: [Comunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da comunidade
 *       404:
 *         description: Comunidade não encontrada
 */
router.get("/:id", comunidadeController.getComunidadeById)

/**
 * @swagger
 * /api/comunidades:
 *   post:
 *     summary: Cria uma nova comunidade
 *     tags: [Comunidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - localizacao
 *             properties:
 *               nome:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataFundacao:
 *                 type: string
 *                 format: date
 *               metaSustentabilidade:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comunidade criada com sucesso
 */
router.post("/", comunidadeController.createComunidade)

/**
 * @swagger
 * /api/comunidades/{id}:
 *   put:
 *     summary: Atualiza uma comunidade existente
 *     tags: [Comunidades]
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
 *               nome:
 *                 type: string
 *               localizacao:
 *                 type: string
 *               descricao:
 *                 type: string
 *               dataFundacao:
 *                 type: string
 *                 format: date
 *               metaSustentabilidade:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comunidade atualizada com sucesso
 *       404:
 *         description: Comunidade não encontrada
 */
router.put("/:id", comunidadeController.updateComunidade)

/**
 * @swagger
 * /api/comunidades/{id}:
 *   delete:
 *     summary: Remove uma comunidade
 *     tags: [Comunidades]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comunidade removida com sucesso
 *       404:
 *         description: Comunidade não encontrada
 */
router.delete("/:id", comunidadeController.deleteComunidade)

module.exports = router
