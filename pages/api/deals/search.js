// pages/api/deals/search.js

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const params = req.body;

  // --- Your mock deals here (expand as needed) ---
  const mockDeals = [
    {
      id: 'om-1',
      address: '123 Main St',
      city: 'Austin',
      state: 'TX',
      zipCode: '78701',
      propertyType: 'Single Family',
      beds: 3,
      baths: 2,
      sqft: 1800,
      yearBuilt: 1995,
      askingPrice: 180000,
      estimatedArv: 280000,
      repairCost: 30000,
      potentialProfit: 70000,
      source: 'OfferMarket',
      sourceUrl: 'https://www.offermarket.us/property/123-main-st',
      description: 'This property needs moderate repairs including new flooring, paint, and kitchen updates.',
      roi: 33.3,
      arvRatio: 1.56,
      ruleAnalysis: 16000,
      dealScore: 85
    },
    {
      id: 'om-2',
      address: '456 Oak Ave',
      city: 'Austin',
      state: 'TX',
      zipCode: '78704',
      propertyType: 'Single Family',
      beds: 4,
      baths: 3,
      sqft: 2200,
      yearBuilt: 2000,
      askingPrice: 220000,
      estimatedArv: 350000,
      repairCost: 40000,
      potentialProfit: 90000,
      source: 'OfferMarket',
      sourceUrl: 'https://www.offermarket.us/property/456-oak-ave',
      description: 'Spacious family home in desirable neighborhood. Great flip opportunity.',
      roi: 34.6,
      arvRatio: 1.59,
      ruleAnalysis: 5000,
      dealScore: 82
    },
    // …add more mock deals if you like
  ];

  let results = [...mockDeals];

  // --- filter by each param if provided ---
  if (params.location) {
    const loc = params.location.toLowerCase();
    results = results.filter(d =>
      d.city.toLowerCase().includes(loc) ||
      d.state.toLowerCase().includes(loc) ||
      d.zipCode.includes(params.location)
    );
  }
  if (params.propertyType) {
    results = results.filter(d => d.propertyType === params.propertyType);
  }
  if (params.minBeds) {
    results = results.filter(d => d.beds >= parseInt(params.minBeds, 10));
  }
  if (params.minBaths) {
    results = results.filter(d => d.baths >= parseInt(params.minBaths, 10));
  }
  if (params.minPrice) {
    results = results.filter(d => d.askingPrice >= parseInt(params.minPrice, 10));
  }
  if (params.maxPrice) {
    results = results.filter(d => d.askingPrice <= parseInt(params.maxPrice, 10));
  }
  if (params.minSqFt) {
    results = results.filter(d => d.sqft >= parseInt(params.minSqFt, 10));
  }
  if (params.maxSqFt) {
    results = results.filter(d => d.sqft <= parseInt(params.maxSqFt, 10));
  }
  if (params.yearBuilt) {
    results = results.filter(d => d.yearBuilt >= parseInt(params.yearBuilt, 10));
  }

  // sort highest‑score first
  results.sort((a, b) => b.dealScore - a.dealScore);

  return res.status(200).json({ deals: results });
}
