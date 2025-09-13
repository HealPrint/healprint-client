import OpenAI from 'openai';


// Initialize OpenAI client with OpenRouter configuration
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  defaultHeaders: {
    'HTTP-Referer': import.meta.env.VITE_SITE_URL,
    'X-Title': import.meta.env.VITE_SITE_NAME,
  },
  dangerouslyAllowBrowser: true, // Required for client-side usage
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  content: string;
  error?: string;
}

export class OpenAIService {
  static async sendMessage(
    messages: ChatMessage[],
    model: string = 'deepseek/deepseek-chat'
  ): Promise<ChatResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model,
        messages,
        temperature: 0.7,
        max_tokens: 2000,
      });

      const content = completion.choices[0]?.message?.content;
      
      if (!content) {
        throw new Error('No response content received');
      }

      return { content };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        content: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  static async processUserQuery(query: string): Promise<ChatResponse> {
    const systemPrompt = `You are HealPrint AI, an intelligent health diagnostic assistant that helps people understand the connection between their skin/hair symptoms and internal health issues. You specialize in:

1. Skin & Hair Analysis - Analyzing symptoms like acne, hair loss, rashes, dryness
2. Internal Health Connection - Linking external symptoms to potential internal causes (hormonal, nutritional, digestive, stress)
3. Wellness Guidance - Providing safe, holistic health recommendations
4. Product Safety - Recommending safe, natural alternatives to harsh chemicals
5. Medical Referrals - Suggesting when to seek professional medical help

Always provide compassionate, culturally-sensitive responses. Focus on preventative health and safe practices. When in doubt, recommend consulting healthcare professionals.`;

    const messages: ChatMessage[] = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: query }
    ];

    return this.sendMessage(messages);
  }
}