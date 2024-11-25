import IState from '../interfaces/IState';
import { sortResources } from '../utils/resourceUtils';

export const resourceActions = {
  sortResources(key: string) {
    return (state: IState) => ({
      ...state,
      ...sortResources(
        state.resources,
        state.resourcesOrderBy,
        key,
        state.resourcesOrder,
      ),
    });
  },
};
