import natural from 'natural';
import { removeStopwords } from 'stopword';
import { FrequentWord } from '../types';

const tokenizer = new natural.WordTokenizer();

/**
 * Counts the number of words in a text
 */
export const countWords = (text: string): number => {
  const tokens = tokenizer.tokenize(text);
  return tokens?.length || 0;
};

/**
 * Gets the most frequent words in a text
 */
export const getFrequentWords = (text: string, count: number = 5): FrequentWord[] => {
  // Tokenize the text
  const tokens = tokenizer.tokenize(text.toLowerCase()) || [];
  
  // Remove stopwords
  const filteredTokens = removeStopwords(tokens) || [];
  
  // Count frequency
  const frequency: Record<string, number> = {};
  filteredTokens.forEach((word: string) => {
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Sort by frequency and return the top N
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word, freq]) => ({ word, frequency: freq }));
};

/**
 * Searches for a term in a text
 */
export const searchTermInText = (text: string, term: string): boolean => {
  const regex = new RegExp(`\\b${term}\\b`, 'i');
  return regex.test(text);
};