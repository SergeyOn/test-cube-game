import {
  FETCH_OPTIONS_START,
  FETCH_OPTIONS_FAIL,
  FETCH_OPTIONS_SUCCESS,
  CHANGE_NAME,
  CHANGE_MODE,
  TOGGLE_PLAY,
  SET_WINNER,
  RESET_WINNER,
} from './types';

const gameReducer = (state, {
  type,
  payload
}) => {
  switch (type) {
    case FETCH_OPTIONS_START:
      return {
        ...state,
        loading: true,
          error: null
      };
    case FETCH_OPTIONS_FAIL:
      return {
        ...state,
        loading: false,
          error: payload,
      };
    case FETCH_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
          error: null,
          gameModes: payload
      };
    case CHANGE_NAME:
      return {
        ...state,
        username: payload
      };
    case SET_WINNER:
      return {
        ...state,
        winner: payload
      };
    case RESET_WINNER:
      return {
        ...state,
        winner: ''
      };
    case CHANGE_MODE:
      return {
        ...state,
        gameMode: state.gameModes[payload]
      };
    case TOGGLE_PLAY:
      return {
        ...state,
        gameInProcess: !state.gameInProcess
      };
    default:
      return state;
  }
}

export default gameReducer;