interface ValuationMetricsProps {
  data: any;
}

export default function ValuationMetrics({ data }: ValuationMetricsProps) {
  const getValuationColor = (current: number, industry: number) => {
    if (current < industry * 0.8) return 'bg-success';
    if (current < industry * 1.2) return 'bg-warning';
    return 'bg-error';
  };

  const getProgressWidth = (current: number, industry: number) => {
    const ratio = current / industry;
    return Math.min(Math.max(ratio * 60, 10), 100);
  };

  const formatRatio = (value: string) => {
    if (!value || value === 'N/A') return 'N/A';
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : num.toFixed(2);
  };

  // Industry averages (approximate)
  const industryAverages = {
    pe: 24.3,
    peg: 1.8,
    pb: 8.7
  };

  const currentPE = parseFloat(data.peRatio) || 0;
  const currentPEG = parseFloat(data.pegRatio) || 0;
  const currentPB = parseFloat(data.pbRatio) || 0;

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-calculator mr-2 text-primary"></i>
        Valuation Metrics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">P/E Ratio</span>
              <span className="font-semibold text-gray-900">{formatRatio(data.peRatio)}</span>
            </div>
            <div className="text-sm text-gray-600">Industry Avg: {industryAverages.pe}</div>
            {currentPE > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${getValuationColor(currentPE, industryAverages.pe)}`}
                  style={{width: `${getProgressWidth(currentPE, industryAverages.pe)}%`}}
                ></div>
              </div>
            )}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">PEG Ratio</span>
              <span className="font-semibold text-gray-900">{formatRatio(data.pegRatio)}</span>
            </div>
            <div className="text-sm text-gray-600">Industry Avg: {industryAverages.peg}</div>
            {currentPEG > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${getValuationColor(currentPEG, industryAverages.peg)}`}
                  style={{width: `${getProgressWidth(currentPEG, industryAverages.peg)}%`}}
                ></div>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">P/B Ratio</span>
              <span className="font-semibold text-gray-900">{formatRatio(data.pbRatio)}</span>
            </div>
            <div className="text-sm text-gray-600">Industry Avg: {industryAverages.pb}</div>
            {currentPB > 0 && (
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full ${getValuationColor(currentPB, industryAverages.pb)}`}
                  style={{width: `${getProgressWidth(currentPB, industryAverages.pb)}%`}}
                ></div>
              </div>
            )}
          </div>
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Market Cap</span>
              <span className="font-semibold text-gray-900">{data.marketCap}</span>
            </div>
            <div className="text-sm text-gray-600">Large Cap</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div className="bg-primary h-2 rounded-full" style={{width: "100%"}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
