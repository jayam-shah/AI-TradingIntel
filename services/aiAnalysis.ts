import OpenAI from "openai";
import { CompanyOverview, StockQuote } from '@shared/schema';

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || ""
});

export interface AIAnalysisResult {
  riskScore: number;
  analysis: string;
  competitors: string[];
  managementTeam: Array<{
    name: string;
    position: string;
    background: string;
  }>;
  growthPotential: Array<{
    category: string;
    description: string;
    type: 'positive' | 'neutral' | 'negative';
  }>;
  risks: Array<{
    category: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
  }>;
}

export class AIAnalysisService {
  async analyzeCompany(
    quote: StockQuote,
    overview: CompanyOverview,
    news: Array<{ title: string; summary: string; date: string; sentiment: string }>
  ): Promise<AIAnalysisResult> {
    if (!openai.apiKey) {
      throw new Error('OpenAI API key is required for AI analysis');
    }

    const prompt = `
    Analyze the following company and provide a comprehensive investment analysis in JSON format:

    Company: ${overview.name} (${overview.symbol})
    Current Price: $${quote.price}
    Change: ${quote.change} (${quote.changePercent}%)
    Market Cap: ${overview.marketCapitalization}
    Industry: ${overview.industry}
    Sector: ${overview.sector}
    P/E Ratio: ${overview.peRatio}
    EPS: ${overview.eps}
    Revenue TTM: ${overview.revenueTTM}
    Profit Margin: ${overview.profitMargin}
    Dividend Yield: ${overview.dividendYield}
    Description: ${overview.description}

    Recent News Headlines:
    ${news.map(item => `- ${item.title}: ${item.summary}`).join('\n')}

    Provide analysis in this exact JSON format:
    {
      "riskScore": <number between 1-10, where 1 is lowest risk and 10 is highest risk>,
      "analysis": "<comprehensive analysis summary in 2-3 paragraphs>",
      "competitors": ["<competitor1>", "<competitor2>", "<competitor3>"],
      "managementTeam": [
        {
          "name": "<CEO name>",
          "position": "CEO",
          "background": "<brief background and track record>"
        },
        {
          "name": "<CFO name>",
          "position": "CFO", 
          "background": "<brief background and track record>"
        }
      ],
      "growthPotential": [
        {
          "category": "<category name>",
          "description": "<description>",
          "type": "<positive/neutral/negative>"
        }
      ],
      "risks": [
        {
          "category": "<risk category>",
          "description": "<risk description>",
          "severity": "<low/medium/high>"
        }
      ]
    }

    Focus on:
    - Financial health and sustainability
    - Market position and competitive advantages
    - Growth prospects and expansion opportunities
    - Key risks and challenges
    - Management quality and track record
    - Industry trends and outlook
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a professional financial analyst with expertise in stock analysis and investment research. Provide thorough, objective analysis based on the provided data."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 2000,
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      
      return {
        riskScore: Math.max(1, Math.min(10, result.riskScore || 5)),
        analysis: result.analysis || 'Analysis not available',
        competitors: result.competitors || [],
        managementTeam: result.managementTeam || [],
        growthPotential: result.growthPotential || [],
        risks: result.risks || []
      };
    } catch (error) {
      console.error('AI analysis error:', error);
      throw new Error('Failed to generate AI analysis');
    }
  }

  async enhanceNewsAnalysis(
    news: Array<{ title: string; summary: string; date: string; sentiment: string }>
  ): Promise<Array<{ title: string; summary: string; date: string; sentiment: 'positive' | 'neutral' | 'negative' }>> {
    if (!openai.apiKey || news.length === 0) {
      return news.map(item => ({
        ...item,
        sentiment: 'neutral' as const
      }));
    }

    const prompt = `
    Analyze the sentiment of these news articles and return them in JSON format:

    ${news.map((item, index) => `${index + 1}. Title: ${item.title}\nSummary: ${item.summary}`).join('\n\n')}

    Return JSON array with sentiment analysis:
    {
      "articles": [
        {
          "index": <article index>,
          "sentiment": "<positive/neutral/negative>"
        }
      ]
    }
    `;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: "You are a financial news sentiment analyzer. Classify each article as positive, neutral, or negative for stock performance."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        response_format: { type: "json_object" },
        max_tokens: 1000,
      });

      const result = JSON.parse(response.choices[0].message.content || '{"articles": []}');
      const sentiments = result.articles || [];

      return news.map((item, index) => {
        const sentimentData = sentiments.find((s: any) => s.index === index + 1);
        return {
          ...item,
          sentiment: (sentimentData?.sentiment || 'neutral') as 'positive' | 'neutral' | 'negative'
        };
      });
    } catch (error) {
      console.error('News sentiment analysis error:', error);
      return news.map(item => ({
        ...item,
        sentiment: 'neutral' as const
      }));
    }
  }
}

export const aiAnalysisService = new AIAnalysisService();
