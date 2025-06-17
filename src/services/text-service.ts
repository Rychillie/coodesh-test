import natural from 'natural';
import { removeStopwords } from 'stopword';
import { FrequentWord } from '../types';

const tokenizer = new natural.WordTokenizer();

/**
 * Conta o número de palavras em um texto
 */
export const countWords = (text: string): number => {
  const tokens = tokenizer.tokenize(text);
  return tokens?.length || 0; // Adicionado operador de coalescência nula
};

/**
 * Obtém as palavras mais frequentes em um texto
 */
export const getFrequentWords = (text: string, count: number = 5): FrequentWord[] => {
  // Tokenizar o texto
  const tokens = tokenizer.tokenize(text.toLowerCase()) || [];
  
  // Remover stopwords - corrigindo o tipo
  // @ts-ignore - Ignorando o erro de tipo para natural.stopwords.removeStopwords
  console.log("tokens: ", tokens);
  const filteredTokens = removeStopwords(tokens) || [];
  
  // Contar frequência
  const frequency: Record<string, number> = {};
  filteredTokens.forEach((word: string) => { // Adicionado tipo explícito
    frequency[word] = (frequency[word] || 0) + 1;
  });
  
  // Ordenar por frequência e retornar os N mais frequentes
  return Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([word, freq]) => ({ word, frequency: freq }));
};

/**
 * Busca um termo em um texto
 */
export const searchTermInText = (text: string, term: string): boolean => {
  const regex = new RegExp(`\\b${term}\\b`, 'i');
  return regex.test(text);
};