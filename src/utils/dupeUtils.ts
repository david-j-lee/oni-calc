import { updateResourcesWithDupes } from './resourceUtils';

export const setDupesQuantity = (
  gameMode: string,
  resources,
  dupes,
  quantity: number,
) => {
  const newDupes = updateDupeQuantity(gameMode, dupes, quantity);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeTraitQuantity = (
  gameMode: string,
  resources,
  dupes,
  name: string,
  quantity: number,
) => {
  const newDupes = updateDupeTraitQuantity(gameMode, dupes, name, quantity);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeWaste = (resources, dupes, prop, value) => {
  const newDupes = getDupeWaste(dupes, prop, value);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const clearDupeInputs = (resources, dupes) => {
  const newDupes = getDupesWithClearedInputs(dupes);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

// ----------------------------------------------

export function getDupes(gameMode: string, dupes, inputs) {
  if (inputs && inputs.traits) {
    return updateDupesWithInputs(gameMode, dupes, inputs);
  } else {
    return getDupesWithDefaultInputs(dupes);
  }
}

function getDupesWithDefaultInputs(dupes) {
  return {
    ...dupes,
    quantity: 0,
    waterValue: 0,
    pollutedWaterValue: 0,
    dirtValue: 0,
    pollutedDirtValue: 0,
    traits:
      dupes.traits && dupes.traits.length > 0
        ? dupes.traits.map(trait => {
            return {
              ...trait,
              quantity: 0,
            };
          })
        : [],
  };
}

function updateDupesWithInputs(gameMode: string, dupes, inputs) {
  const newDupes = {
    ...dupes,
    waterValue: inputs.waterValue || 0,
    pollutedWaterValue: inputs.pollutedWaterValue || 0,
    dirtValue: inputs.dirtValue || 0,
    pollutedDirtValue: inputs.pollutedDirtValue || 0,
    quantity: inputs.total || 0,
    traits: dupes.traits.map(trait => {
      if (inputs.traits && inputs.traits.length > 0) {
        const inputTrait = inputs.traits.find(
          input => input.name === trait.name,
        );
        return { ...trait, quantity: inputTrait.quantity || 0 };
      } else {
        return {};
      }
    }),
  };
  newDupes.caloriesRequired = getCaloriesRequired(gameMode, newDupes);
  return newDupes;
}

export function getDupesWithClearedInputs(dupes) {
  const newDupes = getDupesWithDefaultInputs(dupes);
  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getDupesInputsForResource(dupes, resourceName: string) {
  const base = getBaseIOForResource(dupes, 'inputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'inputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'inputs', resourceName);
  return base.concat(traits).concat(waste);
}

export function getDupesOutputsForResource(dupes, resourceName: string) {
  const base = getBaseIOForResource(dupes, 'outputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'outputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'outputs', resourceName);
  return base.concat(traits).concat(waste);
}

function getBaseIOForResource(dupes, type, resourceName: string) {
  return dupes[type]
    .filter(io => io.name === resourceName)
    .map(io => ({
      ...io,
      valueExtended: io.value * dupes.quantity,
      dupe: { reference: 'Base Dupe', quantity: dupes.quantity },
    }));
}

function getTraitsIOForResource(traits, type: string, resourceName: string) {
  const filteredTraits = traits.filter(trait => trait.quantity > 0);
  if (filteredTraits.length === 0) return [];

  return filteredTraits
    .map(trait =>
      trait[type].map(io => ({
        ...io,
        dupe: { reference: trait.name, quantity: trait.quantity },
        valueExtended: io.value * trait.quantity,
      })),
    )
    .reduce((a, b) => a.concat(b))
    .filter(io => io.name === resourceName);
}

const WASTE_PROPERTIES = [
  { name: 'pollutedWaterValue', title: 'Polluted Water' },
  { name: 'pollutedDirtValue', title: 'Polluted Dirt' },
  { name: 'waterValue', title: 'Water' },
  { name: 'dirtValue', title: 'Dirt' },
];

function getWasteIOForResource(dupes, type: string, resourceName: string) {
  let arr: any = []; // TODO: Types

  WASTE_PROPERTIES.forEach(prop => {
    const isValid =
      prop.title === resourceName &&
      ((dupes[prop.name] < 0 && type === 'inputs') ||
        (dupes[prop.name] > 0 && type === 'outputs'));

    if (isValid) {
      const value =
        type === 'inputs' ? -dupes[prop.name] / 600 : dupes[prop.name] / 600;

      arr.push({
        name: prop.title,
        value: value,
        unit: 'g',
        rate: 'per second',
        valueExtended: value * dupes.quantity,
        dupe: { reference: 'Waste', quantity: dupes.quantity },
      });
    }
  });

  return arr;
}

export function updateDupeQuantity(gameMode: string, dupes, quantity: number) {
  const newDupes = {
    ...dupes,
    quantity,
    traits: dupes.traits.map(trait => ({
      ...trait,
      quantity: trait.quantity > quantity ? quantity : trait.quantity,
    })),
  };

  newDupes.caloriesRequired = getCaloriesRequired(gameMode, newDupes);

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function updateDupeTraitQuantity(
  gameMode: string,
  dupes,
  name: string,
  quantity: number,
) {
  const newDupes = {
    ...dupes,
    traits: dupes.traits.map(trait => ({
      ...trait,
      quantity:
        trait.name === name
          ? quantity > dupes.quantity
            ? dupes.quantity
            : quantity
          : trait.quantity,
    })),
  };

  newDupes.caloriesRequired = getCaloriesRequired(gameMode, newDupes);

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getDupeWaste(dupes, prop: string, value) {
  const newDupes = { ...dupes };

  if (prop === '') return newDupes;

  newDupes[prop] = value;

  saveToLocalStorage(newDupes);
  return newDupes;
}

function getCaloriesRequired(gameMode, dupes) {
  return (
    getBaseCaloriesRequired(gameMode, dupes) +
    getTraitCaloriesRequired(gameMode, dupes.traits)
  );
}

function getBaseCaloriesRequired(gameMode, dupes) {
  if (!dupes.inputs) return 0;
  const inputs = dupes.inputs.filter(input => input.name === 'Food');
  if (inputs.length === 0) return 0;

  return inputs
    .map(
      input =>
        input.value * (gameMode === 'no-sweat' ? 0.5 : 0) * dupes.quantity,
    )
    .reduce((a, b) => a + b);
}

function getTraitCaloriesRequired(gameMode, traits) {
  const inputs = traits
    .map(trait =>
      trait.inputs.map(input => ({ ...input, quantity: trait.quantity })),
    )
    .reduce((a, b) => a.concat(b))
    .filter(input => input.name === 'Food');

  if (inputs.length === 0) return 0;

  return (
    inputs
      // TODO: confirm that no-sweat is 50% less
      .map(
        input =>
          input.value * (gameMode === 'no-sweat' ? 0.5 : 0) * input.quantity,
      )
      .reduce((a, b) => a + b)
  );
}

function saveToLocalStorage(dupes) {
  localStorage.setItem(
    'dupes',
    JSON.stringify({
      total: dupes.quantity,
      waterValue: dupes.waterValue || 0,
      pollutedWaterValue: dupes.pollutedWaterValue || 0,
      dirtValue: dupes.dirtValue || 0,
      pollutedDirtValue: dupes.pollutedDirtValue || 0,
      traits: dupes.traits.map(trait => ({
        name: trait.name,
        quantity: trait.quantity || 0,
      })),
    }),
  );
}
