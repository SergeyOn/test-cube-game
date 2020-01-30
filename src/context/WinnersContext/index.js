import React, { useEffect, useReducer, createContext, useRef } from 'react';
import Axios from "axios";
import formatDate from 'utils/formateDate';

import winnersReducer from './reducer';

const WinnersContext = createContext();

const initialState = {
  winners: [],
  loading: true,
  error: null,
};

const WinnersContextProvider = props => {

const [winnersState, dispatch] = useReducer(winnersReducer, initialState);

const source = useRef(Axios.CancelToken.source());

const url = 'https://starnavi-frontend-test-task.herokuapp.com/winners';

/** 
  * fetch data on mount
**/
useEffect(()=> {
  loadData();
  return () => {
    /** 
      * cancel request on onmount
    **/
    source.current.cancel();
  }
}, [])

const loadData = async () => {
  source.current = Axios.CancelToken.source();
  dispatch({type: 'FETCH_WINNERS_START'});
  try {
    const response = await Axios.get(url, {
      cancelToken: source.current.token
    });
    dispatch({type: 'FETCH_WINNERS_SUCCESS', payload: response.data});
  } catch (error) {
    if (Axios.isCancel(error)) {
    } else {
      dispatch({type: 'FETCH_WINNERS_FAIL', payload: error.message});
    }
  }
};

const fetchAddWinner = async winner => {
  //not canceling request because of multiple winners request possible
  dispatch({type: 'FETCH_WINNERS_START'});
  try {
    const response = await Axios.post(url, {
      date: formatDate(new Date()),
      winner: winner,
    });
    dispatch({type: 'FETCH_WINNERS_SUCCESS', payload: response.data});
  } catch (error) {
    dispatch({type: 'FETCH_WINNERS_FAIL', payload: error.message});
  }
};

  return (
    <WinnersContext.Provider value={{
      winnersState: winnersState,
      loadData,
      fetchAddWinner
      }}>
        {props.children}
    </WinnersContext.Provider>
  );
};

export { WinnersContext, WinnersContextProvider };
