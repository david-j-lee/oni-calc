import { IGameMode } from '../interfaces/IGameMode';
import IGameModeValue from '../interfaces/IGameModeValue';
import IIO, { IIOBase } from '../interfaces/IIO';
import IResource from '../interfaces/IResource';
import IVariantInput from '../interfaces/IVariantInput';

export function getGameModeValue(
  gameMode: IGameMode,
  value: number | IGameModeValue,
) {
  let gameModeValue = 0;
  if (typeof value === 'number') {
    gameModeValue = value;
  } else {
    if (gameMode === 'survival' && typeof value.survival === 'number') {
      gameModeValue = value.survival;
    }

    if (gameMode === 'no-sweat' && typeof value.noSweat === 'number') {
      gameModeValue = value.noSweat;
    }
  }
  return gameModeValue;
}

export function toTitleCase(word?: string) {
  if (!word) {
    return word;
  }
  return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

export function getImgUrl(category: string, name: string) {
  const nameNormalized = name
    .toLowerCase()
    .replaceAll('(', '')
    .replaceAll(')', '')
    .split(' ')
    .join('-');
  return `/images/${category}/${nameNormalized}.png`;
}

export function getInputsByName(inputs: IVariantInput[]) {
  return inputs.reduce(
    (accumulator, input) => {
      accumulator[input.name] = input;
      return accumulator;
    },
    {} as { [key: string]: IVariantInput },
  );
}

export function getTotalInput(resource: IResource) {
  return (
    Object.values(resource.subtotals).reduce(
      (accumulator, input) => accumulator + input.totalInput,
      0,
    ) +
    resource.totalDupeInput +
    resource.totalGeyserInput
  );
}

export function getTotalOutput(resource: IResource) {
  return (
    Object.values(resource.subtotals).reduce(
      (accumulator, input) => accumulator + input.totalOutput,
      0,
    ) +
    resource.totalDupeOutput +
    resource.totalGeyserOutput
  );
}

export function getIOTotal(ios: IIO[]) {
  if (ios.length === 0) return 0;

  return ios.map((io) => io.valueExtended || 0).reduce((a, b) => a + b, 0);
}

export function getStandardIO(
  gameMode: IGameMode,
  io: IIO | IIOBase,
): IIO | IIOBase {
  const standardUnit = 'g';
  const standardRate = 'per second';

  let value = getGameModeValue(gameMode, io.value);
  switch (io.unit) {
    case 'g':
    case 'kcal':
      break;
    case 'mg':
      value = value * 0.001;
      break;
    case 'kg':
      value = value * 1000.0;
      break;
    default:
      console.error('Unknown unit', io.unit);
      value = 0.0;
      break;
  }

  switch (io.rate) {
    case 'per second':
      break;
    case 'per cycle':
      value = value / 600;
      break;
    default:
      console.error('Unknown rate', io.rate);
      value = 0.0;
      break;
  }
  return { ...io, value, unit: standardUnit, rate: standardRate };
}

export function getSortedArray<T>(
  array: T[],
  orderBy: keyof T,
  order: 'asc' | 'desc',
): T[] {
  return order === 'desc'
    ? [...array].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...array].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
}
