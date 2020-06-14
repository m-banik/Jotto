import { actionTypes } from "../actions"

const INITIAL_STATE = false;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CORRECT_GUESS:
      return true
    default:
      return state
  }
};
