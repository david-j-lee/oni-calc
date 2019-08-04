import IFoodInput from './../interfaces/IFoodInput';

export function getFood(food, inputs: IFoodInput[]) {
  if (inputs) {
    return updateFoodWithInputs(food, inputs);
  } else {
    return getFoodWithDefaultInputs(food);
  }
}

function updateFoodWithInputs(food, inputs: IFoodInput[]) {
  return food.map(item => {
    const input = inputs.find(i => i.name === item.name);
    return {
      ...item,
      quantity: input && input.quantity ? input.quantity : 0,
    };
  });
}

function getFoodWithDefaultInputs(food) {
  return food.map(item => ({ ...item, quantity: 0 }));
}

export function getFoodWithClearedInputs(food) {
  const newFood = getFoodWithDefaultInputs(food);
  saveToLocalStorage(newFood);
  return newFood;
}

export function updateFoodQuantity(food, name: string, quantity: number) {
  const newFood = food.map(item => ({
    ...item,
    quantity: item.name === name ? quantity : item.quantity,
  }));
  saveToLocalStorage(newFood);
  return newFood;
}

export function getFoodInputsForResource(food, resourceName: string) {
  return getFoodIOsForResource(food, 'inputs', resourceName);
}

export function getFoodOutputsForResource(food, resourceName: string) {
  return getFoodIOsForResource(food, 'outputs', resourceName);
}

function getFoodIOsForResource(food, type: string, resourceName: string) {
  if (type !== 'inputs' && type !== 'outputs') {
    throw new Error('Type must be inputs or outputs');
  }

  const newFood = food.filter(item => item.quantity > 0);
  if (newFood.length === 0) return [];

  return newFood
    .map(item =>
      item[type]
        .filter(io => io.name === resourceName)
        .map(io => ({
          ...io,
          food: item,
          valueExtended: getExtendedValue(io.value, item.quantity),
        })),
    )
    .reduce((a, b) => a.concat(b));
}

function getExtendedValue(value: number, quantity: number) {
  const SECONDS_IN_A_CYCLE = 600;
  return (quantity * value) / SECONDS_IN_A_CYCLE;
}

function saveToLocalStorage(food) {
  localStorage.setItem(
    'food',
    JSON.stringify(
      food.map(item => ({ name: item.name, quantity: item.quantity })),
    ),
  );
}
