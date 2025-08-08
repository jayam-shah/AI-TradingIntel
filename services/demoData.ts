// Demo data service for development when API keys are not available
import { StockQuote, CompanyOverview } from '@shared/schema';
import { AIAnalysisResult } from './aiAnalysis';

export class DemoDataService {
  async getDemoStockQuote(symbol: string): Promise<StockQuote> {
    const demoData: Record<string, StockQuote> = {
      'AAPL': {
        symbol: 'AAPL',
        price: 227.52,
        change: 3.25,
        changePercent: 1.45,
        volume: 89234567,
      },
      'MSFT': {
        symbol: 'MSFT',
        price: 445.23,
        change: -2.17,
        changePercent: -0.48,
        volume: 23456789,
      },
      'GOOGL': {
        symbol: 'GOOGL',
        price: 179.85,
        change: 1.92,
        changePercent: 1.08,
        volume: 45678901,
      },
      'TSLA': {
        symbol: 'TSLA',
        price: 248.50,
        change: -5.75,
        changePercent: -2.26,
        volume: 78901234,
      },
    };

    return demoData[symbol.toUpperCase()] || {
      symbol: symbol.toUpperCase(),
      price: 150.00,
      change: 2.50,
      changePercent: 1.70,
      volume: 12345678,
    };
  }

  async getDemoCompanyOverview(symbol: string): Promise<CompanyOverview> {
    const demoData: Record<string, CompanyOverview> = {
      'AAPL': {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        description: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. It also sells various related services.',
        industry: 'Consumer Electronics',
        sector: 'Technology',
        marketCapitalization: '3485000000000',
        peRatio: '29.85',
        pegRatio: '2.54',
        bookValue: '4.21',
        eps: '6.13',
        revenuePerShareTTM: '24.32',
        profitMargin: '0.2531',
        operatingMarginTTM: '0.3041',
        returnOnAssetsTTM: '0.2239',
        returnOnEquityTTM: '1.479',
        revenueTTM: '385603000000',
        grossProfitTTM: '169148000000',
        dilutedEPSTTM: '6.13',
        quarterlyEarningsGrowthYOY: '0.066',
        quarterlyRevenueGrowthYOY: '-0.043',
        analystTargetPrice: '234.50',
        trailingPE: '29.85',
        forwardPE: '26.12',
        priceToSalesRatioTTM: '8.95',
        priceToBookRatio: '54.1',
        evToRevenue: '8.72',
        evToEbitda: '25.4',
        beta: '1.24',
        fiftyTwoWeekHigh: '237.23',
        fiftyTwoWeekLow: '164.08',
        fiftyDayMovingAverage: '225.41',
        twoHundredDayMovingAverage: '201.87',
        sharesOutstanding: '15204100000',
        dividendDate: '2024-11-14',
        exDividendDate: '2024-11-08',
        dividendPerShare: '0.25',
        dividendYield: '0.0044',
        payoutRatio: '0.1633',
        dividendPayoutRatio: '0.1633',
        lastSplitFactor: '4:1',
        lastSplitDate: '2020-08-31',
      },
      'MSFT': {
        symbol: 'MSFT',
        name: 'Microsoft Corporation',
        description: 'Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.',
        industry: 'Software',
        sector: 'Technology',
        marketCapitalization: '3312000000000',
        peRatio: '35.12',
        pegRatio: '2.89',
        bookValue: '13.05',
        eps: '12.05',
        revenuePerShareTTM: '65.23',
        profitMargin: '0.3621',
        operatingMarginTTM: '0.4214',
        returnOnAssetsTTM: '0.1845',
        returnOnEquityTTM: '0.3892',
        revenueTTM: '245122000000',
        grossProfitTTM: '169721000000',
        dilutedEPSTTM: '12.05',
        quarterlyEarningsGrowthYOY: '0.089',
        quarterlyRevenueGrowthYOY: '0.156',
        analystTargetPrice: '475.00',
        trailingPE: '35.12',
        forwardPE: '29.8',
        priceToSalesRatioTTM: '13.2',
        priceToBookRatio: '34.1',
        evToRevenue: '12.8',
        evToEbitda: '30.5',
        beta: '0.89',
        fiftyTwoWeekHigh: '468.35',
        fiftyTwoWeekLow: '309.45',
        fiftyDayMovingAverage: '441.22',
        twoHundredDayMovingAverage: '415.33',
        sharesOutstanding: '7433800000',
        dividendDate: '2024-12-12',
        exDividendDate: '2024-11-21',
        dividendPerShare: '0.83',
        dividendYield: '0.0074',
        payoutRatio: '0.2756',
        dividendPayoutRatio: '0.2756',
        lastSplitFactor: '2:1',
        lastSplitDate: '2003-02-18',
      },
    };

    return demoData[symbol.toUpperCase()] || {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Company`,
      description: 'A technology company focused on innovative solutions and market growth.',
      industry: 'Technology',
      sector: 'Technology',
      marketCapitalization: '125000000000',
      peRatio: '22.5',
      pegRatio: '1.8',
      bookValue: '8.50',
      eps: '6.75',
      revenuePerShareTTM: '45.20',
      profitMargin: '0.15',
      operatingMarginTTM: '0.18',
      returnOnAssetsTTM: '0.12',
      returnOnEquityTTM: '0.25',
      revenueTTM: '75000000000',
      grossProfitTTM: '35000000000',
      dilutedEPSTTM: '6.75',
      quarterlyEarningsGrowthYOY: '0.08',
      quarterlyRevenueGrowthYOY: '0.12',
      analystTargetPrice: '165.00',
      trailingPE: '22.5',
      forwardPE: '20.1',
      priceToSalesRatioTTM: '5.2',
      priceToBookRatio: '18.5',
      evToRevenue: '5.0',
      evToEbitda: '22.8',
      beta: '1.15',
      fiftyTwoWeekHigh: '175.00',
      fiftyTwoWeekLow: '95.50',
      fiftyDayMovingAverage: '152.30',
      twoHundredDayMovingAverage: '142.15',
      sharesOutstanding: '500000000',
      dividendDate: '2024-12-15',
      exDividendDate: '2024-12-01',
      dividendPerShare: '0.50',
      dividendYield: '0.0133',
      payoutRatio: '0.30',
      dividendPayoutRatio: '0.30',
      lastSplitFactor: '2:1',
      lastSplitDate: '2020-03-15',
    };
  }

  async getDemoNews(symbol: string, companyName: string): Promise<Array<{
    title: string;
    summary: string;
    date: string;
    sentiment: 'positive' | 'neutral' | 'negative';
  }>> {
    const demoNews = [
      {
        title: `${companyName} Reports Strong Q4 Earnings`,
        summary: `${companyName} exceeded analyst expectations with strong quarterly results, driven by increased demand and operational efficiency.`,
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        sentiment: 'positive' as const,
      },
      {
        title: `Analysts Upgrade ${symbol} Price Target`,
        summary: `Multiple investment firms have raised their price targets for ${symbol} following recent strategic announcements.`,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        sentiment: 'positive' as const,
      },
      {
        title: `${companyName} Announces New Product Launch`,
        summary: `The company unveiled its latest innovation, targeting emerging market opportunities with advanced technology.`,
        date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        sentiment: 'neutral' as const,
      },
      {
        title: `Market Volatility Affects Tech Stocks Including ${symbol}`,
        summary: `Broader market concerns have impacted technology stocks, with ${symbol} experiencing some downward pressure.`,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        sentiment: 'negative' as const,
      },
    ];

    return demoNews;
  }

  async getDemoAIAnalysis(symbol: string, companyName: string): Promise<AIAnalysisResult> {
    const demoAnalyses: Record<string, AIAnalysisResult> = {
      'AAPL': {
        riskScore: 4,
        analysis: `Apple Inc. demonstrates exceptional financial strength with consistent revenue growth and strong market position in consumer electronics. The company's diversified product ecosystem, including iPhone, Mac, iPad, and Services, provides multiple revenue streams and customer retention advantages. Apple's strong brand loyalty, innovative product development, and robust cash position make it a relatively stable investment. However, the company faces increasing competition in key markets and regulatory scrutiny. The high valuation metrics suggest premium pricing that may limit near-term appreciation potential.`,
        competitors: ['Samsung Electronics', 'Google (Alphabet)', 'Microsoft Corporation'],
        managementTeam: [
          {
            name: 'Tim Cook',
            position: 'CEO',
            background: 'Former COO with over 25 years at Apple, known for operational excellence and supply chain management. Led Apple through significant growth and product diversification since 2011.',
          },
          {
            name: 'Luca Maestri',
            position: 'CFO',
            background: 'Former General Motors and Xerox executive with strong financial management background. Joined Apple in 2013 and has overseen the company\'s capital allocation strategy.',
          },
        ],
        growthPotential: [
          {
            category: 'Services Revenue',
            description: 'Growing services segment including App Store, iCloud, and Apple Pay provides recurring revenue with higher margins.',
            type: 'positive',
          },
          {
            category: 'Emerging Markets',
            description: 'Expansion opportunities in India and other developing markets offer significant growth potential.',
            type: 'positive',
          },
          {
            category: 'AR/VR Technology',
            description: 'Investment in augmented and virtual reality could open new product categories and revenue streams.',
            type: 'neutral',
          },
        ],
        risks: [
          {
            category: 'Market Saturation',
            description: 'Smartphone market maturity in developed countries may limit iPhone growth.',
            severity: 'medium',
          },
          {
            category: 'Regulatory Pressure',
            description: 'Increasing antitrust scrutiny and potential App Store regulation could impact services revenue.',
            severity: 'medium',
          },
          {
            category: 'Supply Chain Dependencies',
            description: 'Heavy reliance on Asian suppliers and manufacturing creates geopolitical risks.',
            severity: 'low',
          },
        ],
      },
      'MSFT': {
        riskScore: 3,
        analysis: `Microsoft Corporation stands as a dominant force in enterprise software and cloud computing, with Azure being a key growth driver. The company's successful transition to cloud-based services and subscription models provides predictable revenue streams and strong competitive positioning. Microsoft's diverse portfolio spanning productivity software, cloud infrastructure, gaming, and enterprise solutions offers stability and growth opportunities. The company benefits from strong enterprise relationships and increasing digital transformation trends. Leadership in AI and cloud computing positions Microsoft well for future growth.`,
        competitors: ['Amazon Web Services', 'Google Cloud', 'Oracle Corporation'],
        managementTeam: [
          {
            name: 'Satya Nadella',
            position: 'CEO',
            background: 'Long-time Microsoft executive who transformed the company toward cloud computing and AI. Under his leadership since 2014, Microsoft has achieved significant growth and market expansion.',
          },
          {
            name: 'Amy Hood',
            position: 'CFO',
            background: 'Former investment banker with strong financial strategy experience. Has been instrumental in Microsoft\'s capital allocation and acquisition strategy since 2013.',
          },
        ],
        growthPotential: [
          {
            category: 'Azure Cloud Services',
            description: 'Rapidly growing cloud infrastructure business with enterprise customer expansion and new service offerings.',
            type: 'positive',
          },
          {
            category: 'AI Integration',
            description: 'Leading position in artificial intelligence through OpenAI partnership and AI-powered productivity tools.',
            type: 'positive',
          },
          {
            category: 'Gaming Division',
            description: 'Xbox Game Pass subscription growth and cloud gaming expansion provide new revenue opportunities.',
            type: 'positive',
          },
        ],
        risks: [
          {
            category: 'Cloud Competition',
            description: 'Intense competition from Amazon AWS and Google Cloud could pressure market share and margins.',
            severity: 'medium',
          },
          {
            category: 'Regulatory Scrutiny',
            description: 'Antitrust concerns and regulatory oversight may impact acquisition strategy and business practices.',
            severity: 'low',
          },
          {
            category: 'Economic Sensitivity',
            description: 'Enterprise spending may decline during economic downturns, affecting cloud and software sales.',
            severity: 'low',
          },
        ],
      },
    };

    return demoAnalyses[symbol.toUpperCase()] || {
      riskScore: 5,
      analysis: `This company operates in a competitive technology sector with both growth opportunities and market challenges. The company shows reasonable financial metrics and market positioning, though detailed analysis would require more comprehensive data review. Investment consideration should include industry trends, competitive positioning, and company-specific fundamentals.`,
      competitors: ['Industry Leader A', 'Market Competitor B', 'Tech Company C'],
      managementTeam: [
        {
          name: 'John Smith',
          position: 'CEO',
          background: 'Experienced technology executive with a track record of leading growth initiatives and strategic transformation.',
        },
        {
          name: 'Sarah Johnson',
          position: 'CFO',
          background: 'Financial expert with extensive experience in corporate finance and capital markets within the technology sector.',
        },
      ],
      growthPotential: [
        {
          category: 'Market Expansion',
          description: 'Opportunities to expand into new geographical markets and customer segments.',
          type: 'positive',
        },
        {
          category: 'Product Innovation',
          description: 'Investment in research and development could lead to new product offerings and revenue streams.',
          type: 'neutral',
        },
      ],
      risks: [
        {
          category: 'Market Competition',
          description: 'Competitive pressure from established players may impact market share and pricing power.',
          severity: 'medium',
        },
        {
          category: 'Technology Disruption',
          description: 'Rapid technological changes could make current products or services obsolete.',
          severity: 'medium',
        },
      ],
    };
  }

  async searchDemoCompanies(query: string): Promise<Array<{ symbol: string; name: string }>> {
    const companies = [
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'MSFT', name: 'Microsoft Corporation' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
      { symbol: 'AMZN', name: 'Amazon.com Inc.' },
      { symbol: 'TSLA', name: 'Tesla Inc.' },
      { symbol: 'META', name: 'Meta Platforms Inc.' },
      { symbol: 'NVDA', name: 'NVIDIA Corporation' },
      { symbol: 'NFLX', name: 'Netflix Inc.' },
      { symbol: 'CRM', name: 'Salesforce Inc.' },
      { symbol: 'ORCL', name: 'Oracle Corporation' },
    ];

    const searchTerm = query.toLowerCase();
    return companies.filter(company => 
      company.symbol.toLowerCase().includes(searchTerm) || 
      company.name.toLowerCase().includes(searchTerm)
    );
  }
}

export const demoDataService = new DemoDataService();