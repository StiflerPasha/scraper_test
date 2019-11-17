export function arrayFromLength(number) {
  return Array.from({ length: number }, (_, i) => ++i);
}

export function formatPrice(priceStr) {
  const priceArr = priceStr.split(' – ');
  const [low, high] = priceArr.map(price => parseInt(price.replace(/[^0-9]/g, '')));
  return {
    low,
    high,
  };
}

export function formatPeriod(periodStr) {
  const periodArr = periodStr.split(' – ');
  const [start, end] = periodArr.map(year => parseInt(year) || 'Nowadays');
  
  return {
    start,
    end,
  };
}
