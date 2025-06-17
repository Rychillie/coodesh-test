export interface FrequentWord {
  word: string;
  frequency: number;
}

export interface TextAnalysis {
  text: string;
  wordCount: number;
  frequentWords: FrequentWord[];
  sentiment: string;
  timestamp: Date;
}

export interface AnalysisResponse {
  wordCount: number;
  frequentWords: FrequentWord[];
  sentiment: string;
}

export interface SearchResponse {
  term: string;
  found: boolean;
  lastAnalysisTime: Date;
}