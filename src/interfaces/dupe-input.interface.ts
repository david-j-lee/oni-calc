export interface IDupeInput {
  total: number;
  traits: IDupeTraitInput[];
  waterValue: 0;
  pollutedWaterValue: 0;
  dirtValue: 0;
  pollutedDirtValue: 0;
}

export interface IDupeTraitInput {
  name: string;
  quantity: number;
}
