import { type StockAnalysis, type InsertStockAnalysis } from "@shared/schema";

// Storage interface for stock analysis data
export interface IStorage {
  getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined>;
  saveStockAnalysis(analysis: InsertStockAnalysis): Promise<StockAnalysis>;
  getWatchlist(): Promise<StockAnalysis[]>;
}

export class MemStorage implements IStorage {
  private stockAnalyses: Map<string, StockAnalysis>;
  private currentId: number;

  constructor() {
    this.stockAnalyses = new Map();
    this.currentId = 1;
  }

  async getStockAnalysis(symbol: string): Promise<StockAnalysis | undefined> {
    return this.stockAnalyses.get(symbol.toUpperCase());
  }

  async saveStockAnalysis(insertAnalysis: InsertStockAnalysis): Promise<StockAnalysis> {
    const id = this.currentId++;
    const analysis: StockAnalysis = {
      id,
      symbol: insertAnalysis.symbol,
      companyName: insertAnalysis.companyName,
      currentPrice: insertAnalysis.currentPrice || null,
      priceChange: insertAnalysis.priceChange || null,
      priceChangePercent: insertAnalysis.priceChangePercent || null,
      marketCap: insertAnalysis.marketCap || null,
      peRatio: insertAnalysis.peRatio || null,
      pegRatio: insertAnalysis.pegRatio || null,
      pbRatio: insertAnalysis.pbRatio || null,
      eps: insertAnalysis.eps || null,
      revenue: insertAnalysis.revenue || null,
      netIncome: insertAnalysis.netIncome || null,
      totalDebt: insertAnalysis.totalDebt || null,
      freeCashFlow: insertAnalysis.freeCashFlow || null,
      revenueGrowth: insertAnalysis.revenueGrowth || null,
      dividendYield: insertAnalysis.dividendYield || null,
      dividendAnnual: insertAnalysis.dividendAnnual || null,
      businessDescription: insertAnalysis.businessDescription || null,
      industry: insertAnalysis.industry || null,
      competitors: insertAnalysis.competitors as string[] | null || null,
      managementTeam: insertAnalysis.managementTeam as Array<{name: string; position: string; background: string}> | null || null,
      growthPotential: insertAnalysis.growthPotential as Array<{category: string; description: string; type: 'positive' | 'neutral' | 'negative'}> | null || null,
      risks: insertAnalysis.risks as Array<{category: string; description: string; severity: 'low' | 'medium' | 'high'}> | null || null,
      recentNews: insertAnalysis.recentNews as Array<{title: string; summary: string; date: string; sentiment: 'positive' | 'neutral' | 'negative'}> | null || null,
      aiRiskScore: insertAnalysis.aiRiskScore || null,
      aiAnalysis: insertAnalysis.aiAnalysis || null,
      lastUpdated: new Date(),
    };
    this.stockAnalyses.set(analysis.symbol.toUpperCase(), analysis);
    return analysis;
  }

  async getWatchlist(): Promise<StockAnalysis[]> {
    return Array.from(this.stockAnalyses.values());
  }
}

export const storage = new MemStorage();
