import FinancialChart from "@/components/charts/FinancialChart";

interface FinancialHealthProps {
  data: any;
}

export default function FinancialHealth({ data }: FinancialHealthProps) {
  const formatGrowthValue = (value: string) => {
    if (!value || value === 'N/A') return 'N/A';
    const num = parseFloat(value.replace('%', ''));
    return isNaN(num) ? 'N/A' : `${num > 0 ? '+' : ''}${num.toFixed(1)}%`;
  };

  const getGrowthColor = (value: string) => {
    if (!value || value === 'N/A') return 'text-gray-600';
    const num = parseFloat(value.replace('%', ''));
    return num > 0 ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-chart-line mr-2 text-primary"></i>
        Financial Health
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Revenue (TTM)</span>
            <span className="font-semibold text-gray-900">{data.revenue}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Net Income</span>
            <span className="font-semibold text-success">{data.netIncome}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Free Cash Flow</span>
            <span className="font-semibold text-success">{data.freeCashFlow}</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Total Debt</span>
            <span className="font-semibold text-warning">{data.totalDebt}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">EPS (TTM)</span>
            <span className="font-semibold text-gray-900">{data.eps}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Revenue Growth</span>
            <span className={`font-semibold ${getGrowthColor(data.revenueGrowth)}`}>
              {formatGrowthValue(data.revenueGrowth)}
            </span>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-700 mb-3">Financial Metrics Overview</h4>
        <FinancialChart data={data} />
      </div>
    </div>
  );
}
