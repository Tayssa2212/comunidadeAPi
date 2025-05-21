/**
 * Rotas para operações relacionadas ao Dashboard
 */

const express = require("express")
const dashboardController = require("../controllers/dashboardController")

const router = express.Router()

/**
 * @swagger
 * /api/dashboard/metricas:
 *   get:
 *     summary: Retorna métricas consolidadas para o dashboard
 *     tags: [Dashboard]
 *     responses:
 *       200:
 *         description: Métricas consolidadas
 */
router.get("/metricas", dashboardController.getMetricasConsolidadas)

module.exports = router
