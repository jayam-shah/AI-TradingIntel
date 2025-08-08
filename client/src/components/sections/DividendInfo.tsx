interface DividendInfoProps {
  data: any;
}

export default function DividendInfo({ data }: DividendInfoProps) {
  const formatValue = (value: string) => {
    if (!value || value === 'N/A') return 'N/A';
    return value;
  };

  const formatPercent = (value: string) => {
    if (!value || value === 'N/A') return 'N/A';
    const num = parseFloat(value);
    return isNaN(num) ? 'N/A' : `${(num * 100).toFixed(2)}%`;
  };

  const hasDividend = data.dividendYield && data.dividendYield !== 'N/A' && parseFloat(data.dividendYield) > 0;

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-coins mr-2 text-primary"></i>
        Dividend Information
      </h3>
      {hasDividend ? (
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Current Yield</span>
            <span className="font-semibold text-gray-900">{formatPercent(data.dividendYield)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Annual Dividend</span>
            <span className="font-semibold text-gray-900">${formatValue(data.dividendAnnual)}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Dividend Date</span>
            <span className="font-semibold text-gray-900">{formatValue(data.dividendDate)}</span>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <div className="text-sm font-medium text-green-800">Dividend Status: Active</div>
            <div className="text-sm text-green-700 mt-1">
              Company pays regular dividends
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          <i className="fas fa-coins text-4xl mb-3"></i>
          <p>This company does not pay dividends</p>
          <p className="text-sm mt-2">Focus on capital appreciation instead</p>
        </div>
      )}
    </div>
  );
}
