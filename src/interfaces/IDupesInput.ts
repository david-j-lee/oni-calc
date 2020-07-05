export default interface IDupesInput {
  total: number;
  waterValue: number;
  pollutedWaterValue: number;
  dirtValue: number;
  pollutedDirtValue: number;
  traits: IDupesSavedTraitItem[];
}

interface IDupesSavedTraitItem {
  name: string;
  quantity: number;
}
