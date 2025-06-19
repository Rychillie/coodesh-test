import { NextFunction, Request, Response } from 'express';
import * as aiService from '../services/ai-service';
import * as textService from '../services/text-service';
import { TextAnalysis } from '../types';

// In-memory storage for the last analysis (could be replaced by SQLite)
let lastAnalysis: TextAnalysis | null = null;

/**
 * Analyzes a provided text
 */
export const analyzeText = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { text } = req.body;
    
    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Invalid or missing text' });
      return;
    }

    // Basic statistics analysis
    const wordCount = textService.countWords(text);
    const frequentWords = textService.getFrequentWords(text, 5);
    
    // Sentiment analysis using AI
    const sentiment = await aiService.analyzeSentiment(text);
    
    // Store result for later queries
    lastAnalysis = {
      text,
      wordCount,
      frequentWords,
      sentiment,
      timestamp: new Date()
    };
    
    // Return result
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
 * Searches for a term in the last analysis
 */
export const searchTerm = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const { term } = req.query;
    
    if (!term || typeof term !== 'string') {
      res.status(400).json({ error: 'Search term not provided' });
      return;
    }
    
    if (!lastAnalysis) {
      res.status(404).json({ error: 'No previous analysis found' });
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