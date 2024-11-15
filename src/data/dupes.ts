export const dupes = {
  inputs: [
    { name: 'Oxygen', value: 100, unit: 'g', rate: 'per second' },
    {
      name: 'Food',
      value: { survival: 1000, noSweat: 500 },
      unit: 'kcal',
      rate: 'per cycle',
    },
  ],
  outputs: [
    { name: 'Carbon Dioxide', value: 2, unit: 'g', rate: 'per second' },
  ],
  traits: [
    {
      name: 'Bottomless Stomach',
      inputs: [{ name: 'Food', value: 500, unit: 'kcal', rate: 'per cycle' }],
      outputs: [],
    },
    {
      name: "Diver's Lungs",
      inputs: [{ name: 'Oxygen', value: -25, unit: 'g', rate: 'per second' }],
      outputs: [
        { name: 'Carbon Dioxide', value: -5, unit: 'g', rate: 'per second' },
      ],
    },
    {
      name: 'Flatulent',
      inputs: [],
      outputs: [
        { name: 'Natural Gas', value: 5, unit: 'g', rate: 'per second' },
      ],
    },
    {
      name: 'Mouth Breather',
      inputs: [{ name: 'Oxygen', value: 100, unit: 'g', rate: 'per second' }],
      outputs: [
        { name: 'Carbon Dioxide', value: 20, unit: 'g', rate: 'per second' },
      ],
    },
  ],
};
