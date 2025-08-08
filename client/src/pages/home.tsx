import { useState } from "react";
import StockSearch from "@/components/StockSearch";
import StockDashboard from "@/components/StockDashboard";
import LoadingOverlay from "@/components/LoadingOverlay";
import TradingBackground from "@/components/TradingBackground";
import { useTheme } from "@/hooks/useTheme";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const [selectedStock, setSelectedStock] = useState<string>("");
  const [showDashboard, setShowDashboard] = useState(false);
  const { currentTheme } = useTheme();

  const { data: stockData, isLoading, error } = useQuery({
    queryKey: ['/api/analyze', selectedStock],
    queryFn: async () => {
      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({ symbol: selectedStock }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze stock');
      }
      
      return response.json();
    },
    enabled: !!selectedStock,
  });

  const handleStockSearch = (symbol: string) => {
    setSelectedStock(symbol);
    setShowDashboard(true);
  };

  const handleBackToSearch = () => {
    setSelectedStock("");
    setShowDashboard(false);
  };

  return (
    <div className={`min-h-screen relative bg-gradient-to-br ${currentTheme.colors.background} transition-all duration-700`}>
      <TradingBackground />
      


      {/* Search Section */}
      <StockSearch onSearch={handleStockSearch} />

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="glass-card border-red-500/20 bg-red-500/5 rounded-lg p-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center mr-3">
                <span className="text-white font-bold">!</span>
              </div>
              <div>
                <h3 className="text-red-400 font-medium">Analysis Error</h3>
                <p className="text-red-300 mt-1">{error.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard */}
      {showDashboard && stockData && !isLoading && !error && (
        <StockDashboard data={stockData} />
      )}
    </div>
  );
}
