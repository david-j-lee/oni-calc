import IGeyserInput from '../interfaces/IGeyserInput';
import IGeysers from '../interfaces/IGeysers';
import IIO from '../interfaces/IIO';
import IGeyser from './../interfaces/IGeyser';
import IResource from './../interfaces/IResource';
import { updateResourcesWithGeysers } from './resourceUtils';

export const addGeyser = (
  resources: IResource[],
  geysers: IGeysers,
  geyser: IGeyserInput,
) => {
  const newGeysers = addGeyserToGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const deleteGeyser = (
  resources: IResource[],
  geysers: IGeysers,
  geyser: IGeyserInput,
) => {
  const newGeysers = deleteGeyserFromGeysers(geysers, geyser);
  const newResources = updateResourcesWithGeysers(resources, newGeysers);
  return {
    resources: newResources,
    geysers: newGeysers,
  };
};

export const clearGeyserInputs = (
  resources: IResource[],
  geysers: IGeysers,
) => {
  const newGeysers = getGeysersWithClearedInputs(geysers);
  return {
    resources: updateResourcesWithGeysers(resources, newGeysers),
    geysers: newGeysers,
  };
};

// --------------------------------------------------------------

export function getGeysers(geysers: IGeyser[], inputs?: IGeyserInput[]) {
  if (inputs && inputs.length > 0) {
    return updateGeysersWithInputs(geysers, inputs);
  } else {
    return getGeysersWithDefaultInputs(geysers);
  }
}

function updateGeysersWithInputs(geysers: IGeyser[], inputs: IGeyserInput[]) {
  return {
    listing: geysers,
    inputted: inputs.map((input) => {
      const geyser = geysers.find((g) => g.name === input.name);
      return {
        ...input,
        outputs: geyser?.outputs || [],
      };
    }),
  };
}

function getGeysersWithDefaultInputs(geysers: IGeyser[]) {
  return { listing: geysers, inputted: [] };
}

export function getGeysersWithClearedInputs(geysers: IGeysers) {
  return getGeysersWithDefaultInputs(geysers.listing);
}

export function addGeyserToGeysers(geysers: IGeysers, geyser: IGeyserInput) {
  if (!geysers.inputted || !geyser) return geysers;

  const inputted = [...geysers.inputted];
  inputted.push({ ...geyser });

  const newGeysers = { ...geysers, inputted };

  saveToLocalStorage(newGeysers);
  return newGeysers;
}

export function deleteGeyserFromGeysers(
  geysers: IGeysers,
  geyser: IGeyserInput,
) {
  const inputted = geysers.inputted.filter((input) => input !== geyser);
  const newGeysers = { ...geysers, inputted };
  saveToLocalStorage(newGeysers);
  return newGeysers;
}

export function getGeyserOutputs(geysers: IGeysers, resourceName: string) {
  return geysers.inputted
    .map((geyser) => {
      const geyserInfo = geysers.listing.find((g) => g.name === geyser.name);
      if (geyserInfo === undefined) return null;

      const outputs = geyserInfo.outputs.filter(
        (output) => output.name === resourceName,
      );
      if (outputs.length === 0) return null;

      return outputs.map((output) => ({
        ...output,
        value: getExtendedValue(geyser),
        valueExtended: getExtendedValue(geyser),
      }));
    })
    .filter((output) => output !== null)
    .reduce((a, b) => a.concat(b), []) as IIO[];
}

function getExtendedValue(geyser: IGeyserInput) {
  return (
    geyser.amount *
    (geyser.eruptionDuration / geyser.eruptionEvery) *
    (geyser.activeDuration / geyser.activeEvery)
  );
}

function saveToLocalStorage(geysers: IGeysers) {
  localStorage.setItem(
    'geysers',
    JSON.stringify(
      geysers.inputted.map((geyser) => ({
        name: geyser.name,
        amount: geyser.amount,
        eruptionDuration: geyser.eruptionDuration,
        eruptionEvery: geyser.eruptionEvery,
        activeDuration: geyser.activeDuration,
        activeEvery: geyser.activeEvery,
      })),
    ),
  );
}
