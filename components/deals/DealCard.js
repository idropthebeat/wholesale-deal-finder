import Link from 'next/link'

export default function DealCard({ deal }) {
  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Get score color based on value
  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-green-400'
    if (score >= 55) return 'bg-yellow-400'
    if (score >= 40) return 'bg-orange-400'
    return 'bg-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-1">{deal.address}</h3>
            <p className="text-gray-600 mb-2">{deal.city}, {deal.state} {deal.zipCode}</p>
          </div>
          <div className={`${getScoreColor(deal.dealScore)} text-white font-bold rounded-full h-12 w-12 flex items-center justify-center`}>
            {deal.dealScore}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-3 text-sm">
          <div className="text-gray-600">
            <span className="font-medium">{deal.propertyType}</span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{deal.beds}bd/{deal.baths}ba</span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">{deal.sqft.toLocaleString()} sqft</span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Built {deal.yearBuilt}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mb-3">
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Asking:</span>
            <span className="font-bold text-gray-800">{formatCurrency(deal.askingPrice)}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span className="text-gray-600">Est. ARV:</span>
            <span className="font-bold text-gray-800">{formatCurrency(deal.estimatedArv)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Potential Profit:</span>
            <span className="font-bold text-green-600">{formatCurrency(deal.potentialProfit)}</span>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-3 mb-3">
          <div className="flex items-center">
            <span className="text-gray-600 mr-1">Source:</span>
            <span className="font-medium">{deal.source}</span>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Link href={`/deals/${deal.id}`} className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded">
            View Details
          </Link>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded">
            Save Deal
          </button>
        </div>
      </div>
    </div>
  )
}
