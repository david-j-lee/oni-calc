import IBuilding, { IBuildingBase } from '../interfaces/IBuilding';
import ICapacity, { ICapacityBase } from '../interfaces/ICapacity';
import ICapacityItem, { ICapacityItemBase } from '../interfaces/ICapacityItem';
import IPower, { IPowerBase } from '../interfaces/IPower';
import IVariantInput from '../interfaces/IVariantInput';

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
        power: parsePower(building.power),
        variants: building.variants,
        variantUtilizations: [],
        inputs: [],
        outputs: [],
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
  rawInputs?: string | null,
): IVariantInput[] {
  if (rawInputs) {
    let parsedInputs: IVariantInput[];

    try {
      parsedInputs = JSON.parse(rawInputs) as IVariantInput[];
    } catch (e) {
      localStorage.removeItem('buildings');
      throw e;
    }

    return parsedInputs.map((input) => parseBuildingInput(input));
  } else {
    return [];
  }
}

function parseBuildingInput(input: IVariantInput): IVariantInput {
  if (input) {
    return {
      name: input.name ?? '',
      quantity: input.quantity ?? 0,
      utilization: input.utilization ?? 0,
      variantUtilizations: input.variantUtilizations ?? [],
    };
  } else {
    return { name: '', quantity: 0, utilization: 0, variantUtilizations: [] };
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
      value: item.value ?? 0,
      unit: item.unit ?? '',
    };
  } else {
    return { value: 0, unit: '' };
  }
}

function parsePower(power?: IPowerBase): IPower {
  if (power) {
    return {
      usage: power.usage ?? 0,
      generation: power.generation ?? 0,
      unit: power.unit ?? '',
      rate: power.rate ?? '',
    };
  } else {
    return { usage: 0, generation: 0, unit: '', rate: '' };
  }
}
