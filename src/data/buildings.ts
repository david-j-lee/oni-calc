import { IBuildingBase } from '../interfaces/IBuilding';

export const buildings: IBuildingBase[] = [
  {
    category: 'Base',
    name: 'Automatic Dispenser',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Base',
    name: 'Bunker Door',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Base',
    name: 'Mechanized Airlock',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Base',
    name: 'Smart Storage Bin',
    capacity: {
      resources: { value: 20000, unit: 'kg' },
    },
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Base',
    name: 'Storage Bin',
    capacity: {
      resources: { value: 20000, unit: 'kg' },
    },
  },
  {
    category: 'Base',
    name: 'Transit Tube Access',
    power: { usage: 960, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Oxygen',
    name: 'Algae Terrarium',
    variants: [
      {
        inputs: [
          { name: 'Algae', value: 30, unit: 'g', rate: 'per second' },
          { name: 'Water', value: 300, unit: 'g', rate: 'per second' },
          {
            name: 'Carbon Dioxide',
            value: 333.33,
            unit: 'mg',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Oxygen', value: 40, unit: 'g', rate: 'per second' },
          {
            name: 'Polluted Water',
            value: 290.33,
            unit: 'g',
            rate: 'per second',
          },
        ],
      },
    ],
  },
  {
    category: 'Oxygen',
    name: 'Carbon Skimmer',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Water', value: 1, unit: 'kg', rate: 'per second' },
          { name: 'Carbon Dioxide', value: 300, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Polluted Water', value: 1, unit: 'kg', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Oxygen',
    name: 'Deodorizer',
    variants: [
      {
        inputs: [
          {
            name: 'Polluted Oxygen',
            value: 100,
            unit: 'g',
            rate: 'per second',
          },
          {
            name: 'Sand',
            value: 133.33,
            unit: 'g',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Oxygen', value: 90, unit: 'g', rate: 'per second' },
          { name: 'Clay', value: 143.33, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [
          {
            name: 'Polluted Oxygen',
            value: 100,
            unit: 'g',
            rate: 'per second',
          },
          {
            name: 'Regolith',
            value: 133.33,
            unit: 'g',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Oxygen', value: 90, unit: 'g', rate: 'per second' },
          { name: 'Clay', value: 143.33, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Oxygen',
    name: 'Electrolyzer',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Water', value: 1, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Oxygen', value: 888, unit: 'g', rate: 'per second' },
          { name: 'Hydrogen', value: 112, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Oxygen',
    name: 'Oxygen Diffuser',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Algae', value: 550, unit: 'g', rate: 'per second' }],
        outputs: [
          { name: 'Oxygen', value: 500, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Oxygen',
    name: 'Rust Deoxidizer',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Rust', value: 750, unit: 'g', rate: 'per second' },
          { name: 'Salt', value: 250, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Oxygen', value: 570, unit: 'g', rate: 'per second' },
          { name: 'Chlorine', value: 30, unit: 'g', rate: 'per second' },
          { name: 'Iron Ore', value: 400, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Battery',
    capacity: {
      power: { value: 10, unit: 'kJ' },
    },
  },
  {
    category: 'Power',
    name: 'Coal Generator',
    power: { usage: 0, generation: 600, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Coal', value: 1, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Carbon Dioxide', value: 20, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Hydrogen Generator',
    power: { usage: 0, generation: 800, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Hydrogen', value: 100, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Jumbo Battery',
    capacity: {
      power: { value: 40, unit: 'kJ' },
    },
  },
  {
    category: 'Power',
    name: 'Manual Generator',
    power: { usage: 0, generation: 400, unit: 'W', rate: 'per second' },
    // TODO: Need to add dupe support
    // variants: [
    //   {
    //     inputs: [{ name: 'Dupe', value: 1, unit: 'each' }],
    //   },
    // ],
  },
  {
    category: 'Power',
    name: 'Natural Gas Generator',
    power: { usage: 0, generation: 800, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Natural Gas', value: 90, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          {
            name: 'Carbon Dioxide',
            value: 22.5,
            unit: 'g',
            rate: 'per second',
          },
          {
            name: 'Polluted Water',
            value: 67.5,
            unit: 'g',
            rate: 'per second',
          },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Petroleum Generator',
    capacity: {
      resources: { value: 20, unit: 'kg' },
    },
    power: { usage: 0, generation: 2000, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Petroleum', value: 2, unit: 'kg', rate: 'per second' },
        ],
        outputs: [
          { name: 'Carbon Dioxide', value: 500, unit: 'g', rate: 'per second' },
          { name: 'Polluted Water', value: 750, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [{ name: 'Ethanol', value: 2, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Carbon Dioxide', value: 500, unit: 'g', rate: 'per second' },
          { name: 'Polluted Water', value: 750, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Ethanol Generator',
    capacity: {
      resources: { value: 20, unit: 'kg' },
    },
    power: { usage: 0, generation: 2000, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Ethanol', value: 2, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Carbon Dioxide', value: 500, unit: 'g', rate: 'per second' },
          { name: 'Polluted Water', value: 750, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Smart Battery',
    capacity: {
      power: { value: 20, unit: 'kJ' },
    },
  },
  {
    category: 'Power',
    name: 'Solar Panel',
    power: { usage: 0, generation: 380, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Power',
    name: 'Steam Turbine',
    // TODO: Need to setup system to handle different power for different temps
    power: { usage: 0, generation: 850, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Steam', value: 2, unit: 'kg', rate: 'per second' }],
      },
    ],
  },
  {
    category: 'Power',
    name: 'Wood Burner',
    power: { usage: 0, generation: 300, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Lumber', value: 1.2, unit: 'kg', rate: 'per second' },
        ],
        outputs: [
          { name: 'Carbon Dioxide', value: 170, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Food',
    name: 'Electric Grill',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Food',
    name: 'Gas Range',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Natural Gas', value: 100, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Carbon Dioxide', value: 25, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Food',
    name: 'Incubator',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Food',
    name: 'Microbe Musher',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Food',
    name: 'Refrigerator',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Plumbing',
    name: 'Liquid Filter',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Plumbing',
    name: 'Liquid Pump',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Plumbing',
    name: 'Liquid Shutoff',
    power: { usage: 10, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Plumbing',
    name: 'Mini Liquid Pump',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Ventilation',
    name: 'Gas Filter',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Ventilation',
    name: 'Gas Pump',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Ventilation',
    name: 'Gas Shutoff',
    power: { usage: 10, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Ventilation',
    name: 'Mini Gas Pump',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Refinement',
    name: 'Algae Distiller',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Slime', value: 600, unit: 'g', rate: 'per second' }],
        outputs: [
          { name: 'Algae', value: 200, unit: 'g', rate: 'per second' },
          { name: 'Polluted Water', value: 400, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Compost',
    variants: [
      {
        inputs: [
          { name: 'Polluted Dirt', value: 100, unit: 'g', rate: 'per second' },
        ],
        outputs: [{ name: 'Dirt', value: 100, unit: 'g', rate: 'per second' }],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Desalinator',
    variants: [
      {
        inputs: [
          { name: 'Salt Water', value: 5, unit: 'kg', rate: 'per second' },
        ],
        outputs: [
          { name: 'Water', value: 4.65, unit: 'kg', rate: 'per second' },
          { name: 'Salt', value: 350, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [{ name: 'Brine', value: 5, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Water', value: 3.5, unit: 'kg', rate: 'per second' },
          { name: 'Salt', value: 1.5, unit: 'kg', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Ethanol Distiller',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Lumber', value: 1, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Ethanol', value: 500, unit: 'g', rate: 'per second' },
          {
            name: 'Polluted Dirt',
            value: 333.33,
            unit: 'g',
            rate: 'per second',
          },
          {
            name: 'Carbon Dioxide',
            value: 166.67,
            unit: 'g',
            rate: 'per second',
          },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Fertilizer Synthesizer',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Polluted Water', value: 39, unit: 'g', rate: 'per second' },
          { name: 'Dirt', value: 65, unit: 'g', rate: 'per second' },
          { name: 'Phosphorite', value: 26, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Fertilizer', value: 120, unit: 'g', rate: 'per second' },
          { name: 'Natural Gas', value: 10, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Glass Forge',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Sand', value: 100, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Molten Glass', value: 25, unit: 'kg', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Metal Refinery',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: Break this out into the different variants of Liquid Coolant
    // variants: [
    //   {
    //     inputs: [
    //       {
    //         name: 'Liquid Coolant',
    //         value: 400,
    //         unit: 'kg',
    //         rate: 'per second',
    //       },
    //     ],
    //   },
    // ],
  },
  {
    category: 'Refinement',
    name: 'Molecular Forge',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: need to handle different inputs and outputs
  },
  {
    category: 'Refinement',
    name: 'Oil Refinery',
    power: { usage: 480, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Crude Oil', value: 10, unit: 'kg', rate: 'per second' },
        ],
        outputs: [
          { name: 'Petroleum', value: 5, unit: 'kg', rate: 'per second' },
          { name: 'Natural Gas', value: 90, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Oxylite Refinery',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Oxygen', value: 600, unit: 'g', rate: 'per second' },
          { name: 'Gold', value: 3, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Oxylite', value: 600, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Polymer Press',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Petroleum', value: 833.33, unit: 'g', rate: 'per second' },
        ],
        outputs: [
          { name: 'Plastic', value: 500, unit: 'g', rate: 'per second' },
          { name: 'Steam', value: 8.33, unit: 'g', rate: 'per second' },
          {
            name: 'Carbon Dioxide',
            value: 8.33,
            unit: 'g',
            rate: 'per second',
          },
        ],
      },
    ],
  },
  {
    category: 'Refinement',
    name: 'Rock Crusher',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Refinement',
    name: 'Water Sieve',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [
          { name: 'Polluted Water', value: 5, unit: 'kg', rate: 'per second' },
          {
            name: 'Sand',
            value: 1,
            unit: 'kg',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Water', value: 5, unit: 'kg', rate: 'per second' },
          { name: 'Polluted Dirt', value: 200, unit: 'g', rate: 'per second' },
        ],
      },
      {
        inputs: [
          { name: 'Polluted Water', value: 5, unit: 'kg', rate: 'per second' },
          {
            name: 'Regolith',
            value: 1,
            unit: 'kg',
            rate: 'per second',
          },
        ],
        outputs: [
          { name: 'Water', value: 5, unit: 'kg', rate: 'per second' },
          { name: 'Polluted Dirt', value: 200, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Medicine',
    name: 'Disease Clinic',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Medicine',
    name: 'Massage Table',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Furniture',
    name: 'Arcade Cabinet',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Furniture',
    name: 'Ceiling Light',
    power: { usage: 10, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Furniture',
    name: 'Espresso Machine',
    power: { usage: 480, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: need input and output once per user is an option
  },
  {
    category: 'Furniture',
    name: 'Jukebot',
    power: { usage: 960, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Furniture',
    name: 'Lamp',
    power: { usage: 8, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Atmo Suit Dock',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Exosuit Forge',
    power: { usage: 480, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Jet Suit Dock',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  // TODO: need to support per use
  // {
  //   category: 'Stations',
  //   name: 'Farm Station',

  //
  //   inputs: [
  //     { name: 'Fertilizer', value: 5, unit: 'kg', rate: 'per use' }
  //   ],
  //
  // },
  // {
  //   category: 'Stations',
  //   name: 'Power Control Station',

  //
  //   inputs: [
  //     { name: 'Refined Metal', value: 5, unit: 'kg', rate: 'per use' }
  //   ],
  //
  // },
  {
    category: 'Stations',
    name: 'Research Station',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: Need to support per use
    // inputs: [
    //   { name: 'Dirt', value: 50, unit: 'kg', rate: 'per research' }
    // ],
  },
  {
    category: 'Stations',
    name: 'Skill Scrubber',
    power: { usage: 480, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Super Computer',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: Need to support per user
    // inputs: [
    //   { name: 'Water', value: 50, unit: 'kg', rate: 'per research' }
    // ],
  },
  {
    category: 'Stations',
    name: 'Telescope',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Textile Loom',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Stations',
    name: 'Virtual Planetarium',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Utilities',
    name: 'Ice Maker',
    power: { usage: 60, generation: 0, unit: 'W', rate: 'per second' },
    // TODO: per user
    // inputs: [
    //   { name: 'Water', value 30, unit: 'kg', rate: 'per use' }
    // ],
  },
  {
    category: 'Utilities',
    name: 'Liquid Tepidizer',
    power: { usage: 960, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Utilities',
    name: 'Oil Well',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
    variants: [
      {
        inputs: [{ name: 'Water', value: 1, unit: 'kg', rate: 'per second' }],
        outputs: [
          { name: 'Crude Oil', value: 3.33, unit: 'kg', rate: 'per second' },
          { name: 'Natural Gas', value: 33.3, unit: 'g', rate: 'per second' },
        ],
      },
    ],
  },
  {
    category: 'Utilities',
    name: 'Space Heater',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Utilities',
    name: 'Thermo Aquatuner',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Utilities',
    name: 'Thermo Regulator',
    power: { usage: 240, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Automation',
    name: 'Duplicant Checkpoint',
    power: { usage: 10, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Automation',
    name: 'Space Scanner',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Shipping',
    name: 'Auto-Sweeper',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Shipping',
    name: 'Conveyor Loader',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Shipping',
    name: 'Conveyor Shutoff',
    power: { usage: 10, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Shipping',
    name: 'Robo-Miner',
    power: { usage: 120, generation: 0, unit: 'W', rate: 'per second' },
  },
  {
    category: 'Rocketry',
    name: 'Gantry',
    power: { usage: 1200, generation: 0, unit: 'W', rate: 'per second' },
  },
];
