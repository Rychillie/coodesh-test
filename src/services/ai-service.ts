import OpenAI from "openai";

/**
 * Analyzes the sentiment of a text using the OpenAI API
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
          content: 'You are a sentiment analyzer. Analyze the sentiment of the provided text and respond only with one of the following categories: "positive", "negative", or "neutral", followed by a brief justification of up to 20 words.'
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 50
    });
    
    // Correct access to OpenAI response
    const sentiment = completion.choices[0]?.message?.content || 'Sentiment analysis failed';
    return sentiment;
    
  } catch (error) {
    console.error('Error analyzing sentiment:', error instanceof Error ? error.message : String(error));
    return 'Sentiment analysis failed';
  }
};