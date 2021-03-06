export const plants = [
  {
    name: 'Bristle Blossom',
    growthRate: { value: 6, rate: 'cycle' },
    yield: 1,
    inputs: [{ name: 'Water', value: 20, unit: 'kg', rate: 'per cycle' }],
    outputs: [],
  },
  {
    name: 'Dusk Cap',
    growthRate: { value: 7.5, rate: 'cycle' },
    yield: 1,
    inputs: [{ name: 'Slime', value: 4, unit: 'kg', rate: 'per cycle' }],
    outputs: [],
  },
  {
    name: 'Mealwood',
    growthRate: { value: 3, rate: 'cycle' },
    yield: 1,
    inputs: [{ name: 'Dirt', value: 10, unit: 'kg', rate: 'per cycle' }],
    outputs: [],
  },
  {
    name: 'Pincha Pepper',
    growthRate: { value: 8, rate: 'cycle' },
    yield: 4,
    inputs: [
      { name: 'Polluted Water', value: 35, unit: 'kg', rate: 'per cycle' },
      { name: 'Phosphorite', value: 1, unit: 'kg', rate: 'per cycle' },
    ],
    outputs: [],
  },
  {
    name: 'Sleet Wheat',
    growthRate: { value: 18, rate: 'cycle' },
    yield: 18,
    inputs: [
      { name: 'Water', value: 20, unit: 'kg', rate: 'per cycle' },
      { name: 'Dirt', value: 5, unit: 'kg', rate: 'per cycle' },
    ],
    outputs: [],
  },
];
