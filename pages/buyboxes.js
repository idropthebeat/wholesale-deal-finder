import { useState } from 'react'
// import { useSession, getSession } from 'next-auth/react'
import MainLayout from '../components/layout/MainLayout'

export default function BuyBoxesPage() {
  // Auth is disabled – do not call useSession()
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
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newBuyBox = { id: Date.now(), ...formData }
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
    console.log('Search with buy box:', buyBox)
  }

  return (
    <MainLayout title="Buy Boxes">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Your Buy Boxes</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
          >
            Create New Buy Box
          </button>
        </div>
        
        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-6 text-gray-800">Create New Buy Box</h2>
            <form onSubmit={handleSubmit}>
              {/* Form fields for name, description, location, etc. */}
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Buy Box Name *</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="input-field" required />
              </div>
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="input-field" rows="2"></textarea>
              </div>
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Target Location *</label>
                <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="input-field" required />
              </div>
              {/* Additional form fields... */}
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setShowForm(false)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                  Cancel
                </button>
                <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded">
                  Create Buy Box
                </button>
              </div>
            </form>
          </div>
        )}
        
        {buyBoxes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h3 className="text-xl font-medium text-gray-800 mb-2">No Buy Boxes Found</h3>
            <p className="text-gray-600 mb-4">Create your first buy box to save your investment criteria.</p>
            <button
              onClick={() => setShowForm(true)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
            >
              Create New Buy Box
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {buyBoxes.map(buyBox => (
              <div key={buyBox.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{buyBox.name}</h3>
                  <p className="text-gray-600 mb-4">{buyBox.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium w-32">Location:</span>
                      <span>{buyBox.location}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium w-32">Property Type:</span>
                      <span>{buyBox.propertyType}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium w-32">Beds/Baths:</span>
                      <span>{buyBox.minBeds}+ / {buyBox.minBaths}+</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium w-32">Max Price:</span>
                      <span>${buyBox.maxPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-gray-600 font-medium w-32">Min Profit:</span>
                      <span>${buyBox.minProfit.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button onClick={() => handleSearch(buyBox)} className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded">
                      Search
                    </button>
                    <button onClick={() => handleDelete(buyBox.id)} className="bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  )
}

// Auth temporarily disabled on server side
export async function getServerSideProps() {
  return { props: {} }
}
