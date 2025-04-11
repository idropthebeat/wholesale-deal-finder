import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import MainLayout from '../../components/layout/MainLayout'
import DealScoreCard from '../../components/deals/DealScoreCard'

export default function DealDetailPage() {
  const router = useRouter()
  const { id } = router.query
  // Auth disabled – do not use useSession()
  // const { data: session } = useSession()

  const [deal, setDeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!id) return

    const fetchDeal = async () => {
      try {
        const response = await fetch(`/api/deals/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch deal')
        }
        const data = await response.json()
        setDeal(data.deal)
      } catch (error) {
        console.error('Error fetching deal:', error)
        setError('Failed to load deal details. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    fetchDeal()
  }, [id])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const getScoreColor = (score) => {
    if (score >= 85) return 'bg-green-500'
    if (score >= 70) return 'bg-green-400'
    if (score >= 55) return 'bg-yellow-400'
    if (score >= 40) return 'bg-orange-400'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <MainLayout title="Deal Details">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
        </div>
      </MainLayout>
    )
  }

  if (error || !deal) {
    return (
      <MainLayout title="Deal Details">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h3 className="text-xl font-medium text-gray-800 mb-2">Error</h3>
          <p className="text-gray-600 mb-4">{error || 'Deal not found'}</p>
          <Link href="/search" className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
            Back to Search
          </Link>
        </div>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={`${deal.address} | Deal Details`}>
      <div className="mb-4">
        <Link href="/search" className="text-primary-500 hover:text-primary-600 flex items-center">
          <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Results
        </Link>
      </div>
      
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{deal.address}, {deal.city}, {deal.state} {deal.zipCode}</h1>
        <div className={`${getScoreColor(deal.dealScore)} text-white font-bold rounded-full h-14 w-14 flex items-center justify-center text-xl`}>
          {deal.dealScore}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <svg className="h-24 w-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 22V12h6v10"></path>
              </svg>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Property Details</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="font-medium w-32">Property Type:</span>
                      <span>{deal.propertyType}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Bedrooms:</span>
                      <span>{deal.beds}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Bathrooms:</span>
                      <span>{deal.baths}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Square Feet:</span>
                      <span>{deal.sqft.toLocaleString()}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Year Built:</span>
                      <span>{deal.yearBuilt}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Source:</span>
                      <span>{deal.source}</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Financial Summary</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center">
                      <span className="font-medium w-32">Asking Price:</span>
                      <span>{formatCurrency(deal.askingPrice)}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Est. ARV:</span>
                      <span>{formatCurrency(deal.estimatedArv)}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Repair Cost:</span>
                      <span>{formatCurrency(deal.repairCost)}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Total Investment:</span>
                      <span>{formatCurrency(deal.askingPrice + deal.repairCost)}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">Potential Profit:</span>
                      <span className="text-green-600 font-bold">{formatCurrency(deal.potentialProfit)}</span>
                    </li>
                    <li className="flex items-center">
                      <span className="font-medium w-32">ROI:</span>
                      <span>{deal.roi}%</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Description</h3>
                <p className="text-gray-600">{deal.description}</p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <a 
                  href={deal.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                  View Original Listing
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <DealScoreCard deal={deal} />
          <div className="mt-6 bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                Save Deal
              </button>
              <button className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded">
                Share via Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

// Auth temporarily disabled on server side
export async function getServerSideProps() {
  return { props: {} }
}
