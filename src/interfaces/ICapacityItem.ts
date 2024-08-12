export interface ICapacityItemBase {
  value?: number;
  unit?: string;
}

export default interface ICapacityItem extends ICapacityItemBase {
  value: number;
  unit: string;
}
