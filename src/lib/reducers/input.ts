import { Settings, SettingsAction } from "@/types";

const SettingsReducer = (state: Settings, action: SettingsAction) => {
  switch (action.type) {
    case "SET_SELECTED_VALUE":
      return {
        ...state,
        selectedValue: action.payload,
      };
    case "SET_SETTINGS":
      return {
        ...state,
      };
    case "SET_SITE_NAME":
      return {
        ...state,
        siteName: action.payload,
      };
    case "DELETE_SITE":
      return {
        ...state,
        deleteValue: action.payload,
      };
    default:
      return state;
  }
};

export { SettingsReducer };
