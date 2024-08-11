export interface IPowerBase {
  usage?: number;
  generation?: number;
  unit: string;
  rate: string;
}

export default interface IPower extends IPowerBase {
  usage: number;
  generation: number;
}
