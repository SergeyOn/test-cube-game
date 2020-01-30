import React, {
  useReducer,
  useEffect,
  createContext
} from 'react';
import Axios from 'axios';
import gameReducer from './reducer';

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

const GameContext = createContext();

const initialState = {
  gameModes: {},
  gameMode: {
    field: null,
    delay: null
  },
  username: '',
  gameInProcess: false,
  winner: '',
  loading: true,
  error: null,
};

const GameContextProvider = props => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const url = 'https://starnavi-frontend-test-task.herokuapp.com/game-settings';

  useEffect(() => {
    const fetchOptions = async () => {
      dispatch({
        type: FETCH_OPTIONS_START
      });
      try {
        const response = await Axios.get(url);
        dispatch({
          type: FETCH_OPTIONS_SUCCESS,
          payload: Object.assign({}, response.data, {
            testMode1: {
              field: 3,
              delay: 900
            }, //for testing
            testMode2: {
              field: 15,
              delay: 30
            }  //for testing
          })
        });
      } catch (error) {
        dispatch({
          type: FETCH_OPTIONS_FAIL,
          payload: error.message
        });
      }
    };
    fetchOptions();
  }, [])

  const changeName = username => {
    dispatch({
      type: CHANGE_NAME,
      payload: username
    });
  }

  const changeMode = gameMode => {
    dispatch({
      type: CHANGE_MODE,
      payload: gameMode
    });
  }

  const togglePlay = () => {
    dispatch({
      type: TOGGLE_PLAY
    });
  }

  const setWinner = winner => {
    dispatch({
      type: SET_WINNER,
      payload: winner
    });
  }

  const resetWinner = () => {
    dispatch({
      type: RESET_WINNER
    });
  }

  return ( 
    <GameContext.Provider value = {{
        winner: gameState.winner,
        mode: gameState.gameMode,
        username: gameState.username,
        changeName: changeName,
        changeMode: changeMode,
        gameInProcess: gameState.gameInProcess,
        togglePlay: togglePlay,
        setWinner: setWinner,
        resetWinner: resetWinner,
        gameModes: gameState.gameModes,
        loading: gameState.loading,
        error: gameState.error,
      }}>
      {props.children} 
    </GameContext.Provider>
  );
};

export {
  GameContext,
  GameContextProvider
};