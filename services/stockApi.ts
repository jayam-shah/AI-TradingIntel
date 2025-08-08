import axios from 'axios';
import { CompanyOverview, StockQuote } from '@shared/schema';

const ALPHA_VANTAGE_API_KEY = process.env.ALPHA_VANTAGE_API_KEY || process.env.ALPHAVANTAGE_API_KEY || '';
const NEWS_API_KEY = process.env.NEWS_API_KEY || process.env.NEWSAPI_KEY || '';

interface AlphaVantageQuoteResponse {
  'Global Quote': {
    '01. symbol': string;
    '02. open': string;
    '03. high': string;
    '04. low': string;
    '05. price': string;
    '06. volume': string;
    '07. latest trading day': string;
    '08. previous close': string;
    '09. change': string;
    '10. change percent': string;
  };
}

interface AlphaVantageOverviewResponse {
  Symbol: string;
  Name: string;
  Description: string;
  Industry: string;
  Sector: string;
  MarketCapitalization: string;
  PERatio: string;
  PEGRatio: string;
  BookValue: string;
  EPS: string;
  RevenuePerShareTTM: string;
  ProfitMargin: string;
  OperatingMarginTTM: string;
  ReturnOnAssetsTTM: string;
  ReturnOnEquityTTM: string;
  RevenueTTM: string;
  GrossProfitTTM: string;
  DilutedEPSTTM: string;
  QuarterlyEarningsGrowthYOY: string;
  QuarterlyRevenueGrowthYOY: string;
  AnalystTargetPrice: string;
  TrailingPE: string;
  ForwardPE: string;
  PriceToSalesRatioTTM: string;
  PriceToBookRatio: string;
  EVToRevenue: string;
  EVToEBITDA: string;
  Beta: string;
  '52WeekHigh': string;
  '52WeekLow': string;
  '50DayMovingAverage': string;
  '200DayMovingAverage': string;
  SharesOutstanding: string;
  DividendDate: string;
  ExDividendDate: string;
  DividendPerShare: string;
  DividendYield: string;
  PayoutRatio: string;
  DividendPayoutRatio: string;
  LastSplitFactor: string;
  LastSplitDate: string;
}

interface NewsApiResponse {
  articles: Array<{
    title: string;
    description: string;
    publishedAt: string;
    source: {
      name: string;
    };
    url: string;
  }>;
}

export class StockApiService {
  private baseUrl = 'https://www.alphavantage.co/query';
  private newsBaseUrl = 'https://newsapi.org/v2/everything';

  async getStockQuote(symbol: string): Promise<StockQuote> {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is required');
    }

    const response = await axios.get<AlphaVantageQuoteResponse>(this.baseUrl, {
      params: {
        function: 'GLOBAL_QUOTE',
        symbol: symbol.toUpperCase(),
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const quote = response.data['Global Quote'];
    if (!quote) {
      throw new Error('Invalid stock symbol or API error');
    }

    const price = parseFloat(quote['05. price']);
    const change = parseFloat(quote['09. change']);
    const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));

    return {
      symbol: quote['01. symbol'],
      price,
      change,
      changePercent,
      volume: parseInt(quote['06. volume']),
    };
  }

  async getCompanyOverview(symbol: string): Promise<CompanyOverview> {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is required');
    }

    const response = await axios.get<AlphaVantageOverviewResponse>(this.baseUrl, {
      params: {
        function: 'OVERVIEW',
        symbol: symbol.toUpperCase(),
        apikey: ALPHA_VANTAGE_API_KEY,
      },
    });

    const overview = response.data;
    if (!overview.Symbol) {
      throw new Error('Invalid stock symbol or API error');
    }

    return {
      symbol: overview.Symbol,
      name: overview.Name,
      description: overview.Description,
      industry: overview.Industry,
      sector: overview.Sector,
      marketCapitalization: overview.MarketCapitalization,
      peRatio: overview.PERatio,
      pegRatio: overview.PEGRatio,
      bookValue: overview.BookValue,
      eps: overview.EPS,
      revenuePerShareTTM: overview.RevenuePerShareTTM,
      profitMargin: overview.ProfitMargin,
      operatingMarginTTM: overview.OperatingMarginTTM,
      returnOnAssetsTTM: overview.ReturnOnAssetsTTM,
      returnOnEquityTTM: overview.ReturnOnEquityTTM,
      revenueTTM: overview.RevenueTTM,
      grossProfitTTM: overview.GrossProfitTTM,
      dilutedEPSTTM: overview.DilutedEPSTTM,
      quarterlyEarningsGrowthYOY: overview.QuarterlyEarningsGrowthYOY,
      quarterlyRevenueGrowthYOY: overview.QuarterlyRevenueGrowthYOY,
      analystTargetPrice: overview.AnalystTargetPrice,
      trailingPE: overview.TrailingPE,
      forwardPE: overview.ForwardPE,
      priceToSalesRatioTTM: overview.PriceToSalesRatioTTM,
      priceToBookRatio: overview.PriceToBookRatio,
      evToRevenue: overview.EVToRevenue,
      evToEbitda: overview.EVToEBITDA,
      beta: overview.Beta,
      fiftyTwoWeekHigh: overview['52WeekHigh'],
      fiftyTwoWeekLow: overview['52WeekLow'],
      fiftyDayMovingAverage: overview['50DayMovingAverage'],
      twoHundredDayMovingAverage: overview['200DayMovingAverage'],
      sharesOutstanding: overview.SharesOutstanding,
      dividendDate: overview.DividendDate,
      exDividendDate: overview.ExDividendDate,
      dividendPerShare: overview.DividendPerShare,
      dividendYield: overview.DividendYield,
      payoutRatio: overview.PayoutRatio,
      dividendPayoutRatio: overview.DividendPayoutRatio,
      lastSplitFactor: overview.LastSplitFactor,
      lastSplitDate: overview.LastSplitDate,
    };
  }

  async getCompanyNews(symbol: string, companyName: string): Promise<Array<{
    title: string;
    summary: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>> {
    if (!NEWS_API_KEY) {
      // Return empty array if no news API key
      return [];
    }

    try {
      const response = await axios.get<NewsApiResponse>(this.newsBaseUrl, {
        params: {
          q: `${symbol} OR "${companyName}"`,
          sortBy: 'publishedAt',
          pageSize: 10,
          apiKey: NEWS_API_KEY,
        },
      });

      return response.data.articles.map(article => ({
        title: article.title,
        summary: article.description || '',
        date: article.publishedAt,
        sentiment: 'neutral' as const, // Basic sentiment - could be enhanced with AI
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  async searchCompanies(query: string): Promise<Array<{ symbol: string; name: string }>> {
    if (!ALPHA_VANTAGE_API_KEY) {
      throw new Error('Alpha Vantage API key is required');
    }

    try {
      const response = await axios.get(this.baseUrl, {
        params: {
          function: 'SYMBOL_SEARCH',
          keywords: query,
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      });

      const matches = response.data.bestMatches || [];
      return matches.slice(0, 10).map((match: any) => ({
        symbol: match['1. symbol'],
        name: match['2. name'],
      }));
    } catch (error) {
      console.error('Error searching companies:', error);
      return [];
    }
  }

  formatMarketCap(marketCap: string): string {
    if (!marketCap || marketCap === 'None') return 'N/A';
    
    const num = parseInt(marketCap);
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  }

  formatLargeNumber(value: string): string {
    if (!value || value === 'None') return 'N/A';
    
    const num = parseInt(value);
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`;
    }
    return `$${num.toLocaleString()}`;
  }
}

export const stockApiService = new StockApiService();
