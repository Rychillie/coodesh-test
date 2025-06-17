import express from 'express';
import * as textController from '../controllers/text-controller';

const router = express.Router();

// Rota para análise de texto
router.post('/analyze-text', textController.analyzeText);

// Rota opcional para busca de termo
router.get('/search-term', textController.searchTerm);

export default router;