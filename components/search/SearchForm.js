import { useState } from 'react'

export default function SearchForm({ onSearch }) {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'Single Family',
    minBeds: 3,
    minBaths: 2,
    minPrice: 100000,
    maxPrice: 300000,
    minSqFt: 1000,
    maxSqFt: 3000,
    yearBuilt: 1980
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(searchParams)
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Search Wholesale Deals</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={searchParams.location}
            onChange={handleChange}
            placeholder="City, State or ZIP"
            className="input-field"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <select
              id="propertyType"
              name="propertyType"
              value={searchParams.propertyType}
              onChange={handleChange}
              className="input-field"
            >
              <option value="Single Family">Single Family</option>
              <option value="Multi-Family">Multi-Family</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
              <option value="Land">Land</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="minBeds" className="block text-sm font-medium text-gray-700 mb-1">Min Beds</label>
            <select
              id="minBeds"
              name="minBeds"
              value={searchParams.minBeds}
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
            <label htmlFor="minBaths" className="block text-sm font-medium text-gray-700 mb-1">Min Baths</label>
            <select
              id="minBaths"
              name="minBaths"
              value={searchParams.minBaths}
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">Min Price</label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              value={searchParams.minPrice}
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
              value={searchParams.maxPrice}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label htmlFor="minSqFt" className="block text-sm font-medium text-gray-700 mb-1">Min Sq Ft</label>
            <input
              type="number"
              id="minSqFt"
              name="minSqFt"
              value={searchParams.minSqFt}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="maxSqFt" className="block text-sm font-medium text-gray-700 mb-1">Max Sq Ft</label>
            <input
              type="number"
              id="maxSqFt"
              name="maxSqFt"
              value={searchParams.maxSqFt}
              onChange={handleChange}
              className="input-field"
            />
          </div>
          
          <div>
            <label htmlFor="yearBuilt" className="block text-sm font-medium text-gray-700 mb-1">Year Built (After)</label>
            <input
              type="number"
              id="yearBuilt"
              name="yearBuilt"
              value={searchParams.yearBuilt}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            Search Deals
          </button>
        </div>
      </form>
    </div>
  )
}
