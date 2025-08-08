import BusinessOverview from "./sections/BusinessOverview";
import FinancialHealth from "./sections/FinancialHealth";
import ValuationMetrics from "./sections/ValuationMetrics";
import ManagementTeam from "./sections/ManagementTeam";
import GrowthPotential from "./sections/GrowthPotential";
import RiskAssessment from "./sections/RiskAssessment";
import DividendInfo from "./sections/DividendInfo";
import RecentNews from "./sections/RecentNews";

interface StockDashboardProps {
  data: any;
}

export default function StockDashboard({ data }: StockDashboardProps) {
  const isPositive = data.priceChange >= 0;
  
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
      {/* Stock Header */}
      <div className="glass-card rounded-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">{data.companyName}</h2>
            <p className="text-lg text-gray-300">{data.symbol} • {data.sector}</p>
          </div>
          <button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold glow transition-all duration-300">
            ⭐ Add to Watchlist
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">${data.currentPrice}</div>
            <div className={`text-lg font-medium ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}${data.priceChange} ({isPositive ? '+' : ''}{data.priceChangePercent}%)
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Market Cap</div>
            <div className="text-lg font-semibold text-white">{data.marketCap}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">P/E Ratio</div>
            <div className="text-lg font-semibold text-white">{data.peRatio}</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">Volume</div>
            <div className="text-lg font-semibold text-white">{data.volume?.toLocaleString() || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <BusinessOverview data={data} />
          <FinancialHealth data={data} />
          <ValuationMetrics data={data} />
          <GrowthPotential data={data} />
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          <ManagementTeam data={data} />
          <RiskAssessment data={data} />
          <DividendInfo data={data} />
          <RecentNews data={data} />
        </div>
      </div>
    </main>
  );
}
