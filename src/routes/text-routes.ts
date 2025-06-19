/**
 * @swagger
 * /api/analyze-text:
 *   post:
 *     summary: Analisa um texto e retorna estatísticas e sentimento
 *     tags:
 *       - Análise de Texto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Seu texto aqui"
 *     responses:
 *       200:
 *         description: Resultado da análise
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 wordCount:
 *                   type: integer
 *                   example: 100
 *                 frequentWords:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       word:
 *                         type: string
 *                         example: "exemplo"
 *                       frequency:
 *                         type: integer
 *                         example: 5
 *                 sentiment:
 *                   type: string
 *                   example: "positivo"
 * /api/search-term:
 *   get:
 *     summary: Busca um termo no último texto analisado
 *     tags:
 *       - Análise de Texto
 *     parameters:
 *       - in: query
 *         name: term
 *         schema:
 *           type: string
 *         required: true
 *         description: Termo a ser buscado
 *     responses:
 *       200:
 *         description: Resultado da busca
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 term:
 *                   type: string
 *                   example: "exemplo"
 *                 found:
 *                   type: boolean
 *                   example: true
 *                 lastAnalysisTime:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-06-01T12:00:00.000Z"
 *       400:
 *         description: Termo de busca não fornecido
 *       404:
 *         description: Nenhuma análise prévia encontrada
 */

import express from 'express';
import * as textController from '../controllers/text-controller';

const router = express.Router();

// Rota para análise de texto
router.post('/analyze-text', textController.analyzeText);

// Rota opcional para busca de termo
router.get('/search-term', textController.searchTerm);

export default router;