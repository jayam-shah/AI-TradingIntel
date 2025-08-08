import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";

interface StockSearchProps {
  onSearch: (symbol: string) => void;
}

export default function StockSearch({ onSearch }: StockSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const { currentTheme } = useTheme();

  const { data: searchResults = [] } = useQuery({
    queryKey: ['/api/search', searchQuery],
    queryFn: async () => {
      if (!searchQuery.trim()) return [];
      const response = await fetch(`/api/search/${encodeURIComponent(searchQuery)}`);
      if (!response.ok) throw new Error('Search failed');
      return response.json();
    },
    enabled: searchQuery.length > 1,
  });

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.toUpperCase());
      setShowDropdown(false);
    }
  };

  const handleSelectCompany = (symbol: string) => {
    setSearchQuery(symbol);
    setShowDropdown(false);
    onSearch(symbol);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  return (
    <section className="relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-4 theme-text-white">
            AI-Powered Stock Analysis
          </h2>
          <p className="text-lg max-w-2xl mx-auto theme-text-gray">
            Get comprehensive insights with real-time data, financial metrics, and AI-driven risk assessment
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <Input
              type="text"
              value={searchQuery}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="glass-card pl-12 pr-4 py-4 text-lg theme-text-white placeholder-gray-400 border-white/20 glow"
              placeholder="Search stock symbol or company name (e.g., TSLA, MSFT, AAPL)"
              style={{ 
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = currentTheme.colors.primary}
              onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'}
            />
            
            {/* Auto-complete dropdown */}
            {showDropdown && searchResults.length > 0 && (
              <div className="absolute z-20 w-full glass-card mt-2 border border-white/20 rounded-lg overflow-hidden">
                <div className="py-2">
                  {searchResults.map((result: any) => (
                    <div
                      key={result.symbol}
                      className="px-4 py-3 hover:bg-white/10 cursor-pointer transition-colors"
                      onClick={() => handleSelectCompany(result.symbol)}
                    >
                      <div className="font-medium text-white">{result.name}</div>
                      <div className="text-sm text-gray-300">{result.symbol}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white py-4 px-8 rounded-lg font-semibold text-lg glow transition-all duration-300"
          >
            🚀 Analyze Stock
          </Button>
        </div>
      </div>
    </section>
  );
}
