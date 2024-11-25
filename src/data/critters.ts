import { IIOEntityBase } from '../interfaces/IIOEntity';

export const critters: IIOEntityBase[] = [
  {
    name: 'Drecko',
    variants: [
      {
        // TODO: Inputs are a growth rate of a plant, this is not supported
        outputs: [
          { name: 'Phosphorite', value: 10, unit: 'kg', rate: 'per cycle' },
          // 2 units per shearing. Grows 13% per cycle. So for every 7.69 cycles
          // there will be 2 reed fibers.
          { name: 'Reed Fiber', value: 0.26, unit: 'each', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Gassy Moo',
    variants: [
      {
        inputs: [
          { name: 'Gas Grass', value: 2, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          { name: 'Natural Gas', value: 10, unit: 'kg', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Hatch',
    variants: [
      {
        inputs: [
          { name: 'Ceramic', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [{ name: 'Fossil', value: 140, unit: 'kg', rate: 'per cycle' }],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Granite', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Igneous Rock', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Mafic Rock', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Obsidian', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Sandstone', value: 140, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          {
            name: 'Sedimentary Rock',
            value: 140,
            unit: 'kg',
            rate: 'per cycle',
          },
        ],
        outputs: [{ name: 'Coal', value: 70, unit: 'kg', rate: 'per cycle' }],
      },
    ],
  },
  {
    name: 'Morb',
    variants: [
      {
        outputs: [
          // This is not exact as the rate is random in game
          {
            name: 'Polluted Oxygen',
            value: 6.6,
            unit: 'kg',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    name: 'Pacu',
    variants: [
      {
        inputs: [
          {
            name: 'Algae',
            value: 7.5,
            unit: 'kg',
            rate: 'per cycle',
          },
          // TODO: Seeds are not supported
        ],
        outputs: [
          {
            name: 'Polluted Dirt',
            value: 3.75,
            unit: 'kg',
            rate: 'per cycle',
          },
        ],
      },
    ],
  },
  {
    name: 'Pip',
    variants: [
      // TODO: Inputs are growth rate of a plant which is not yet supported
      { outputs: [{ name: 'Dirt', value: 20, unit: 'kg', rate: 'per cycle' }] },
    ],
  },
  {
    name: 'Pokeshell',
    variants: [
      {
        inputs: [
          { name: 'Polluted Dirt', value: 70, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Sand', value: 35, unit: 'kg', rate: 'per cycle' }],
      },
      {
        inputs: [
          { name: 'Rot Pile', value: 70, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [{ name: 'Sand', value: 35, unit: 'kg', rate: 'per cycle' }],
      },
    ],
  },
  {
    name: 'Puft',
    variants: [
      {
        inputs: [
          { name: 'Polluted Oxygen', value: 50, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          { name: 'Slime', value: 47.5, unit: 'kg', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Slickster',
    variants: [
      {
        inputs: [
          { name: 'Carbon Dioxide', value: 20, unit: 'kg', rate: 'per cycle' },
        ],
        outputs: [
          { name: 'Crude Oil', value: 10, unit: 'kg', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Shine Bug',
    variants: [
      {
        inputs: [
          { name: 'Phosphorite', value: 0.2, unit: 'kg', rate: 'per cycle' },
        ],
      },
      {
        inputs: [
          { name: 'Bristle Berry', value: 0.2, unit: 'kg', rate: 'per cycle' },
        ],
      },
      {
        inputs: [
          { name: 'Gristle Berry', value: 0.2, unit: 'kg', rate: 'per cycle' },
        ],
      },
    ],
  },
  {
    name: 'Shove Vole',
  },
];
