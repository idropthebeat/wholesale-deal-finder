import { useState } from 'react'
import { useSession, getSession } from 'next-auth/react'
import MainLayout from '../components/layout/MainLayout'

export default function BuyBoxesPage() {
  const { data: session } = useSession()
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
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Buy Box Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="input-field"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="mb-6">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Target Location *</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type *</label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="Single Family">Single Family</option>
                    <option value="Multi-Family">Multi-Family</option>
                    <option value="Condo">Condo</option>
                    <option value="Townhouse">Townhouse</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="minBeds" className="block text-sm font-medium text-gray-700 mb-1">Min Bedrooms</label>
                  <select
                    id="minBeds"
                    name="minBeds"
                    value={formData.minBeds}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                    <option value="5">5+</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="minBaths" className="block text-sm font-medium text-gray-700 mb-1">Min Bathrooms</label>
                  <select
                    id="minBaths"
                    name="minBaths"
                    value={formData.minBaths}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label htmlFor="minSqFt" className="block text-sm font-medium text-gray-700 mb-1">Min Sq Footage</label>
                  <input
                    type="number"
                    id="minSqFt"
                    name="minSqFt"
                    value={formData.minSqFt}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">Max Price</label>
                  <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    value={formData.maxPrice}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="maxArv" className="block text-sm font-medium text-gray-700 mb-1">Max ARV</label>
                  <input
                    type="number"
                    id="maxArv"
                    name="maxArv"
                    value={formData.maxArv}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="maxRenovation" className="block text-sm font-medium text-gray-700 mb-1">Max Renovation</label>
                  <input
                    type="number"
                    id="maxRenovation"
                    name="maxRenovation"
                    value={formData.maxRenovation}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label htmlFor="minProfit" className="block text-sm font-medium text-gray-700 mb-1">Min Profit</label>
                  <input
                    type="number"
                    id="minProfit"
                    name="minProfit"
                    value={formData.minProfit}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="dealBreakers" className="block text-sm font-medium text-gray-700 mb-1">Deal Breakers</label>
                <textarea
                  id="dealBreakers"
                  name="dealBreakers"
                  value={formData.dealBreakers}
                  onChange={handleChange}
                  className="input-field"
                  rows="2"
                  placeholder="List factors that would automatically disqualify a property"
                ></textarea>
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-2 px-4 rounded"
                >
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
                    <button
                      onClick={() => handleSearch(buyBox)}
                      className="bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded"
                    >
                      Search
                    </button>
                    <button
                      onClick={() => handleDelete(buyBox.id)}
                      className="bg-white border border-red-500 text-red-500 hover:bg-red-50 py-2 px-4 rounded"
                    >
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
