import React from 'react';

import { WinnersContextProvider } from './WinnersContext';
import { GameContextProvider } from './GameContext';

const GlobalState = props => { // i decided to avoid redux logic because of complication
  return (
    <WinnersContextProvider>
      <GameContextProvider>
        {props.children}
      </GameContextProvider>
    </WinnersContextProvider>
  );
};

export default GlobalState;