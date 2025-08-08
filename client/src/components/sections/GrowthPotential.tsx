interface GrowthPotentialProps {
  data: any;
}

export default function GrowthPotential({ data }: GrowthPotentialProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'positive':
        return 'border-success bg-green-50';
      case 'negative':
        return 'border-error bg-red-50';
      default:
        return 'border-primary bg-blue-50';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-rocket mr-2 text-primary"></i>
        Growth Potential
      </h3>
      <div className="space-y-4">
        {data.growthPotential && data.growthPotential.length > 0 ? (
          data.growthPotential.map((potential: any, index: number) => (
            <div key={index} className={`p-4 border-l-4 rounded-r-lg ${getTypeColor(potential.type)}`}>
              <h4 className="font-medium text-gray-900 mb-2">{potential.category}</h4>
              <p className="text-gray-700 text-sm">{potential.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-rocket text-4xl mb-3"></i>
            <p>Growth potential analysis not available</p>
          </div>
        )}
      </div>
    </div>
  );
}
