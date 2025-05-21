/**
 * Rotas para operações relacionadas a Métricas
 */

const express = require("express")
const metricaController = require("../controllers/metricaController")

const router = express.Router()

/**
 * @swagger
 * /api/metricas:
 *   get:
 *     summary: Retorna todas as métricas
 *     tags: [Métricas]
 *     responses:
 *       200:
 *         description: Lista de métricas
 */
router.get("/", metricaController.getAllMetricas)

/**
 * @swagger
 * /api/metricas/{id}:
 *   get:
 *     summary: Retorna uma métrica pelo ID
 *     tags: [Métricas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes da métrica
 *       404:
 *         description: Métrica não encontrada
 */
router.get("/:id", metricaController.getMetricaById)

/**
 * @swagger
 * /api/metricas:
 *   post:
 *     summary: Cria uma nova métrica
 *     tags: [Métricas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - iniciativaId
 *               - tipo
 *               - valor
 *               - unidade
 *             properties:
 *               iniciativaId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *               unidade:
 *                 type: string
 *               dataRegistro:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Métrica criada com sucesso
 *       404:
 *         description: Iniciativa não encontrada
 */
router.post("/", metricaController.createMetrica)

/**
 * @swagger
 * /api/metricas/{id}:
 *   put:
 *     summary: Atualiza uma métrica existente
 *     tags: [Métricas]
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
 *               iniciativaId:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               valor:
 *                 type: number
 *                 format: float
 *               unidade:
 *                 type: string
 *               dataRegistro:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Métrica atualizada com sucesso
 *       404:
 *         description: Métrica não encontrada ou Iniciativa não encontrada
 */
router.put("/:id", metricaController.updateMetrica)

/**
 * @swagger
 * /api/metricas/{id}:
 *   delete:
 *     summary: Remove uma métrica
 *     tags: [Métricas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Métrica removida com sucesso
 *       404:
 *         description: Métrica não encontrada
 */
router.delete("/:id", metricaController.deleteMetrica)

module.exports = router
