import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// import { useSession, getSession } from 'next-auth/react'
import Link from 'next/link'
import MainLayout from '../../components/layout/MainLayout'
import DealScoreCard from '../../components/deals/DealScoreCard'

export default function DealDetailPage() {
  const router = useRouter()
  const { id } = router.query
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
      {/* ... Full layout remains unchanged ... */}
      {/* Keep everything inside MainLayout as-is, since it doesn't depend on session */}
    </MainLayout>
  )
}

// Auth temporarily disabled
export async function getServerSideProps() {
  return {
    props: {}
  }
}
