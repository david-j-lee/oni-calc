export const plants = [
  // { //TODO figure out how to include industrial farm calculations for plants
  //   name: 'Arbor Tree',
  //   growthRate: { value: 4.5, rate: 'cycle' },
  //   yield: 1500,
  //   inputs: [
  //     { name: 'Polluted Water', value: 70, unit: 'kg', rate: 'per cycle' },
  //     { name: 'Dirt', value: 10, unit: 'kg', rate: 'per cycle' },
  //   ],
  //   outputs: [],
  // },
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
  // { //TODO figure out how to include industrial farm calculations for plants
  //   name: 'Oxyfern',
  //   growthRate: { value: 0, rate: 'cycle' },
  //   yield: 1,
  //   inputs: [
  //     { name: 'Water', value: 19, unit: 'kg', rate: 'per cycle' },
  //     { name: 'Dirt', value: 4, unit: 'kg', rate: 'per cycle' },
  //   ],
  //   outputs: [],
  // },
  {
    name: 'Nosh Sprout',
    growthRate: { value: 21, rate: 'cycle' },
    yield: 12,
    inputs: [
      { name: 'Ethanol', value: 20, unit: 'kg', rate: 'per cycle' },
      { name: 'Dirt', value: 5, unit: 'kg', rate: 'per cycle' },
    ],
    outputs: [],
  },
  {
    name: 'Pincha Pepperplant',
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
  {
    name: 'Waterweed',
    growthRate: { value: 0, rate: 'cycle' },
    yield: 1,
    inputs: [
      { name: 'Salt Water', value: 5, unit: 'kg', rate: 'per cycle' },
      { name: 'Bleach Stone', value: 0.5, unit: 'kg', rate: 'per cycle' },
    ],
    outputs: [],
  },
];
