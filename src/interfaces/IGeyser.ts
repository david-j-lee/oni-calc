export default interface IGeyser {
  name: string;
  temp: IGeyserTemp;
  maxPressure: IGeyserMaxPressure;
  outputs: IGeyserOutput;
}

interface IGeyserTemp {
  value: number;
  unit: string;
}

interface IGeyserMaxPressure {
  value: number;
  unit: string;
}

interface IGeyserOutput {
  name: string;
}
