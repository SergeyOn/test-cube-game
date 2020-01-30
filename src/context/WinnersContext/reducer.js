import {
  FETCH_WINNERS_START,
  FETCH_WINNERS_SUCCESS,
  FETCH_WINNERS_FAIL,
} from './types';

const winnersReducer = (state, {
  type,
  payload
}) => {
  switch (type) {
    case FETCH_WINNERS_START:
      return {
        ...state,
        loading: true,
          error: null
      };
    case FETCH_WINNERS_FAIL:
      return {
        ...state,
        loading: false,
          error: payload
      };
    case FETCH_WINNERS_SUCCESS:
      return {
        ...state,
        loading: false,
          error: null,
          winners: [...payload]
      };
    default:
      return state;
  };
};

export default winnersReducer;