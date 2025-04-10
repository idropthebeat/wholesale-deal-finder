import { useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import MainLayout from '../components/layout/MainLayout'
import SearchForm from '../components/search/SearchForm'
import DealsList from '../components/deals/DealsList'

export default function SearchPage() {
  const { data: session } = useSession()
  const [deals, setDeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSearch = async (searchParams) => {
    setLoading(true)
    setSearched(true)
    
    try {
      const response = await fetch('/api/deals/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(searchParams),
      })
      
      const data = await response.json()
      setDeals(data.deals || [])
    } catch (error) {
      console.error('Search error:', error)
      alert('An error occurred while searching. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <MainLayout title="Search Deals">
      <div className="space-y-8">
        <SearchForm onSearch={handleSearch} />
        
        {searched && (
          <DealsList deals={deals} loading={loading} />
        )}
      </div>
    </MainLayout>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context)
  
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  
  return {
    props: { session }
  }
}
