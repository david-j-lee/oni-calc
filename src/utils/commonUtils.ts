import IGameModeValue from '../interfaces/IGameModeValue';
import { IGameMode } from '../interfaces/IGameMode';
import IIO from '../interfaces/IIO';

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

export function getIOTotal(ios: IIO[]) {
  if (ios.length === 0) return 0;

  return ios.map((io) => io.valueExtended || 0).reduce((a, b) => a + b, 0);
}

export function getStandardIO(io: IIO): IIO {
  const standardUnit = 'g';
  const standardRate = 'per second';

  let value = io.value;
  switch (io.unit) {
    case 'g':
      break;
    case 'mg':
      value = (value as number) * 0.001;
      break;
    case 'kg':
      value = (value as number) * 1000.0;
      break;
    default:
      value = 0.0;
      break;
  }

  switch (io.rate) {
    case 'per second':
      break;
    case 'per cycle':
      value = (value as number) / 600;
      break;
    default:
      value = 0.0;
      break;
  }
  return { ...io, value, unit: standardUnit, rate: standardRate };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getSortedArray(array: any[], orderBy: string, order: string) {
  return order === 'desc'
    ? [...array].sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
    : [...array].sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
}
