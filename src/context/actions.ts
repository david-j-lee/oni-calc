import { buildingActions } from '../actions/buildingActions';
import { calculatorActions } from '../actions/calculatorActions';
import { critterActions } from '../actions/critterActions';
import { dupeActions } from '../actions/dupeActions';
import { geyserActions } from '../actions/geyserActions';
import { plantActions } from '../actions/plantActions';
import { resourceActions } from '../actions/resourceActions';
import { settingsActions } from '../actions/settingsActions';
import { uiActions } from '../actions/uiActions';

export const actionsContract = {
  ...uiActions,
  ...settingsActions,
  ...calculatorActions,
  ...resourceActions,
  ...dupeActions,
  ...buildingActions,
  ...critterActions,
  ...plantActions,
  ...geyserActions,
};
