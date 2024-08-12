import IFood, { IFoodBase } from '../interfaces/IFood';
import IGameModeValue from '../interfaces/IGameModeValue';
import IPlant from '../interfaces/IPlant';
import IFoodInput from './../interfaces/IFoodInput';
import IResource from './../interfaces/IResource';
import { updatePlants } from './plantUtils';
import { updateResourcesWithFoodAndPlants } from './resourceUtils';

export const setFoodQuantity = (
  resources: IResource[],
  plants: IPlant[],
  food: IFood[],
  name: string,
  quantity: number,
) => {
  const newFood = updateFoodQuantity(food, name, quantity);
  const newPlants = updatePlants(plants, newFood);
  const newResources = updateResourcesWithFoodAndPlants(
    resources,
    newPlants,
    newFood,
  );
  return {
    food: newFood,
    resources: newResources,
    plants: newPlants,
  };
};

export const clearFoodInputs = (
  resources: IResource[],
  plants: IPlant[],
  food: IFood[],
) => {
  const newFood = getFoodWithClearedInputs(food);
  const newPlants = updatePlants(plants, newFood);
  return {
    resources: updateResourcesWithFoodAndPlants(resources, newPlants, newFood),
    food: newFood,
    plants: newPlants,
  };
};

// ------------------------------------------------------------

export function getFood(food: IFoodBase[], inputs?: IFoodInput[]): IFood[] {
  if (inputs) {
    return updateFoodWithInputs(food, inputs);
  } else {
    return getFoodWithDefaultInputs(food);
  }
}

function updateFoodWithInputs(
  food: IFoodBase[],
  inputs: IFoodInput[],
): IFood[] {
  return food.map((item) => {
    const input = inputs.find((i) => i.name === item.name);
    return {
      ...item,
      quantity: input && input.quantity ? input.quantity : 0,
      inputs:
        item.inputs.map((input) => ({ ...input, valueExtended: 0 })) ?? [],
      outputs: [],
    } as IFood;
  });
}

function getFoodWithDefaultInputs(food: IFoodBase[]): IFood[] {
  return food.map((item) => ({
    ...item,
    inputs: item.inputs.map((input) => ({ ...input, valueExtended: 0 })),
    outputs: [],
    quantity: 0,
  }));
}

export function getFoodWithClearedInputs(food: IFood[]) {
  const newFood = getFoodWithDefaultInputs(food);
  saveToLocalStorage(newFood);
  return newFood;
}

export function updateFoodQuantity(
  food: IFood[],
  name: string,
  quantity: number,
) {
  const newFood = food.map((item) => ({
    ...item,
    quantity: item.name === name ? quantity : item.quantity,
  }));
  saveToLocalStorage(newFood);
  return newFood;
}

export function getFoodInputsForResource(food: IFood[], resourceName: string) {
  return getFoodIOsForResource(food, 'inputs', resourceName);
}

export function getFoodOutputsForResource(food: IFood[], resourceName: string) {
  return getFoodIOsForResource(food, 'outputs', resourceName);
}

function getFoodIOsForResource(
  food: IFood[],
  type: 'inputs' | 'outputs',
  resourceName: string,
) {
  const newFood = food.filter((item) => item.quantity > 0);
  if (newFood.length === 0) return [];

  return newFood
    .map((item) =>
      item[type]
        .filter((io) => io.name === resourceName)
        .map((io) => ({
          ...io,
          food: item,
          valueExtended: getExtendedValue(io.value, item.quantity),
        })),
    )
    .reduce((a, b) => a.concat(b), []);
}

function getExtendedValue(value: number | IGameModeValue, quantity: number) {
  if (typeof value !== 'number') {
    return value.noSweat || value.survival;
  }

  const SECONDS_IN_A_CYCLE = 600;
  return (quantity * value) / SECONDS_IN_A_CYCLE;
}

function saveToLocalStorage(food: IFood[]) {
  localStorage.setItem(
    'food',
    JSON.stringify(
      food.map((item) => ({ name: item.name, quantity: item.quantity })),
    ),
  );
}
