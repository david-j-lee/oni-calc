export function getIOTotal(ios) {
  if (ios.length === 0) return 0;

  return ios.map(io => io.valueExtended || 0).reduce((a, b) => a + b);
}

export function getStandardIO(io) {
  const standardUnit = 'g';
  const standardRate = 'per second';

  let value = io.value;
  switch (io.unit) {
    case 'g':
      break;
    case 'mg':
      value = value * 0.001;
      break;
    case 'kg':
      value = value * 1000.0;
      break;
    default:
      value = 0.0;
      break;
  }

  switch (io.rate) {
    case 'per second':
      break;
    case 'per cycle':
      value = value / 600;
      break;
    default:
      value = 0.0;
      break;
  }
  return { value, unit: standardUnit, rate: standardRate };
}

export function getSortedArray(array, orderBy, order) {
  return order === 'desc'
    ? [...array].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...array].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
}
