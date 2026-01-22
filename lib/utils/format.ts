export const formatStats = (value: number | undefined) => {
  if (value === undefined || value === null) return "0";
  
  // Handles the 105.15999999999994 issue by rounding to 2 decimals
  // and adds thousands separators (e.g., 1.250,50)
  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};

// Calculate ecological equivalents
export const getEcoEquivalence = (co2: number) => {
  return {
    trees: Math.floor(co2 / 21), // 1 tree absorbs ~21kg/year
    phonesCharged: Math.floor(co2 * 121), // approx conversion
  };
};