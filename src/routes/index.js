/**
 * Arquivo de configuração de rotas da API
 */

const express = require("express")
const comunidadeRoutes = require("./comunidadeRoutes")
const moradorRoutes = require("./moradorRoutes")
const iniciativaRoutes = require("./iniciativaRoutes")
const metricaRoutes = require("./metricaRoutes")
const dashboardRoutes = require("./dashboardRoutes")
const docsRoutes = require("./docsRoutes")

const router = express.Router()

// Rotas da API
router.use("/comunidades", comunidadeRoutes)
router.use("/moradores", moradorRoutes)
router.use("/iniciativas", iniciativaRoutes)
router.use("/metricas", metricaRoutes)
router.use("/dashboard", dashboardRoutes)
router.use("/docs", docsRoutes)

// Rota para verificar o status da API
router.get("/status", (req, res) => {
  res.json({
    status: "online",
    timestamp: new Date().toISOString(),
  })
})

module.exports = router
