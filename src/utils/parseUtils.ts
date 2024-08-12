import IBuilding, { IBuildingBase } from '../interfaces/IBuilding';
import IBuildingInput from '../interfaces/IBuildingInput';
import ICapacity, { ICapacityBase } from '../interfaces/ICapacity';
import ICapacityItem, { ICapacityItemBase } from '../interfaces/ICapacityItem';
import IIO, { IIOBase } from '../interfaces/IIO';
import IPower, { IPowerBase } from '../interfaces/IPower';

const BUILDING_IMG_PATH = '/images/buildings/';
const BUILDING_CATEGORY_PATH = '/images/building-categories/';
export const WIKI_LINK_PATH = 'https://oxygennotincluded.wiki.gg/';

export function parseBuildings(rawBuildings: IBuildingBase[]): IBuilding[] {
  if (rawBuildings.constructor === Array) {
    return rawBuildings.map((building) => {
      const parsedBuilding: IBuilding = {
        category: building.category || '',
        categoryImgUrl:
          BUILDING_CATEGORY_PATH +
          building.category.toLowerCase().split(' ').join('-') +
          '.png',
        name: building.name || '',
        imgUrl:
          BUILDING_IMG_PATH +
          building.name.toLowerCase().split(' ').join('-') +
          '.png',
        wikiUrl:
          WIKI_LINK_PATH +
          building.name.replace(/^(Domesticated|Wild) /, '').replace(' ', '_'),
        capacity: parseCapacity(building.capacity),
        hasConsistentIO: building.hasConsistentIO || false,
        power: parsePower(building.power),
        inputs: parseIOs(building.inputs),
        outputs: parseIOs(building.outputs),
        quantity: 0,
        utilization: 0,
      };
      return parsedBuilding;
    });
  } else {
    return [];
  }
}

export function parseBuildingInputs(
  rawInputs: string | null,
): IBuildingInput[] {
  if (rawInputs) {
    let parsedInputs;

    try {
      parsedInputs = JSON.parse(rawInputs as string);
    } catch (e) {
      localStorage.removeItem('buildings');
      throw e;
    }

    return (parsedInputs as IBuildingInput[]).map((input) =>
      parseBuildingInput(input),
    );
  } else {
    return [];
  }
}

function parseBuildingInput(input: IBuildingInput): IBuildingInput {
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

function parseCapacity(capacity?: ICapacityBase): ICapacity {
  return {
    power: parseCapacityItem(capacity?.power),
    resources: parseCapacityItem(capacity?.resources),
  };
}

function parseCapacityItem(item?: ICapacityItemBase): ICapacityItem {
  if (item) {
    return {
      value: item.value || 0,
      unit: item.unit || '',
    };
  } else {
    return { value: 0, unit: '' };
  }
}

function parsePower(power?: IPowerBase): IPower {
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

function parseIOs(inputs?: IIOBase[]): IIO[] {
  if (!inputs) {
    return [];
  }
  return inputs.map((input) => parseIO(input));
}

function parseIO(input?: IIOBase): IIO {
  if (input) {
    return {
      name: input.name || '',
      value: input.value || 0,
      valueExtended: typeof input.value === 'number' ? input.value : 0,
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
