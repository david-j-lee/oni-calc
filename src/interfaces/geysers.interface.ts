import { IGeyserInput } from './geyser-input.interface';
import { IGeyser } from './geyser.interface';

export interface IGeysers {
  listing: IGeyser[];
  inputted: IGeyserInput;
}
