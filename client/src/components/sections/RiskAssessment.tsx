interface RiskAssessmentProps {
  data: any;
}

export default function RiskAssessment({ data }: RiskAssessmentProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-error';
      case 'medium':
        return 'bg-warning';
      case 'low':
        return 'bg-success';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-exclamation-triangle mr-2 text-primary"></i>
        Risk Assessment
      </h3>
      <div className="space-y-4">
        {data.risks && data.risks.length > 0 ? (
          data.risks.map((risk: any, index: number) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${getSeverityColor(risk.severity)}`}></div>
              <div>
                <div className="font-medium text-gray-900">{risk.category}</div>
                <div className="text-sm text-gray-600">{risk.description}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-shield-alt text-4xl mb-3"></i>
            <p>Risk assessment not available</p>
          </div>
        )}
      </div>
    </div>
  );
}
