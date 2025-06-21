import { IPlantBase } from '../interfaces/IPlant';

export const plants: IPlantBase[] = [
  {
    name: 'Arbor Tree',
    growthRate: { value: 4.5, rate: 'cycle' },
    yield: 1500,
    variants: [
      {
        outputs: [
          { name: 'Lumber', value: 138.88, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [
          { name: 'Dirt', value: 10, unit: 'kg', rate: 'per cycle' },
          { name: 'Polluted Water', value: 70, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          { name: 'Lumber', value: 555.55, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    // This is for domesticated plant
    // TODO: Add wild plant
    name: 'Bristle Blossom',
    growthRate: { value: 6, rate: 'cycle' },
    yield: 1,
    variants: [
      {
        inputs: [{ name: 'Water', value: 20, unit: 'kg', rate: 'per cycle' }],
        outputs: [
          {
            name: 'Bristle Berry',
            value: 1 / 6,
            unit: 'each',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    // This is for the domesticated plant
    // TODO: Add wild plant
    name: 'Dusk Cap',
    growthRate: { value: 7.5, rate: 'cycle' },
    yield: 1,
    variants: [
      {
        inputs: [{ name: 'Slime', value: 4, unit: 'kg', rate: 'per cycle' }],
        outputs: [
          { name: 'Mushroom', value: 1 / 7.5, unit: 'each', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Mealwood',
    growthRate: { value: 3, rate: 'cycle' },
    yield: 1,
    variants: [
      {
        inputs: [{ name: 'Dirt', value: 10, unit: 'kg', rate: 'per cycle' }],
        outputs: [
          { name: 'Food', value: 1 / 3 * 600, unit: 'kcal', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    // This is for the domesticated plant, this one can also be wild.
    // TODO: Add wild plant
    name: 'Nosh Sprout',
    growthRate: { value: 21, rate: 'cycle' },
    yield: 12,
    variants: [
      {
        inputs: [
          { name: 'Ethanol', value: 20, unit: 'kg', rate: 'per cycle' },
          { name: 'Dirt', value: 5, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          // 21 cycles for 12 beans, so 0.57 beans per cycle
          {
            name: 'Nosh Bean',
            value: 12 / 21,
            unit: 'each',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    name: 'Oxyfern',
    yield: 0,
    growthRate: { value: 0, rate: 'cycle' },
    // TODO: What to do with this requirement?
    // requirements: [{ type: 'Plant', name: 'Oxyfern' }],
    variants: [
      {
        inputs: [
          {
            name: 'Carbon Dioxide',
            value: 0.15625,
            unit: 'g',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Oxygen', value: 7.8, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [
          { name: 'Dirt', value: 4, unit: 'kg', rate: 'per cycle' },
          { name: 'Water', value: 19, unit: 'kg', rate: 'per cycle' },
          {
            name: 'Carbon Dioxide',
            value: 0.625,
            unit: 'g',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Oxygen', value: 31.3, unit: 'g', rate: 'per second' },
        ],
      }],
  },
  {
    name: 'Pincha Pepperplant',
    growthRate: { value: 8, rate: 'cycle' },
    yield: 4,
    variants: [
      {
        inputs: [
          { name: 'Polluted Water', value: 35, unit: 'kg', rate: 'per cycle' },
          { name: 'Phosphorite', value: 1, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          // Produces 4 kg in 32 cycles or 0.125 kg per cycle
          {
            name: 'Pincha Peppernut',
            value: 125,
            unit: 'g',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    name: 'Sleet Wheat',
    growthRate: { value: 18, rate: 'cycle' },
    yield: 18,
    variants: [
      {
        inputs: [
          { name: 'Water', value: 20, unit: 'kg', rate: 'per cycle' },
          { name: 'Dirt', value: 5, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          {
            name: 'Sleet Wheat Grain',
            value: 1,
            unit: 'each',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    name: 'Waterweed',
    growthRate: { value: 0, rate: 'cycle' },
    yield: 1,
    variants: [
      {
        inputs: [
          { name: 'Salt Water', value: 5, unit: 'kg', rate: 'per cycle' },
          { name: 'Bleach Stone', value: 0.5, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          { name: 'Lettuce', value: 1, unit: 'each', rate: 'per cycle' },
        ],
      },
    ],
  },
];
