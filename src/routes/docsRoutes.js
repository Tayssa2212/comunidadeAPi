/**
 * Rotas para operações relacionadas à documentação
 */

const express = require("express")
const docsController = require("../controllers/docsController")

const router = express.Router()

/**
 * @swagger
 * /api/docs/info:
 *   get:
 *     summary: Retorna informações sobre a API
 *     tags: [Documentação]
 *     responses:
 *       200:
 *         description: Informações sobre a API
 */
router.get("/info", docsController.getApiInfo)

module.exports = router
