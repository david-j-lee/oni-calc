import IBuilding from '../interfaces/IBuilding';
import IBuildingInput from '../interfaces/IBuildingInput';
import ICapacity from '../interfaces/ICapacity';
import ICapacityItem from '../interfaces/ICapacityItem';
import IIO from '../interfaces/IIO';
import IPower from '../interfaces/IPower';

const BUILDING_IMG_PATH = '/images/buildings/';
const BUILDING_CATEGORY_PATH = '/images/building-categories/';
export const WIKI_LINK_PATH = 'https://oxygennotincluded.wiki.gg/';

export function parseBuildings(rawBuildings: any): IBuilding[] {
  if (rawBuildings.constructor === Array) {
    return rawBuildings.map((building: any) => {
      const parsedBuilding: IBuilding = {
        category: building.category || '',
        categoryImgUrl:
          BUILDING_CATEGORY_PATH +
          building.category
            .toLowerCase()
            .split(' ')
            .join('-') +
          '.png',
        name: building.name || '',
        imgUrl:
          BUILDING_IMG_PATH +
          building.name
            .toLowerCase()
            .split(' ')
            .join('-') +
          '.png',
        wikiUrl: WIKI_LINK_PATH + building.name
          .replace(/^(Domesticated|Wild) /, '')
          .replace(' ', '_'),
        capacity: parseCapacity(building.capacity),
        hasConsistentIO: building.hasConsistentIO || false,
        power: parsePower(building.power),
        inputs: parseIOs(building.inputs),
        outputs: parseIOs(building.outputs),
        quantity: building.quantity || 0,
        utilization: building.utilization || 0,
      };
      return parsedBuilding;
    });
  } else {
    return [];
  }
}

export function parseBuildingInputs(rawInputs: any): IBuildingInput[] {
  if (rawInputs) {
    try {
      rawInputs = JSON.parse(rawInputs);
    } catch (e) {
      localStorage.removeItem('buildings');
      throw e;
    }

    return rawInputs.map((input: any) => parseBuildingInput(input));
  } else {
    return [];
  }
}

export function parseDupes(rawDupes: any) {
  return rawDupes;
}

export function parseDupeInputs(inputs: any) {
  return inputs;
}

export function parseGeysers(rawGeysers: any) {
  return rawGeysers;
}

export function parseGeyserInputs(inputs: any) {
  return inputs;
}

export function parseFood(rawFood: any) {
  return rawFood;
}

export function parseFoodInputs(inputs: any) {
  return inputs;
}

function parseBuildingInput(input: any): IBuildingInput {
  if (input) {
    return {
      name: input.name || '',
      quantity: input.quantity || 0,
      utilization: input.utilization || 0,
    };
  } else {
    return { name: '', quantity: 0, utilization: 0 };
  }
}

function parseCapacity(capacity: any): ICapacity {
  return {
    power: parseCapacityItem(capacity.power),
    resources: parseCapacityItem(capacity.resources),
  };
}

function parseCapacityItem(item: any): ICapacityItem {
  if (item) {
    return {
      value: item.value || 0,
      unit: item.unit || '',
    };
  } else {
    return { value: 0, unit: '' };
  }
}

function parsePower(power: any): IPower {
  if (power) {
    return {
      usage: power.usage || 0,
      generation: power.generation || 0,
      unit: power.unit || '',
      rate: power.rate || '',
    };
  } else {
    return { usage: 0, generation: 0, unit: '', rate: '' };
  }
}

function parseIOs(inputs: any): IIO[] {
  return inputs.map((input: any) => parseIO(input));
}

function parseIO(input: any): IIO {
  if (input) {
    return {
      name: input.name || '',
      value: input.value || 0,
      valueExtended: input.value || 0,
      unit: input.unit || '',
      rate: input.rate || '',
    };
  } else {
    return {
      name: '',
      value: 0,
      valueExtended: 0,
      unit: '',
      rate: '',
    };
  }
}
