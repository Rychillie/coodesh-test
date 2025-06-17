import { NextFunction, Request, Response } from 'express';
import * as aiService from '../services/ai-service';
import * as textService from '../services/text-service';
import { TextAnalysis } from '../types';

// Armazenamento em memória para o histórico (poderia ser substituído por SQLite)
let lastAnalysis: TextAnalysis | null = null;

/**
 * Analisa um texto fornecido
 */
export const analyzeText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Texto inválido ou não fornecido' });
      return;
    }

    // Análise de estatísticas básicas
    const wordCount = textService.countWords(text);
    const frequentWords = textService.getFrequentWords(text, 5);
    
    // Análise de sentimento usando IA
    const sentiment = await aiService.analyzeSentiment(text);
    
    // Armazenar resultado para consulta posterior
    lastAnalysis = {
      text,
      wordCount,
      frequentWords,
      sentiment,
      timestamp: new Date()
    };
    
    // Retornar resultado
    res.status(200).json({
      wordCount,
      frequentWords,
      sentiment
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Busca um termo na última análise
 */
export const searchTerm = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { term } = req.query;
    
    if (!term || typeof term !== 'string') {
      res.status(400).json({ error: 'Termo de busca não fornecido' });
      return;
    }
    
    if (!lastAnalysis) {
      res.status(404).json({ error: 'Nenhuma análise prévia encontrada' });
      return;
    }
    
    const found = textService.searchTermInText(lastAnalysis.text, term);
    
    res.status(200).json({
      term,
      found,
      lastAnalysisTime: lastAnalysis.timestamp
    });
  } catch (error) {
    next(error);
  }
};