export function getDupes(dupes, inputs) {
  if (inputs && inputs.traits) {
    return updateDupesWithInputs(dupes, inputs);
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

function updateDupesWithInputs(dupes, inputs) {
  const newDupes = {
    ...dupes,
    waterValue: inputs.waterValue || 0,
    pollutedWaterValue: inputs.pollutedWaterValue || 0,
    dirtValue: inputs.dirtValue || 0,
    pollutedDirtValue: inputs.pollutedDirtValue || 0,
    quantity: inputs.total || 0,
    traits: dupes.traits.map(trait => {
      if (inputs.traits) {
        const inputTrait = inputs.traits.find(
          input => input.name === trait.name,
        );
        return { ...trait, quantity: inputTrait.quantity || 0 };
      } else {
        return {};
      }
    }),
  };
  newDupes.caloriesRequired = getCaloriesRequired(newDupes);
  return newDupes;
}

export function getDupesWithClearedInputs(dupes) {
  const newDupes = getDupesWithDefaultInputs(dupes);
  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getDupesInputsForResource(dupes, resourceName) {
  const base = getBaseIOForResource(dupes, 'inputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'inputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'inputs', resourceName);
  return base.concat(traits).concat(waste);
}

export function getDupesOutputsForResource(dupes, resourceName) {
  const base = getBaseIOForResource(dupes, 'outputs', resourceName);
  const traits = getTraitsIOForResource(dupes.traits, 'outputs', resourceName);
  const waste = getWasteIOForResource(dupes, 'outputs', resourceName);
  return base.concat(traits).concat(waste);
}

function getBaseIOForResource(dupes, type, resourceName) {
  return dupes[type].filter(io => io.name === resourceName).map(io => ({
    ...io,
    valueExtended: io.value * dupes.quantity,
    dupe: { reference: 'Base Dupe', quantity: dupes.quantity },
  }));
}

function getTraitsIOForResource(traits, type, resourceName) {
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

function getWasteIOForResource(dupes, type, resourceName) {
  let arr = [];

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

export function updateDupeQuantity(dupes, quantity) {
  const newDupes = {
    ...dupes,
    quantity,
    traits: dupes.traits.map(trait => ({
      ...trait,
      quantity: trait.quantity > quantity ? quantity : trait.quantity,
    })),
  };

  newDupes.caloriesRequired = getCaloriesRequired(newDupes);

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function updateDupeTraitQuantity(dupes, name, quantity) {
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

  newDupes.caloriesRequired = getCaloriesRequired(newDupes);

  saveToLocalStorage(newDupes);
  return newDupes;
}

export function getDupeWaste(dupes, prop, value) {
  const newDupes = { ...dupes };
  newDupes[prop] = value;
  saveToLocalStorage(newDupes);
  return newDupes;
}

function getCaloriesRequired(dupes) {
  return (
    getBaseCaloriesRequired(dupes) + getTraitCaloriesRequired(dupes.traits)
  );
}

function getBaseCaloriesRequired(dupes) {
  if (!dupes.inputs) return 0;
  const inputs = dupes.inputs.filter(input => input.name === 'Food');
  if (inputs.length === 0) return 0;

  return inputs
    .map(input => input.value * dupes.quantity)
    .reduce((a, b) => a + b);
}

function getTraitCaloriesRequired(traits) {
  if (!traits.inputs) return 0;
  const inputs = traits
    .map(trait =>
      trait.inputs.map(input => ({ ...input, quantity: trait.quantity })),
    )
    .reduce((a, b) => a.concat(b))
    .filter(input => input.name === 'Food');
  if (inputs.length === 0) return 0;

  return inputs
    .map(input => input.value * input.quantity)
    .reduce((a, b) => a + b);
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
