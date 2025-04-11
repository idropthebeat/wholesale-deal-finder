export function calculateDealScore(deal) {
  const weights = {
    financial: 0.4,
    market: 0.3,
    property: 0.15,
    risk: 0.15,
  };

  // Example Scoring — adjust these rules based on your real logic

  // 📊 Financial Score (e.g., based on profit margin)
  let financial = 0;
  if (deal.arv && deal.purchase_price) {
    const margin = (deal.arv - deal.purchase_price) / deal.arv;
    if (margin >= 0.3) financial = 100;
    else if (margin >= 0.2) financial = 80;
    else if (margin >= 0.1) financial = 60;
    else financial = 40;
  }

  // 📈 Market Score (e.g., based on ZIP or days on market)
  let market = 0;
  if (deal.zip_code) {
    const hotZips = ['64114', '64113', '66204'];
    market = hotZips.includes(deal.zip_code) ? 90 : 70;
  }

  // 🏠 Property Score (e.g., based on property condition)
  let property = 0;
  if (deal.condition) {
    if (deal.condition === 'excellent') property = 100;
    else if (deal.condition === 'good') property = 80;
    else if (deal.condition === 'fair') property = 60;
    else property = 40;
  }

  // ⚠️ Risk Score (e.g., based on occupancy or title status)
  let risk = 0;
  if (deal.occupancy_status) {
    if (deal.occupancy_status === 'vacant') risk = 100;
    else if (deal.occupancy_status === 'tenant') risk = 70;
    else risk = 50;
  }

  // 📋 Overall Score
  const overall = Math.round(
    financial * weights.financial +
    market * weights.market +
    property * weights.property +
    risk * weights.risk
  );

  return {
    financial,
    market,
    property,
    risk,
    overall,
  };
}
