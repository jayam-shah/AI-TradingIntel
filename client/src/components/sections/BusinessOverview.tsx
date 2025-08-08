interface BusinessOverviewProps {
  data: any;
}

export default function BusinessOverview({ data }: BusinessOverviewProps) {
  const getIndustryTrend = () => {
    // Simple heuristic based on growth metrics
    const revenueGrowth = parseFloat(data.revenueGrowth) || 0;
    if (revenueGrowth > 5) return { label: 'Growing', color: 'bg-green-100 text-green-800' };
    if (revenueGrowth > 0) return { label: 'Stable', color: 'bg-blue-100 text-blue-800' };
    return { label: 'Declining', color: 'bg-red-100 text-red-800' };
  };

  const trend = getIndustryTrend();

  return (
    <div className="glass-card rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
        <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-white font-bold">🏢</span>
        </div>
        Business & Industry
      </h3>
      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-300 mb-2">What the company does</h4>
          <p className="text-gray-200">
            {data.businessDescription || 'No description available'}
          </p>
        </div>
        <div>
          <h4 className="font-medium text-gray-300 mb-2">Industry</h4>
          <div className="flex items-center space-x-4">
            <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
              {data.industry}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${trend.label === 'Growing' ? 'bg-emerald-500/20 text-emerald-300' : trend.label === 'Stable' ? 'bg-blue-500/20 text-blue-300' : 'bg-red-500/20 text-red-300'}`}>
              {trend.label}
            </span>
          </div>
        </div>
        <div>
          <h4 className="font-medium text-gray-300 mb-2">Key Competitors</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.competitors && data.competitors.length > 0 ? (
              data.competitors.slice(0, 3).map((competitor: string, index: number) => (
                <div key={index} className="p-3 border border-white/10 rounded-lg bg-white/5">
                  <div className="font-medium text-white">{competitor}</div>
                  <div className="text-sm text-gray-400">Market competitor</div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-gray-500 text-center py-4">
                Competitor data not available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
