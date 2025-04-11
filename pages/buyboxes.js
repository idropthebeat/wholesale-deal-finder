import { useState } from 'react'
// import { useSession, getSession } from 'next-auth/react'
import MainLayout from '../components/layout/MainLayout'

export default function BuyBoxesPage() {
  // Auth temporarily disabled
  // const { data: session } = useSession()

  const [buyBoxes, setBuyBoxes] = useState([
    {
      id: 1,
      name: 'Austin SFH',
      description: 'Single family homes in Austin area for fix and flip',
      location: 'Austin, TX',
      propertyType: 'Single Family',
      minBeds: 3,
      minBaths: 2,
      minSqFt: 1500,
      maxPrice: 250000,
      maxArv: 350000,
      maxRenovation: 50000,
      minProfit: 40000,
      dealBreakers: 'Full gut jobs, high crime areas, flood zones'
    },
    {
      id: 2,
      name: 'Florida Condos',
      description: 'Condos in Florida for rental income',
      location: 'Tampa, FL',
      propertyType: 'Condo',
      minBeds: 2,
      minBaths: 2,
      minSqFt: 1000,
      maxPrice: 180000,
      maxArv: 250000,
      maxRenovation: 30000,
      minProfit: 25000,
      dealBreakers: 'HOA restrictions, vacation rentals not allowed'
    }
  ])

  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    location: '',
    propertyType: 'Single Family',
    minBeds: 3,
    minBaths: 2,
    minSqFt: 1500,
    maxPrice: 250000,
    maxArv: 350000,
    maxRenovation: 50000,
    minProfit: 40000,
    dealBreakers: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newBuyBox = {
      id: Date.now(),
      ...formData
    }

    setBuyBoxes(prev => [...prev, newBuyBox])
    setFormData({
      name: '',
      description: '',
      location: '',
      propertyType: 'Single Family',
      minBeds: 3,
      minBaths: 2,
      minSqFt: 1500,
      maxPrice: 250000,
      maxArv: 350000,
      maxRenovation: 50000,
      minProfit: 40000,
      dealBreakers: ''
    })
    setShowForm(false)
  }

  const handleDelete = (id) => {
    setBuyBoxes(prev => prev.filter(buyBox => buyBox.id !== id))
  }

  const handleSearch = (buyBox) => {
    // Redirect to search page with buy box parameters
    console.log('Search with buy box:', buyBox)
  }

  return (
    <MainLayout title="Buy Boxes">
      {/* ... entire JSX block unchanged ... */}
      {/* Keeping UI as-is since there's no auth gating here */}
      {/* You already pasted that long form section, so leave it intact here */}
    </MainLayout>
  )
}

// Auth temporarily disabled
export async function getServerSideProps() {
  return {
    props: {}
  }
}
