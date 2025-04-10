import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function ExportButton({ deals, filename = 'wholesale-deals-export' }) {
  const [exporting, setExporting] = useState(false)
  
  const exportToExcel = () => {
    setExporting(true)
    
    try {
      // Prepare data for export
      const exportData = deals.map(deal => ({
        'Address': deal.address,
        'City': deal.city,
        'State': deal.state,
        'Zip Code': deal.zipCode,
        'Property Type': deal.propertyType,
        'Beds': deal.beds,
        'Baths': deal.baths,
        'Square Feet': deal.sqft,
        'Year Built': deal.yearBuilt,
        'Asking Price': deal.askingPrice,
        'Estimated ARV': deal.estimatedArv,
        'Potential Profit': deal.potentialProfit,
        'Deal Score': deal.dealScore,
        'Source': deal.source,
        'Source URL': deal.sourceUrl
      }))
      
      // Create worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData)
      
      // Create workbook
      const workbook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Deals')
      
      // Generate Excel file
      XLSX.writeFile(workbook, `${filename}.xlsx`)
    } catch (error) {
      console.error('Export failed:', error)
      alert('Export failed. Please try again.')
    } finally {
      setExporting(false)
    }
  }
  
  return (
    <button
      onClick={exportToExcel}
      disabled={exporting || !deals || deals.length === 0}
      className={`flex items-center space-x-2 bg-white border border-gray-300 rounded px-4 py-2 text-gray-700 hover:bg-gray-50 ${(exporting || !deals || deals.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {exporting ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Exporting...</span>
        </>
      )  : (
        <>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          <span>Export to Excel</span>
        </>
      ) }
    </button>
  )
}
