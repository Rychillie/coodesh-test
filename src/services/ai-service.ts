import OpenAI from "openai";

/**
 * Analisa o sentimento de um texto usando a API da OpenAI
 */
export const analyzeSentiment = async (text: string): Promise<string> => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um analisador de sentimento. Analise o sentimento do texto fornecido e responda apenas com uma das seguintes categorias: "positivo", "negativo" ou "neutro", seguido de uma breve justificativa em até 20 palavras.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 50
    });
    
    // Acesso correto à resposta da OpenAI
    const sentiment = completion.choices[0]?.message?.content || 'Não foi possível analisar o sentimento';
    return sentiment;
    
  } catch (error) {
    console.error('Erro ao analisar sentimento:', error instanceof Error ? error.message : String(error));
    return 'Não foi possível analisar o sentimento';
  }
};