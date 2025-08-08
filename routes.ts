import type { Express } from "express";
import { createServer, type Server } from "http";
import { stockApiService } from "./services/stockApi";
import { aiAnalysisService } from "./services/aiAnalysis";
import { demoDataService } from "./services/demoData";
import { authService } from "./services/auth";
import { alertService } from "./services/alertService";
import { authenticateToken, optionalAuth } from "./middleware/auth";
import { stockSearchSchema, registerUserSchema, loginUserSchema, createPriceAlertSchema, createNewsAlertSchema } from "@shared/schema";
import cookieParser from 'cookie-parser';

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Add cookie parser middleware
  app.use(cookieParser());

  // Authentication endpoints
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = registerUserSchema.parse(req.body);
      const result = await authService.register(userData);
      
      res.status(201).json({
        message: "User registered successfully",
        user: result.user,
        token: result.token
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Registration failed" 
      });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const credentials = loginUserSchema.parse(req.body);
      const result = await authService.login(credentials);
      
      res.json({
        message: "Login successful",
        user: result.user,
        token: result.token
      });
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : "Login failed" 
      });
    }
  });

  app.post("/api/auth/logout", authenticateToken, async (req, res) => {
    try {
      // In a real implementation, you'd handle session cleanup here
      res.json({ message: "Logout successful" });
    } catch (error) {
      console.error("Logout error:", error);
      res.status(500).json({ message: "Logout failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req, res) => {
    try {
      res.json({ user: req.user });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(500).json({ message: "Failed to get user info" });
    }
  });

  // Check if we have valid API keys
  const hasAlphaVantageKey = process.env.ALPHA_VANTAGE_API_KEY && process.env.ALPHA_VANTAGE_API_KEY.length > 10;
  const hasOpenAIKey = process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY.startsWith('sk-');
  const useRealStockData = hasAlphaVantageKey;

  if (!useRealStockData) {
    console.log("🔧 Running in demo mode - using sample data for development");
    console.log("ℹ️  To use real data, please provide valid API keys:");
    if (!hasAlphaVantageKey) console.log("   - ALPHA_VANTAGE_API_KEY (from alphavantage.co)");
  }
  
  if (!hasOpenAIKey) {
    console.log("⚠️  AI analysis using demo data - provide OpenAI API key for real AI insights");
    console.log("   - OPENAI_API_KEY (starts with sk- from openai.com)");
  }
  
  // Search companies endpoint (protected)
  app.get("/api/search/:query", authenticateToken, async (req, res) => {
    try {
      const { query } = req.params;
      if (!query || query.trim().length === 0) {
        return res.status(400).json({ error: "Search query is required" });
      }

      if (!useRealStockData) {
        const companies = await demoDataService.searchDemoCompanies(query);
        return res.json(companies);
      }

      const companies = await stockApiService.searchCompanies(query);
      res.json(companies);
    } catch (error) {
      console.error("Search error:", error);
      // Fallback to demo data if real API fails
      try {
        const companies = await demoDataService.searchDemoCompanies(req.params.query);
        res.json(companies);
      } catch (demoError) {
        res.status(500).json({ error: "Failed to search companies" });
      }
    }
  });

  // Get comprehensive stock analysis (protected)
  app.post("/api/analyze", authenticateToken, async (req, res) => {
    try {
      const { symbol } = stockSearchSchema.parse(req.body);
      
      if (!useRealStockData) {
        // Use demo data
        const [quote, overview, news, aiAnalysis] = await Promise.all([
          demoDataService.getDemoStockQuote(symbol),
          demoDataService.getDemoCompanyOverview(symbol),
          demoDataService.getDemoNews(symbol, symbol + ' Company'),
          demoDataService.getDemoAIAnalysis(symbol, symbol + ' Company')
        ]);

        const analysis = {
          symbol: quote.symbol,
          companyName: overview.name,
          currentPrice: quote.price,
          priceChange: quote.change,
          priceChangePercent: quote.changePercent,
          
          marketCap: stockApiService.formatMarketCap(overview.marketCapitalization || ''),
          volume: quote.volume,
          
          peRatio: overview.peRatio || 'N/A',
          pegRatio: overview.pegRatio || 'N/A',
          pbRatio: overview.priceToBookRatio || 'N/A',
          eps: overview.eps || 'N/A',
          
          revenue: stockApiService.formatLargeNumber(overview.revenueTTM || ''),
          netIncome: stockApiService.formatLargeNumber(overview.grossProfitTTM || ''),
          totalDebt: 'N/A',
          freeCashFlow: 'N/A',
          revenueGrowth: overview.quarterlyRevenueGrowthYOY || 'N/A',
          profitMargin: overview.profitMargin || 'N/A',
          
          dividendYield: overview.dividendYield || 'N/A',
          dividendAnnual: overview.dividendPerShare || 'N/A',
          dividendDate: overview.dividendDate || 'N/A',
          
          businessDescription: overview.description || 'No description available',
          industry: overview.industry || 'Unknown',
          sector: overview.sector || 'Unknown',
          
          competitors: aiAnalysis.competitors,
          managementTeam: aiAnalysis.managementTeam,
          growthPotential: aiAnalysis.growthPotential,
          risks: aiAnalysis.risks,
          recentNews: news,
          aiRiskScore: aiAnalysis.riskScore,
          aiAnalysis: aiAnalysis.analysis,
          
          beta: overview.beta || 'N/A',
          fiftyTwoWeekHigh: overview.fiftyTwoWeekHigh || 'N/A',
          fiftyTwoWeekLow: overview.fiftyTwoWeekLow || 'N/A',
          analystTargetPrice: overview.analystTargetPrice || 'N/A',
          
          lastUpdated: new Date().toISOString()
        };

        return res.json(analysis);
      }
      
      // Fetch basic stock data
      const [quote, overview] = await Promise.all([
        stockApiService.getStockQuote(symbol),
        stockApiService.getCompanyOverview(symbol)
      ]);

      // Fetch news
      const news = await stockApiService.getCompanyNews(symbol, overview.name);

      // Get AI analysis (with fallback to demo if OpenAI fails)
      let aiAnalysis;
      try {
        if (hasOpenAIKey) {
          aiAnalysis = await aiAnalysisService.analyzeCompany(quote, overview, news);
        } else {
          throw new Error("No OpenAI key available");
        }
      } catch (error) {
        console.log("⚠️  Using demo AI analysis - OpenAI API unavailable:", (error as Error).message);
        aiAnalysis = await demoDataService.getDemoAIAnalysis(symbol, overview.name);
      }

      // Enhance news with sentiment analysis (with fallback)
      let enhancedNews;
      try {
        if (hasOpenAIKey) {
          enhancedNews = await aiAnalysisService.enhanceNewsAnalysis(news);
        } else {
          enhancedNews = news;
        }
      } catch (error) {
        console.log("⚠️  Using basic news - OpenAI API unavailable for sentiment analysis");
        enhancedNews = news;
      }

      // Format financial data
      const formatValue = (value: string | undefined) => {
        if (!value || value === 'None') return 'N/A';
        return value;
      };

      const analysis = {
        // Basic stock info
        symbol: quote.symbol,
        companyName: overview.name,
        currentPrice: quote.price,
        priceChange: quote.change,
        priceChangePercent: quote.changePercent,
        
        // Market data
        marketCap: stockApiService.formatMarketCap(overview.marketCapitalization || ''),
        volume: quote.volume,
        
        // Valuation metrics
        peRatio: formatValue(overview.peRatio),
        pegRatio: formatValue(overview.pegRatio),
        pbRatio: formatValue(overview.priceToBookRatio),
        eps: formatValue(overview.eps),
        
        // Financial health
        revenue: stockApiService.formatLargeNumber(overview.revenueTTM || ''),
        netIncome: stockApiService.formatLargeNumber(overview.grossProfitTTM || ''),
        totalDebt: 'N/A', // Not available in basic overview
        freeCashFlow: 'N/A', // Not available in basic overview
        revenueGrowth: formatValue(overview.quarterlyRevenueGrowthYOY),
        profitMargin: formatValue(overview.profitMargin),
        
        // Dividend info
        dividendYield: formatValue(overview.dividendYield),
        dividendAnnual: formatValue(overview.dividendPerShare),
        dividendDate: formatValue(overview.dividendDate),
        
        // Business info
        businessDescription: overview.description || 'No description available',
        industry: overview.industry || 'Unknown',
        sector: overview.sector || 'Unknown',
        
        // AI Analysis
        competitors: aiAnalysis.competitors,
        managementTeam: aiAnalysis.managementTeam,
        growthPotential: aiAnalysis.growthPotential,
        risks: aiAnalysis.risks,
        recentNews: enhancedNews.slice(0, 5),
        aiRiskScore: aiAnalysis.riskScore,
        aiAnalysis: aiAnalysis.analysis,
        
        // Additional metrics
        beta: formatValue(overview.beta),
        fiftyTwoWeekHigh: formatValue(overview.fiftyTwoWeekHigh),
        fiftyTwoWeekLow: formatValue(overview.fiftyTwoWeekLow),
        analystTargetPrice: formatValue(overview.analystTargetPrice),
        
        lastUpdated: new Date().toISOString()
      };

      res.json(analysis);
    } catch (error) {
      console.error("Analysis error:", error);
      // Fallback to demo data if real API fails
      try {
        const { symbol } = stockSearchSchema.parse(req.body);
        const [quote, overview, news, aiAnalysis] = await Promise.all([
          demoDataService.getDemoStockQuote(symbol),
          demoDataService.getDemoCompanyOverview(symbol),
          demoDataService.getDemoNews(symbol, symbol + ' Company'),
          demoDataService.getDemoAIAnalysis(symbol, symbol + ' Company')
        ]);

        const analysis = {
          symbol: quote.symbol,
          companyName: overview.name,
          currentPrice: quote.price,
          priceChange: quote.change,
          priceChangePercent: quote.changePercent,
          marketCap: stockApiService.formatMarketCap(overview.marketCapitalization || ''),
          volume: quote.volume,
          peRatio: overview.peRatio || 'N/A',
          pegRatio: overview.pegRatio || 'N/A',
          pbRatio: overview.priceToBookRatio || 'N/A',
          eps: overview.eps || 'N/A',
          revenue: stockApiService.formatLargeNumber(overview.revenueTTM || ''),
          netIncome: stockApiService.formatLargeNumber(overview.grossProfitTTM || ''),
          totalDebt: 'N/A',
          freeCashFlow: 'N/A',
          revenueGrowth: overview.quarterlyRevenueGrowthYOY || 'N/A',
          profitMargin: overview.profitMargin || 'N/A',
          dividendYield: overview.dividendYield || 'N/A',
          dividendAnnual: overview.dividendPerShare || 'N/A',
          dividendDate: overview.dividendDate || 'N/A',
          businessDescription: overview.description || 'No description available',
          industry: overview.industry || 'Unknown',
          sector: overview.sector || 'Unknown',
          competitors: aiAnalysis.competitors,
          managementTeam: aiAnalysis.managementTeam,
          growthPotential: aiAnalysis.growthPotential,
          risks: aiAnalysis.risks,
          recentNews: news,
          aiRiskScore: aiAnalysis.riskScore,
          aiAnalysis: aiAnalysis.analysis,
          beta: overview.beta || 'N/A',
          fiftyTwoWeekHigh: overview.fiftyTwoWeekHigh || 'N/A',
          fiftyTwoWeekLow: overview.fiftyTwoWeekLow || 'N/A',
          analystTargetPrice: overview.analystTargetPrice || 'N/A',
          lastUpdated: new Date().toISOString()
        };

        res.json(analysis);
      } catch (fallbackError) {
        if (error instanceof Error) {
          res.status(500).json({ error: error.message });
        } else {
          res.status(500).json({ error: "Failed to analyze stock" });
        }
      }
    }
  });

  // Stock comparison endpoint (protected)
  app.post("/api/compare", authenticateToken, async (req, res) => {
    try {
      const { symbols } = req.body;
      
      if (!symbols || !Array.isArray(symbols) || symbols.length < 2) {
        return res.status(400).json({ error: 'At least 2 stock symbols are required for comparison' });
      }

      if (symbols.length > 4) {
        return res.status(400).json({ error: 'Maximum 4 stocks can be compared at once' });
      }

      const comparisonData = [];

      for (const symbol of symbols) {
        try {
          if (!useRealStockData) {
            // Use demo data
            const [quote, overview, news, aiAnalysis] = await Promise.all([
              demoDataService.getDemoStockQuote(symbol),
              demoDataService.getDemoCompanyOverview(symbol),
              demoDataService.getDemoNews(symbol, symbol + ' Company'),
              demoDataService.getDemoAIAnalysis(symbol, symbol + ' Company')
            ]);

            const analysis = {
              symbol: quote.symbol,
              companyName: overview.name,
              currentPrice: quote.price,
              priceChange: quote.change,
              priceChangePercent: quote.changePercent,
              marketCap: stockApiService.formatMarketCap(overview.marketCapitalization || ''),
              peRatio: parseFloat(overview.peRatio) || 0,
              pegRatio: parseFloat(overview.pegRatio) || 0,
              pbRatio: parseFloat(overview.priceToBookRatio) || 0,
              eps: parseFloat(overview.eps) || 0,
              revenue: stockApiService.formatLargeNumber(overview.revenueTTM || ''),
              netIncome: stockApiService.formatLargeNumber(overview.grossProfitTTM || ''),
              revenueGrowth: parseFloat(overview.quarterlyRevenueGrowthYOY) || 0,
              dividendYield: parseFloat(overview.dividendYield) || 0,
              businessDescription: overview.description || 'No description available',
              industry: overview.industry || 'Unknown',
              competitors: aiAnalysis.competitors,
              managementTeam: aiAnalysis.managementTeam,
              growthPotential: aiAnalysis.growthPotential,
              risks: aiAnalysis.risks,
              recentNews: news,
              aiRiskScore: aiAnalysis.riskScore,
              aiAnalysis: aiAnalysis.analysis,
            };

            comparisonData.push(analysis);
          } else {
            // Use real stock data
            const [quote, overview] = await Promise.all([
              stockApiService.getStockQuote(symbol),
              stockApiService.getCompanyOverview(symbol)
            ]);

            const [news, aiAnalysis] = await Promise.all([
              stockApiService.getCompanyNews(symbol, overview.name),
              hasOpenAIKey ? 
                aiAnalysisService.analyzeCompany(quote, overview, []) :
                demoDataService.getDemoAIAnalysis(symbol, overview.name)
            ]);

            const analysis = {
              symbol: quote.symbol,
              companyName: overview.name,
              currentPrice: quote.price,
              priceChange: quote.change,
              priceChangePercent: quote.changePercent,
              marketCap: stockApiService.formatMarketCap(overview.marketCapitalization || ''),
              peRatio: parseFloat(overview.peRatio) || 0,
              pegRatio: parseFloat(overview.pegRatio) || 0,
              pbRatio: parseFloat(overview.priceToBookRatio) || 0,
              eps: parseFloat(overview.eps) || 0,
              revenue: stockApiService.formatLargeNumber(overview.revenueTTM || ''),
              netIncome: stockApiService.formatLargeNumber(overview.grossProfitTTM || ''),
              revenueGrowth: parseFloat(overview.quarterlyRevenueGrowthYOY) || 0,
              dividendYield: parseFloat(overview.dividendYield) || 0,
              businessDescription: overview.description || 'No description available',
              industry: overview.industry || 'Unknown',
              competitors: aiAnalysis.competitors,
              managementTeam: aiAnalysis.managementTeam,
              growthPotential: aiAnalysis.growthPotential,
              risks: aiAnalysis.risks,
              recentNews: news,
              aiRiskScore: aiAnalysis.riskScore,
              aiAnalysis: aiAnalysis.analysis,
            };

            comparisonData.push(analysis);
          }
        } catch (error) {
          console.error(`Error fetching data for ${symbol}:`, error);
          // Continue with other stocks even if one fails
        }
      }

      if (comparisonData.length === 0) {
        return res.status(500).json({ error: 'Failed to fetch data for any of the requested stocks' });
      }

      res.json(comparisonData);
    } catch (error) {
      console.error('Stock comparison error:', error);
      res.status(500).json({ error: 'Failed to compare stocks' });
    }
  });

  // Alert Management Routes (Protected)
  
  // Price Alerts
  app.get("/api/alerts/price", authenticateToken, async (req, res) => {
    try {
      const alerts = await alertService.getUserPriceAlerts(req.user.id.toString());
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching price alerts:", error);
      res.status(500).json({ message: "Failed to fetch price alerts" });
    }
  });

  app.post("/api/alerts/price", authenticateToken, async (req, res) => {
    try {
      const alertData = createPriceAlertSchema.parse(req.body);
      // Add userId to the alert data
      const alertWithUserId = { ...alertData, userId: req.user.id.toString() };
      const alert = await alertService.createPriceAlert(req.user.id.toString(), alertWithUserId);
      res.status(201).json(alert);
    } catch (error) {
      console.error("Error creating price alert:", error);
      res.status(400).json({ message: "Failed to create price alert" });
    }
  });

  app.delete("/api/alerts/price/:id", authenticateToken, async (req, res) => {
    try {
      const alertId = parseInt(req.params.id);
      const success = await alertService.deletePriceAlert(req.user.id.toString(), alertId);
      if (success) {
        res.json({ message: "Price alert deleted successfully" });
      } else {
        res.status(404).json({ message: "Price alert not found" });
      }
    } catch (error) {
      console.error("Error deleting price alert:", error);
      res.status(500).json({ message: "Failed to delete price alert" });
    }
  });

  // News Alerts
  app.get("/api/alerts/news", authenticateToken, async (req, res) => {
    try {
      const alerts = await alertService.getUserNewsAlerts(req.user.id.toString());
      res.json(alerts);
    } catch (error) {
      console.error("Error fetching news alerts:", error);
      res.status(500).json({ message: "Failed to fetch news alerts" });
    }
  });

  app.post("/api/alerts/news", authenticateToken, async (req, res) => {
    try {
      const alertData = createNewsAlertSchema.parse(req.body);
      // Add userId to the alert data
      const alertWithUserId = { ...alertData, userId: req.user.id.toString() };
      const alert = await alertService.createNewsAlert(req.user.id.toString(), alertWithUserId);
      res.status(201).json(alert);
    } catch (error) {
      console.error("Error creating news alert:", error);
      res.status(400).json({ message: "Failed to create news alert" });
    }
  });

  app.delete("/api/alerts/news/:id", authenticateToken, async (req, res) => {
    try {
      const alertId = parseInt(req.params.id);
      const success = await alertService.deleteNewsAlert(req.user.id.toString(), alertId);
      if (success) {
        res.json({ message: "News alert deleted successfully" });
      } else {
        res.status(404).json({ message: "News alert not found" });
      }
    } catch (error) {
      console.error("Error deleting news alert:", error);
      res.status(500).json({ message: "Failed to delete news alert" });
    }
  });

  // Notifications
  app.get("/api/alerts/notifications", authenticateToken, async (req, res) => {
    try {
      const notifications = await alertService.getUserNotifications(req.user.id.toString());
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Failed to fetch notifications" });
    }
  });

  app.post("/api/alerts/notifications/:id/read", authenticateToken, async (req, res) => {
    try {
      const notificationId = parseInt(req.params.id);
      const success = await alertService.markNotificationAsRead(req.user.id.toString(), notificationId);
      if (success) {
        res.json({ message: "Notification marked as read" });
      } else {
        res.status(404).json({ message: "Notification not found" });
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
      res.status(500).json({ message: "Failed to mark notification as read" });
    }
  });

  app.post("/api/alerts/notifications/read-all", authenticateToken, async (req, res) => {
    try {
      await alertService.markAllNotificationsAsRead(req.user.id.toString());
      res.json({ message: "All notifications marked as read" });
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      res.status(500).json({ message: "Failed to mark all notifications as read" });
    }
  });

  // Alert Statistics
  app.get("/api/alerts/stats", authenticateToken, async (req, res) => {
    try {
      const stats = await alertService.getAlertStats(req.user.id.toString());
      res.json(stats);
    } catch (error) {
      console.error("Error fetching alert stats:", error);
      res.status(500).json({ message: "Failed to fetch alert statistics" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
