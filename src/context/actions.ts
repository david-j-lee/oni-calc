import { buildingActions } from '../actions/buildingActions';
import { calculatorActions } from '../actions/calculatorActions';
import { dupeActions } from '../actions/dupeActions';
import { foodActions } from '../actions/foodActions';
import { geyserActions } from '../actions/geyserActions';
import { plantActions } from '../actions/plantActions';
import { resourceActions } from '../actions/resourceActions';
import { settingsActions } from '../actions/settingsActions';
import { uiActions } from '../actions/uiActions';

export const actionsContract = {
  ...buildingActions,
  ...calculatorActions,
  ...dupeActions,
  ...foodActions,
  ...geyserActions,
  ...resourceActions,
  ...plantActions,
  ...settingsActions,
  ...uiActions,
};
