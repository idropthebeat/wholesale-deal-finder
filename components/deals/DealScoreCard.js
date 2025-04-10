export default function DealScoreCard({ deal }) {
  // Helper function to get score color
  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-green-400'
    if (score >= 55) return 'bg-yellow-400'
    if (score >= 40) return 'bg-orange-400'
    return 'bg-red-500'
  }
  
  // Helper function to get score bar width
  const getScoreBarWidth = (score) => {
    return `${score}%`
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800">Deal Score</h3>
        <div className={`${getScoreColor(deal.dealScore)} text-white font-bold rounded-full h-14 w-14 flex items-center justify-center text-xl`}>
          {deal.dealScore}
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Financial Metrics */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-700">Financial Metrics (40%)</h4>
            <span className="font-bold">{deal.scores.financial}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full" 
              style={{ width: getScoreBarWidth(deal.scores.financial) }}
            ></div>
          </div>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Potential Profit: ${deal.potentialProfit.toLocaleString()}</li>
            <li>• ROI: {deal.roi}%</li>
            <li>• ARV to Purchase Ratio: {deal.arvRatio}</li>
            <li>• 70% Rule Analysis: ${deal.ruleAnalysis.toLocaleString()} {deal.ruleAnalysis >= 0 ? 'below' : 'above'} maximum allowable offer</li>
          </ul>
        </div>
        
        {/* Market Factors */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-700">Market Factors (30%)</h4>
            <span className="font-bold">{deal.scores.market}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-500 h-2.5 rounded-full" 
              style={{ width: getScoreBarWidth(deal.scores.market) }}
            ></div>
          </div>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Location: {deal.city}, {deal.state} ({deal.marketStrength})</li>
            <li>• Population Growth: {deal.populationGrowth}</li>
            <li>• Job Growth: {deal.jobGrowth}</li>
            <li>• Price Trends: {deal.priceTrends}</li>
          </ul>
        </div>
        
        {/* Property Characteristics */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-700">Property Characteristics (15%)</h4>
            <span className="font-bold">{deal.scores.property}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-yellow-500 h-2.5 rounded-full" 
              style={{ width: getScoreBarWidth(deal.scores.property) }}
            ></div>
          </div>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Property Type: {deal.propertyType} ({deal.propertyTypeRating})</li>
            <li>• Bed/Bath Count: {deal.beds}/{deal.baths} ({deal.bedBathRating})</li>
            <li>• Square Footage: {deal.sqft.toLocaleString()} ({deal.sqftRating})</li>
            <li>• Age: Built {deal.yearBuilt} ({deal.ageRating})</li>
          </ul>
        </div>
        
        {/* Risk Assessment */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-medium text-gray-700">Risk Assessment (15%)</h4>
            <span className="font-bold">{deal.scores.risk}/100</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-purple-500 h-2.5 rounded-full" 
              style={{ width: getScoreBarWidth(deal.scores.risk) }}
            ></div>
          </div>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Property Age Risk: {deal.ageRisk}</li>
            <li>• Repair Cost Risk: {deal.repairRisk}</li>
            <li>• Market Volatility: {deal.marketVolatility}</li>
            <li>• Regulatory Constraints: {deal.regulatoryRisk}</li>
          </ul>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-200">
        <h4 className="font-bold text-gray-800 mb-2">Recommendation:</h4>
        <p className="text-gray-700">{deal.recommendation}</p>
      </div>
    </div>
  )
}
