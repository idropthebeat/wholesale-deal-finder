import DealCard from './DealCard'

export default function DealsList({ deals, loading }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    )
  }

  if (!deals || deals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <h3 className="text-xl font-medium text-gray-800 mb-2">No deals found</h3>
        <p className="text-gray-600">Try adjusting your search criteria to find more results.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">{deals.length} Deals Found</h2>
        <div className="flex items-center">
          <span className="mr-2 text-gray-600">Sort by:</span>
          <select className="border border-gray-300 rounded p-2 text-gray-700">
            <option value="dealScore">Deal Score</option>
            <option value="askingPrice">Price (Low to High)</option>
            <option value="potentialProfit">Potential Profit</option>
            <option value="roi">ROI</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
      
      <div className="mt-6 flex justify-between items-center">
        <button className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50">
          Export to CSV
        </button>
        <div className="flex space-x-2">
          <button className="bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50">
            Map View
          </button>
          <button className="bg-primary-500 text-white rounded px-4 py-2 hover:bg-primary-600">
            List View
          </button>
        </div>
      </div>
    </div>
  )
}
