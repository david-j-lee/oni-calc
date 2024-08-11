import IFood from '../interfaces/IFood';
import IIO from '../interfaces/IIO';
import IPlantRequirement from './../interfaces/IPlantRequirement';
import IPlant, { IPlantBase } from './../interfaces/IPlant';

import { getSortedArray, getStandardIO } from './commonUtils';

export const sortPlants = (
  plants: IPlant[],
  currentOrderBy: string,
  orderBy: string,
  order: string,
) => {
  const newOrder =
    currentOrderBy === orderBy && order === 'desc' ? 'asc' : 'desc';
  return {
    plants: getSortedArray(plants, orderBy, newOrder),
    plantsOrderBy: orderBy,
    plantsOrder: newOrder,
  };
};

export function updatePlants(plants: IPlantBase[], food: IFood[]): IPlant[] {
  const foodWithQty = food.filter((item) => item.quantity > 0);

  if (foodWithQty.length === 0) {
    return plants.map((plant) => ({
      ...plant,
      rawFood: [],
      preparedFood: [],
      inputs:
        plant.inputs?.map((input) => ({ ...input, valueExtended: 0 })) ?? [],
      outputs: [],
      quantity: 0,
    }));
  } else {
    const rawFoodRequirements = getRawFoodRequirements(food);
    const preparedFoodRequirements = getPreparedFoodRequirements(food);

    return plants.map((plant) => ({
      ...plant,
      rawFood: rawFoodRequirements.filter((f) => f.name === plant.name),
      preparedFood: preparedFoodRequirements.filter(
        (f) => f.name === plant.name,
      ),
      inputs:
        plant.inputs?.map((input) => ({ ...input, valueExtended: 0 })) ?? [],
      outputs: [],
      quantity: getNumberOfPlants(
        getRequirement(
          plant.name,
          rawFoodRequirements,
          preparedFoodRequirements,
        ),
        plant.growthRate.value,
        plant.yield,
      ),
    }));
  }
}

function getRawFoodRequirements(food: IFood[]) {
  const newFoods = food.filter((item) => item.quantity > 0 && item.isRaw);
  if (newFoods.length === 0) return [];

  return newFoods
    .map((item) =>
      item.requirements.map((requirement) => ({
        ...requirement,
        food: item,
        quantity: item.quantity,
      })),
    )
    .reduce((a, b) => a.concat(b), [])
    .filter((req) => req.type === 'Plant');
}

function getPreparedFoodRequirements(food: IFood[]) {
  const rawFoods = food.filter((item) => item.isRaw);
  const preparedFoods = food.filter((item) => !item.isRaw);
  return getPreparedFoodInputs(preparedFoods, rawFoods);
}

// TODO: refactor?
function getPreparedFoodInputs(preparedFoods: IFood[], rawFoods: IFood[]) {
  if (rawFoods.length > 0 && preparedFoods.length > 0) {
    const inputs = getRawFoodInputsForPreparedFood(preparedFoods, rawFoods);
    if (inputs.length > 0) {
      return getPreparedFoodInputsFromRawFoodInputs(inputs);
    } else {
      return [];
    }
  } else {
    return [];
  }
}

// TODO: refactor?
function getRawFoodInputsForPreparedFood(
  preparedFoods: IFood[],
  rawFoods: IFood[],
): IFood[] {
  const inputsFromPreparedFood = (item: IFood): (IFood | IFood[] | null)[] => {
    return item.inputs.map((input) => {
      const rawFood = rawFoods.find((f) => f.name === input.name);
      if (rawFood) {
        return {
          ...rawFood,
          name: item.name,
          quantity: item.quantity * (input.value as number),
        } as IFood;
      } else {
        let preparedFood = preparedFoods.find((f) => f.name === input.name);
        if (preparedFood) {
          preparedFood = {
            ...preparedFood,
            quantity: item.quantity * (input.value as number),
          };
          return inputsFromPreparedFood(preparedFood) as IFood[];
        }
        return null;
      }
    });
  };

  return preparedFoods
    .filter((item) => item.quantity > 0)
    .map(inputsFromPreparedFood)
    .reduce((a, b) => a.concat(b).flat(), [])
    .filter((item) => item) as IFood[];
}

// TODO: refactor?
function getPreparedFoodInputsFromRawFoodInputs(inputs: IFood[]) {
  return inputs
    .map((input) =>
      input.requirements.map((requirement) => ({
        ...requirement,
        food: input,
        quantity: input.quantity,
      })),
    )
    .reduce((a, b) => a.concat(b), [])
    .filter((req) => req.type === 'Plant');
}

function getRequirement(
  plantName: string,
  rawFoodRequirements: IPlantRequirement[],
  preparedFoodRequirements: IPlantRequirement[],
) {
  let requirement = 0;

  // raw foods
  const rawFoodReq = rawFoodRequirements.filter(
    (req) => req.name === plantName,
  );
  if (rawFoodReq && rawFoodReq.length > 0) {
    requirement += rawFoodReq
      .map((req) => req.quantity)
      .reduce((a, b) => a + b, 0);
  }

  // prepared foods
  const preparedFoodReq = preparedFoodRequirements.filter(
    (req) => req.name === plantName,
  );
  if (preparedFoodReq && preparedFoodReq.length > 0) {
    requirement += preparedFoodReq
      .map((req) => req.quantity)
      .reduce((a, b) => a + b, 0);
  }

  return requirement;
}

function getNumberOfPlants(
  requirement: number,
  growthRate: number,
  plantYield: number,
) {
  return requirement / (plantYield / growthRate);
}

export function getPlantsInputsForResource(
  plants: IPlant[],
  resourceName: string,
) {
  return getIOForResource(plants, 'inputs', resourceName);
}

export function getPlantsOutputsForResource(
  plants: IPlant[],
  resourceName: string,
) {
  return getIOForResource(plants, 'outputs', resourceName);
}

function getIOForResource(
  plants: IPlant[],
  type: 'inputs' | 'outputs',
  resourceName: string,
) {
  const newPlants = plants.filter((plant) => plant.quantity > 0);
  if (newPlants.length === 0) return [];

  return newPlants
    .map((plant) =>
      plant[type]
        .filter((io: IIO) => io.name === resourceName)
        .map((io: IIO) => getExtendedValue(plant, getStandardIO(io))),
    )
    .reduce((a, b) => a.concat(b), []);
}

function getExtendedValue(plant: IPlant, io: IIO) {
  return {
    ...io,
    plant,
    valueExtended: plant.quantity * (io.value as number),
  };
}
