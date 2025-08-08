import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface FinancialChartProps {
  data: any;
}

export default function FinancialChart({ data }: FinancialChartProps) {
  // Mock data for demonstration - in a real app, this would come from historical data
  const chartData = [
    { year: '2020', revenue: 274.5, eps: 3.28 },
    { year: '2021', revenue: 365.8, eps: 5.61 },
    { year: '2022', revenue: 394.3, eps: 6.05 },
    { year: '2023', revenue: 383.3, eps: 5.96 },
    { year: '2024', revenue: 385.0, eps: 6.13 },
  ];

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}T`;
    } else if (value >= 1) {
      return `$${value.toFixed(1)}B`;
    }
    return `$${value.toFixed(2)}`;
  };

  return (
    <div className="h-48 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="year" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
            tickFormatter={formatValue}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [
              name === 'revenue' ? formatValue(value) : `$${value.toFixed(2)}`,
              name === 'revenue' ? 'Revenue' : 'EPS'
            ]}
            labelFormatter={(label) => `Year ${label}`}
          />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="hsl(207, 90%, 54%)" 
            strokeWidth={2}
            dot={{ fill: "hsl(207, 90%, 54%)", strokeWidth: 2 }}
          />
          <Line 
            type="monotone" 
            dataKey="eps" 
            stroke="hsl(120, 50%, 50%)" 
            strokeWidth={2}
            dot={{ fill: "hsl(120, 50%, 50%)", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
