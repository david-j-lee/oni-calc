import IResource from './../interfaces/IResource';
import IDupes from './../interfaces/IDupes';
import IDupesInput from '../interfaces/IDupesInput';

import { getGameModeValue } from './commonUtils';
import { updateResourcesWithDupes } from './resourceUtils';
import IIO from '../interfaces/IIO';
import IDupeTrait from './../interfaces/IDupeTrait';

export const setDupesQuantity = (
  gameMode: string,
  resources: IResource[],
  dupes: IDupes,
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
  resources: IResource[],
  dupes: IDupes,
  name: string,
  quantity: number,
) => {
  const newDupes = updateDupeTraitQuantity(gameMode, dupes, name, quantity);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeWaste = (
  resources: IResource[],
  dupes: IDupes,
  prop: string,
  value: number,
) => {
  const newDupes = getDupeWaste(dupes, prop, value);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

export const clearDupeInputs = (resources: IResource[], dupes: IDupes) => {
  const newDupes = getDupesWithClearedInputs(dupes);
  return {
    resources: updateResourcesWithDupes(resources, newDupes),
    dupes: newDupes,
  };
};

// ----------------------------------------------

export function getDupes(gameMode: string, dupes: IDupes, inputs: IDupesInput) {
  if (inputs && inputs.traits) {
    return updateDupesWithInputs(gameMode, dupes, inputs);
  } else {
    return getDupesWithDefaultInputs(dupes);
  }
}

function getDupesWithDefaultInputs(dupes: IDupes) {
  return {
    ...dupes,
    quantity: 0,
    waterValue: 0,
    pollutedWaterValue: 0,
    dirtValue: 0,
    pollutedDirtValue: 0,
    traits:
      dupes.traits && dupes.traits.length > 0
        ? dupes.traits.map((trait) => {
            return {
              ...trait,
              quantity: 0,
            };
          })
        : [],
  };
}

function updateDupesWithInputs(
  gameMode: string,
  dupes: IDupes,
  inputs: IDupesInput,
) {
  const newDupes: IDupes = {
    ...dupes,
    waterValue: inputs.waterValue || 0,
    pollutedWaterValue: inputs.pollutedWaterValue || 0,
    dirtValue: inputs.dirtValue || 0,
    pollutedDirtValue: inputs.pollutedDirtValue || 0,
    quantity: inputs.total || 0,
    traits: dupes.traits.map((trait) => {
      if (inputs.traits && inputs.traits.length > 0) {
        const inputTrait = inputs.traits.find(
          (input) => input.name === trait.name,
        );
        return { ...trait, quantity: inputTrait?.quantity || 0 };
      } else {
        return trait;
      }
    }),
  };
  newDupes.caloriesRequired = getCaloriesRequired(gameMode, newDupes);
  return newDupes;
}

export function getDupesWithClearedInputs(dupes: IDupes) {
  const newDupes = getDupesWithDefaultInputs(dupes);
  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getDupesInputsForResource(dupes: IDupes, resourceName: string) {
  const base = getBaseIOForResource(dupes, 'inputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'inputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'inputs', resourceName);
  return base.concat(traits).concat(waste);
}

export function getDupesOutputsForResource(
  dupes: IDupes,
  resourceName: string,
) {
  const base = getBaseIOForResource(dupes, 'outputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'outputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'outputs', resourceName);
  return base.concat(traits).concat(waste);
}

function getBaseIOForResource(
  dupes: IDupes,
  type: string,
  resourceName: string,
) {
  return dupes[type]
    .filter((io: IIO) => io.name === resourceName)
    .map((io: IIO) => ({
      ...io,
      valueExtended: io.value * dupes.quantity,
      dupe: { reference: 'Base Dupe', quantity: dupes.quantity },
    }));
}

function getTraitsIOForResource(
  traits: IDupeTrait[],
  type: string,
  resourceName: string,
) {
  const filteredTraits = traits.filter((trait) => trait.quantity > 0);
  if (filteredTraits.length === 0) return [];

  return filteredTraits
    .map((trait) =>
      trait[type].map((io: IIO) => ({
        ...io,
        dupe: { reference: trait.name, quantity: trait.quantity },
        valueExtended: io.value * trait.quantity,
      })),
    )
    .reduce((a, b) => a.concat(b))
    .filter((io: IIO) => io.name === resourceName);
}

const WASTE_PROPERTIES = [
  { name: 'pollutedWaterValue', title: 'Polluted Water' },
  { name: 'pollutedDirtValue', title: 'Polluted Dirt' },
  { name: 'waterValue', title: 'Water' },
  { name: 'dirtValue', title: 'Dirt' },
];

function getWasteIOForResource(
  dupes: IDupes,
  type: string,
  resourceName: string,
) {
  let arr: any = []; // TODO: Types

  WASTE_PROPERTIES.forEach((prop) => {
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

export function updateDupeQuantity(
  gameMode: string,
  dupes: IDupes,
  quantity: number,
) {
  const newDupes = {
    ...dupes,
    quantity,
    traits: dupes.traits.map((trait) => ({
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
  dupes: IDupes,
  name: string,
  quantity: number,
) {
  const newDupes = {
    ...dupes,
    traits: dupes.traits.map((trait) => ({
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

export function getDupeWaste(dupes: IDupes, prop: string, value: number) {
  const newDupes = { ...dupes };

  if (prop === '') return newDupes;

  newDupes[prop] = value;

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getCaloriesRequired(gameMode: string, dupes: IDupes) {
  return (
    getBaseCaloriesRequired(gameMode, dupes) +
    getTraitCaloriesRequired(dupes.traits)
  );
}

function getBaseCaloriesRequired(gameMode: string, dupes: IDupes) {
  if (!dupes.inputs) return 0;
  const inputs = dupes.inputs.filter((input) => input.name === 'Food');
  if (inputs.length === 0) return 0;

  return inputs
    .map((input) => getGameModeValue(gameMode, input.value) * dupes.quantity)
    .reduce((a, b) => a + b);
}

function getTraitCaloriesRequired(traits: IDupeTrait[]) {
  const inputs = traits
    .map((trait) =>
      trait.inputs.map((input) => ({ ...input, quantity: trait.quantity })),
    )
    .reduce((a, b) => a.concat(b))
    .filter((input) => input.name === 'Food');

  if (inputs.length === 0) return 0;

  return (
    inputs
      // TODO: confirm that no-sweat is 50% less
      .map((input) => input.value * input.quantity)
      .reduce((a, b) => a + b)
  );
}

function saveToLocalStorage(dupes: IDupes) {
  localStorage.setItem(
    'dupes',
    JSON.stringify({
      total: dupes.quantity,
      waterValue: dupes.waterValue || 0,
      pollutedWaterValue: dupes.pollutedWaterValue || 0,
      dirtValue: dupes.dirtValue || 0,
      pollutedDirtValue: dupes.pollutedDirtValue || 0,
      traits: dupes.traits.map((trait) => ({
        name: trait.name,
        quantity: trait.quantity || 0,
      })),
    }),
  );
}
