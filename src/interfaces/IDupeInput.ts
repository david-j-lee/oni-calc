import IDupeTraitInput from './IDupeTraitInput';

export default interface IDupeInput {
  total: number;
  traits: IDupeTraitInput[];
  waterValue: 0;
  pollutedWaterValue: 0;
  dirtValue: 0;
  pollutedDirtValue: 0;
}
