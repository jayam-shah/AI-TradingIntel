import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/hooks/useTheme';
import { 
  Plus, 
  X, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Users,
  AlertTriangle,
  DollarSign,
  Activity,
  Target,
  Shield
} from 'lucide-react';

interface ComparisonData {
  symbol: string;
  companyName: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  marketCap: string;
  peRatio: number;
  pegRatio: number;
  pbRatio: number;
  eps: number;
  revenue: string;
  netIncome: string;
  revenueGrowth: number;
  dividendYield: number;
  aiRiskScore: number;
  aiAnalysis: string;
  industry: string;
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

export default function StockComparison() {
  const [symbols, setSymbols] = useState<string[]>(['']);
  const [searchSymbol, setSearchSymbol] = useState('');
  const [comparisonStocks, setComparisonStocks] = useState<string[]>([]);
  const { toast } = useToast();
  const { currentTheme } = useTheme();

  // Fetch comparison data
  const { data: comparisonData, isLoading, error } = useQuery({
    queryKey: ['/api/compare', comparisonStocks],
    queryFn: async () => {
      if (comparisonStocks.length < 2) return null;
      
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ symbols: comparisonStocks }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch comparison data');
      }
      
      return response.json();
    },
    enabled: comparisonStocks.length >= 2,
  });

  const addStock = () => {
    if (searchSymbol.trim() && !comparisonStocks.includes(searchSymbol.toUpperCase())) {
      if (comparisonStocks.length >= 4) {
        toast({
          title: "Maximum stocks reached",
          description: "You can compare up to 4 stocks at a time.",
          variant: "destructive",
        });
        return;
      }
      
      setComparisonStocks([...comparisonStocks, searchSymbol.toUpperCase()]);
      setSearchSymbol('');
    }
  };

  const removeStock = (symbol: string) => {
    setComparisonStocks(comparisonStocks.filter(s => s !== symbol));
  };

  const formatNumber = (value: number | string, isPercent = false) => {
    if (typeof value === 'string') return value;
    if (isPercent) return `${value?.toFixed(2)}%`;
    return value?.toLocaleString() || 'N/A';
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-emerald-400';
    if (change < 0) return 'text-red-400';
    return 'text-gray-400';
  };

  const getRiskColor = (score: number) => {
    if (score <= 3) return 'text-emerald-400';
    if (score <= 6) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-emerald-500/20 text-emerald-400';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400';
      case 'high': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getGrowthColor = (type: string) => {
    switch (type) {
      case 'positive': return 'bg-emerald-500/20 text-emerald-400';
      case 'negative': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.colors.background} text-white transition-all duration-700`}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Stock Comparison</h1>
                <p className="text-gray-300">Compare multiple stocks side-by-side</p>
              </div>
            </div>
          </div>

          {/* Stock Selection */}
          <Card className="glass-card border-white/20 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Select Stocks to Compare</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {comparisonStocks.map((symbol) => (
                  <Badge 
                    key={symbol}
                    variant="outline"
                    className="glass-card border-white/20 text-white bg-white/10 px-3 py-1"
                  >
                    {symbol}
                    <button
                      onClick={() => removeStock(symbol)}
                      className="ml-2 hover:text-red-400 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Input
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addStock()}
                  placeholder="Enter stock symbol (e.g., AAPL, GOOGL)"
                  className="glass-card border-white/20 text-white placeholder-gray-400"
                />
                <Button
                  onClick={addStock}
                  disabled={!searchSymbol.trim() || comparisonStocks.length >= 4}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Stock
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <Card className="glass-card border-red-500/20 bg-red-500/5 mb-6">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <AlertTriangle className="w-6 h-6 text-red-400 mr-3" />
                  <div>
                    <h3 className="text-red-400 font-medium">Comparison Error</h3>
                    <p className="text-red-300 mt-1">{error.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Comparison Results */}
          {comparisonData && comparisonData.length > 0 && (
            <div className="space-y-6">
              {/* Overview Comparison */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2" />
                    Price & Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white py-3">Stock</th>
                          <th className="text-left text-white py-3">Price</th>
                          <th className="text-left text-white py-3">Change</th>
                          <th className="text-left text-white py-3">Market Cap</th>
                          <th className="text-left text-white py-3">P/E Ratio</th>
                          <th className="text-left text-white py-3">EPS</th>
                          <th className="text-left text-white py-3">Risk Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((stock: ComparisonData, index: number) => (
                          <tr key={stock.symbol} className="border-b border-white/10">
                            <td className="py-4">
                              <div>
                                <div className="font-medium text-white">{stock.symbol}</div>
                                <div className="text-sm text-gray-400">{stock.companyName}</div>
                              </div>
                            </td>
                            <td className="py-4 text-white">${formatNumber(stock.currentPrice)}</td>
                            <td className="py-4">
                              <div className={`flex items-center ${getChangeColor(stock.priceChange)}`}>
                                {stock.priceChange > 0 ? (
                                  <TrendingUp className="w-4 h-4 mr-1" />
                                ) : (
                                  <TrendingDown className="w-4 h-4 mr-1" />
                                )}
                                {formatNumber(stock.priceChangePercent, true)}
                              </div>
                            </td>
                            <td className="py-4 text-white">{stock.marketCap}</td>
                            <td className="py-4 text-white">{formatNumber(stock.peRatio)}</td>
                            <td className="py-4 text-white">${formatNumber(stock.eps)}</td>
                            <td className="py-4">
                              <div className={`flex items-center ${getRiskColor(stock.aiRiskScore)}`}>
                                <Shield className="w-4 h-4 mr-1" />
                                {stock.aiRiskScore}/10
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Metrics Comparison */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Activity className="w-5 h-5 mr-2" />
                    Financial Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/20">
                          <th className="text-left text-white py-3">Stock</th>
                          <th className="text-left text-white py-3">Revenue</th>
                          <th className="text-left text-white py-3">Net Income</th>
                          <th className="text-left text-white py-3">Revenue Growth</th>
                          <th className="text-left text-white py-3">Dividend Yield</th>
                          <th className="text-left text-white py-3">P/B Ratio</th>
                          <th className="text-left text-white py-3">PEG Ratio</th>
                        </tr>
                      </thead>
                      <tbody>
                        {comparisonData.map((stock: ComparisonData) => (
                          <tr key={stock.symbol} className="border-b border-white/10">
                            <td className="py-4">
                              <div className="font-medium text-white">{stock.symbol}</div>
                            </td>
                            <td className="py-4 text-white">{stock.revenue}</td>
                            <td className="py-4 text-white">{stock.netIncome}</td>
                            <td className="py-4">
                              <div className={getChangeColor(stock.revenueGrowth)}>
                                {formatNumber(stock.revenueGrowth, true)}
                              </div>
                            </td>
                            <td className="py-4 text-white">{formatNumber(stock.dividendYield, true)}</td>
                            <td className="py-4 text-white">{formatNumber(stock.pbRatio)}</td>
                            <td className="py-4 text-white">{formatNumber(stock.pegRatio)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Growth Potential & Risks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Growth Potential */}
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Growth Potential
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {comparisonData.map((stock: ComparisonData) => (
                        <div key={stock.symbol} className="border-b border-white/10 pb-4 last:border-0">
                          <h4 className="font-medium text-white mb-2">{stock.symbol}</h4>
                          <div className="space-y-2">
                            {stock.growthPotential?.slice(0, 3).map((growth, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Badge className={`${getGrowthColor(growth.type)} text-xs`}>
                                  {growth.category}
                                </Badge>
                                <p className="text-sm text-gray-300 flex-1">{growth.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Risk Assessment */}
                <Card className="glass-card border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      Risk Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {comparisonData.map((stock: ComparisonData) => (
                        <div key={stock.symbol} className="border-b border-white/10 pb-4 last:border-0">
                          <h4 className="font-medium text-white mb-2">{stock.symbol}</h4>
                          <div className="space-y-2">
                            {stock.risks?.slice(0, 3).map((risk, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Badge className={`${getSeverityColor(risk.severity)} text-xs`}>
                                  {risk.severity}
                                </Badge>
                                <p className="text-sm text-gray-300 flex-1">{risk.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* AI Analysis Summary */}
              <Card className="glass-card border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    AI Analysis Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {comparisonData.map((stock: ComparisonData) => (
                      <div key={stock.symbol} className="glass-card border-white/10 p-4 rounded-lg">
                        <h4 className="font-medium text-white mb-2">{stock.symbol} - {stock.companyName}</h4>
                        <p className="text-sm text-gray-300 mb-3">{stock.aiAnalysis}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="text-gray-300">
                            {stock.industry}
                          </Badge>
                          <div className={`flex items-center ${getRiskColor(stock.aiRiskScore)}`}>
                            <Shield className="w-4 h-4 mr-1" />
                            Risk: {stock.aiRiskScore}/10
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Empty State */}
          {comparisonStocks.length === 0 && (
            <Card className="glass-card border-white/20">
              <CardContent className="pt-6 text-center">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-white mb-2">Start Your Comparison</h3>
                <p className="text-gray-400 mb-4">
                  Add 2-4 stocks to compare their performance, financials, and AI analysis side-by-side
                </p>
              </CardContent>
            </Card>
          )}

          {/* Minimum Stocks Message */}
          {comparisonStocks.length === 1 && (
            <Card className="glass-card border-yellow-500/20 bg-yellow-500/5">
              <CardContent className="pt-6 text-center">
                <Target className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Add One More Stock</h3>
                <p className="text-gray-400">
                  You need at least 2 stocks to start the comparison analysis
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}