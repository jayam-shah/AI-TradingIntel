export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <div className="text-lg font-medium text-gray-900">Analyzing Stock...</div>
          <div className="text-sm text-gray-600 text-center">
            Fetching real-time data and generating AI insights
          </div>
        </div>
      </div>
    </div>
  );
}
