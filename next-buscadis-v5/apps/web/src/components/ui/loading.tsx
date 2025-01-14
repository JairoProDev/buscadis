export function LoadingClassifieds() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-lg mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function LoadingDetail() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="bg-gray-200 h-96 rounded-lg"></div>
      <div className="bg-gray-200 h-8 w-1/2 rounded"></div>
      <div className="bg-gray-200 h-4 rounded"></div>
      <div className="bg-gray-200 h-4 rounded"></div>
    </div>
  );
} 