/**
 * Rotas para operações relacionadas a Moradores
 */

const express = require('express');
const moradorController = require('../controllers/moradoresController');

const router = express.Router();

/**
 * @swagger
 * /api/moradores:
 *   get:
 *     summary: Retorna todos os moradores
 *     tags: [Moradores]
 *     responses:
 *       200:
 *         description: Lista de moradores
 */
router.get('/', moradorController.getAllMoradores);

/**
 * @swagger
 * /api/moradores/{id}:
 *   get:
 *     summary: Retorna um morador pelo ID
 *     tags: [Moradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Detalhes do morador
 *       404:
 *         description: Morador não encontrado
 */
router.get('/:id', moradorController.getMoradorById);

/**
 * @swagger
 * /api/moradores:
 *   post:
 *     summary: Cria um novo morador
 *     tags: [Moradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - email
 *               - comunidadeId
 *             properties:
 *               nome:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               comunidadeId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Morador criado com sucesso
 *       404:
 *         description: Comunidade não encontrada
 */
router.post('/', moradorController.createMorador);

/**
 * @swagger
 * /api/moradores/{id}:
 *   put:
 *     summary: Atualiza um morador existente
 *     tags: [Moradores]
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
 *               email:
 *                 type: string
 *                 format: email
 *               telefone:
 *                 type: string
 *               dataNascimento:
 *                 type: string
 *                 format: date
 *               comunidadeId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Morador atualizado com sucesso
 *       404:
 *         description: Morador não encontrado ou Comunidade não encontrada
 */
router.put('/:id', moradorController.updateMorador);

/**
 * @swagger
 * /api/moradores/{id}:
 *   delete:
 *     summary: Remove um morador
 *     tags: [Moradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Morador removido com sucesso
 *       404:
 *         description: Morador não encontrado
 */
router.delete('/:id', moradorController.deleteMorador);

module.exports = router;
