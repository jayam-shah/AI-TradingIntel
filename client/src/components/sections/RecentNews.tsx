interface RecentNewsProps {
  data: any;
}

export default function RecentNews({ data }: RecentNewsProps) {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'border-success bg-green-50';
      case 'negative':
        return 'border-error bg-red-50';
      default:
        return 'border-primary bg-blue-50';
    }
  };

  const getSentimentDot = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-success';
      case 'negative':
        return 'bg-error';
      default:
        return 'bg-warning';
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now.getTime() - date.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) return '1 day ago';
      if (diffDays < 7) return `${diffDays} days ago`;
      return date.toLocaleDateString();
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="bg-surface rounded-lg shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fas fa-newspaper mr-2 text-primary"></i>
        Recent News & Events
      </h3>
      <div className="space-y-4">
        {data.recentNews && data.recentNews.length > 0 ? (
          data.recentNews.map((article: any, index: number) => (
            <div key={index} className={`p-4 border-l-4 rounded-r-lg ${getSentimentColor(article.sentiment)}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-700 mb-2">
                    {article.summary}
                  </p>
                  <div className="text-xs text-gray-500">{formatDate(article.date)}</div>
                </div>
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${getSentimentDot(article.sentiment)}`}></div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <i className="fas fa-newspaper text-4xl mb-3"></i>
            <p>No recent news available</p>
          </div>
        )}
      </div>
    </div>
  );
}
