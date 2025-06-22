import { ResourceName } from '../data/resources';
import IDupesInput from '../interfaces/IDupesInput';
import { IGameMode } from '../interfaces/IGameMode';
import IDupeTrait from './../interfaces/IDupeTrait';
import IDupes from './../interfaces/IDupes';
import IResource, {
  ResourceRate,
  ResourceUnit,
  ResourceValue,
} from './../interfaces/IResource';
import { getGameModeValue, getStandardIO } from './commonUtils';
import { updateResourcesWithDupes } from './resourceUtils';

export const setDupesQuantity = (
  gameMode: IGameMode,
  resources: IResource[],
  dupes: IDupes,
  quantity: number,
) => {
  const newDupes = updateDupeQuantity(gameMode, dupes, quantity);
  return {
    resources: updateResourcesWithDupes(gameMode, resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeTraitQuantity = (
  gameMode: IGameMode,
  resources: IResource[],
  dupes: IDupes,
  name: string,
  quantity: number,
) => {
  const newDupes = updateDupeTraitQuantity(gameMode, dupes, name, quantity);
  return {
    resources: updateResourcesWithDupes(gameMode, resources, newDupes),
    dupes: newDupes,
  };
};

export const setDupeWaste = (
  gameMode: IGameMode,
  resources: IResource[],
  dupes: IDupes,
  prop: dupesWastePropNames,
  value: number,
) => {
  const newDupes = getDupeWaste(dupes, prop, value);
  return {
    resources: updateResourcesWithDupes(gameMode, resources, newDupes),
    dupes: newDupes,
  };
};

export const clearDupeInputs = (
  gameMode: IGameMode,
  resources: IResource[],
  dupes: IDupes,
) => {
  const newDupes = getDupesWithClearedInputs(dupes);
  return {
    resources: updateResourcesWithDupes(gameMode, resources, newDupes),
    dupes: newDupes,
  };
};

// ----------------------------------------------

export function getDupes(
  gameMode: IGameMode,
  dupes: IDupes,
  inputs?: IDupesInput,
) {
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
  gameMode: IGameMode,
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

export function getDupesInputsForResource(
  gameMode: IGameMode,
  dupes: IDupes,
  resourceName: string,
) {
  const base = getBaseIOForResource(gameMode, dupes, 'inputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'inputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'inputs', resourceName);
  return base.concat(traits).concat(waste);
}

export function getDupesOutputsForResource(
  gameMode: IGameMode,
  dupes: IDupes,
  resourceName: string,
) {
  const base = getBaseIOForResource(gameMode, dupes, 'outputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'outputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'outputs', resourceName);
  return base.concat(traits).concat(waste);
}

function getBaseIOForResource(
  gameMode: IGameMode,
  dupes: IDupes,
  type: 'inputs' | 'outputs',
  resourceName: string,
) {
  return dupes[type]
    .filter((io) => io.name === resourceName)
    .map((io) => ({
      ...io,
      valueExtended: (getStandardIO(gameMode, io).value as number) * dupes.quantity,
      dupe: { reference: 'Base Dupe', quantity: dupes.quantity },
    }));
}

function getTraitsIOForResource(
  traits: IDupeTrait[],
  type: 'inputs' | 'outputs',
  resourceName: string,
) {
  const filteredTraits = traits.filter((trait) => trait.quantity > 0);
  if (filteredTraits.length === 0) return [];

  return filteredTraits
    .map((trait) =>
      trait[type].map((io) => ({
        ...io,
        dupe: { reference: trait.name, quantity: trait.quantity },
        valueExtended: (io.value as number) * trait.quantity,
      })),
    )
    .reduce((a, b) => a.concat(b), [])
    .filter((io) => io.name === resourceName);
}

export type dupesWastePropNames =
  | 'pollutedWaterValue'
  | 'pollutedDirtValue'
  | 'waterValue'
  | 'dirtValue';

export const DUPES_WASTE_PROPS: {
  name: dupesWastePropNames;
  title: ResourceName;
}[] = [
  { name: 'pollutedWaterValue', title: 'Polluted Water' },
  { name: 'pollutedDirtValue', title: 'Polluted Dirt' },
  { name: 'waterValue', title: 'Water' },
  { name: 'dirtValue', title: 'Dirt' },
];

function getWasteIOForResource(
  dupes: IDupes,
  type: 'inputs' | 'outputs',
  resourceName: string,
) {
  const arr: {
    name: ResourceName;
    value: ResourceValue;
    unit: ResourceUnit;
    rate: ResourceRate;
    valueExtended: number;
    utilization: number;
    dupe: { reference: string; quantity: number };
  }[] = [];

  DUPES_WASTE_PROPS.forEach((prop) => {
    const dupesValue = dupes[prop.name];

    const isValid =
      prop.title === resourceName &&
      ((dupesValue < 0 && type === 'inputs') ||
        (dupesValue > 0 && type === 'outputs'));

    if (isValid) {
      const value = type === 'inputs' ? -dupesValue / 600 : dupesValue / 600;

      arr.push({
        name: prop.title,
        value: value,
        unit: 'g',
        rate: 'per second',
        valueExtended: value * dupes.quantity,
        utilization: 100,
        dupe: { reference: 'Waste', quantity: dupes.quantity },
      });
    }
  });

  return arr;
}

export function updateDupeQuantity(
  gameMode: IGameMode,
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
  gameMode: IGameMode,
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

export function getDupeWaste(
  dupes: IDupes,
  prop: dupesWastePropNames,
  value: number,
) {
  const newDupes = { ...dupes };

  if (!prop) return newDupes;

  newDupes[prop] = value;

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getCaloriesRequired(gameMode: IGameMode, dupes: IDupes) {
  return (
    getBaseCaloriesRequired(gameMode, dupes) +
    getTraitCaloriesRequired(dupes.traits)
  );
}

function getBaseCaloriesRequired(gameMode: IGameMode, dupes: IDupes) {
  if (!dupes.inputs) return 0;
  const inputs = dupes.inputs.filter((input) => input.name === 'Food');
  if (inputs.length === 0) return 0;

  return inputs
    .map((input) => getGameModeValue(gameMode, input.value) * dupes.quantity)
    .reduce((a, b) => a + b, 0);
}

function getTraitCaloriesRequired(traits: IDupeTrait[]) {
  const inputs = traits
    .map((trait) =>
      trait.inputs.map((input) => ({ ...input, quantity: trait.quantity })),
    )
    .reduce((a, b) => a.concat(b), [])
    .filter((input) => input.name === 'Food');

  if (inputs.length === 0) return 0;

  return (
    inputs
      // TODO: confirm that no-sweat is 50% less
      .map((input) => (input.value as number) * input.quantity)
      .reduce((a, b) => a + b, 0)
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
