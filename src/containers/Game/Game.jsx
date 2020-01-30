import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  useContext
} from "react";
import produce from "immer";
import { WinnersContext } from "context/WinnersContext";
import { GameContext } from "context/GameContext";

import GameGrid from "./GameGrid";

import InfoAlert from "components/InfoAlert";

import generateEmptyGrid from 'utils/generateEmptyGrid'; //empty grid constructor helper
import generateCoordsArr from 'utils/generateCoordsArr'; //grid with coords constructor helper
import getRandomValue from 'utils/getRandomValue'; //rand value helper



const Game = () => {
  const gameCtx = useContext(GameContext);
  const {
    username,
    gameInProcess,
    setWinner,
    mode,
    winner,
    togglePlay
  } = gameCtx;

  const winCtx = useContext(WinnersContext);
  const { fetchAddWinner } = winCtx; //use winners context to fetch new winer

  const [grid, setGrid] = useState();

  const gridInfoRef = useRef({
    rows: mode.field,
    delay: mode.delay
  });

  const runningRef = useRef(); // for local if game is runnigg

  const ranNumsRef = useRef(); // for local random numbers

  const winnerRef = useRef({  // set local winner goals
    player: 0,
    ai: 0,
    goal: (mode.field * mode.field) / 2
  });

  const refreshWinner = useCallback(rowCount => {
    winnerRef.current = {
      player: 0,
      ai: 0,
      goal: (rowCount * rowCount) / 2
    };
  },[]);

  const endGameWithWinner = useCallback(winnername => {
    togglePlay(); // end game
    fetchAddWinner(winnername); // fetch add winner to api
    setWinner(winnername); //add local winner to show in message
  }, [togglePlay, fetchAddWinner, setWinner]);

  useEffect(() => {
    runningRef.current = gameInProcess; // change local playstate
    if (!!mode.field) { // change only if field mode is acceptable
      ranNumsRef.current = getRandomValue(generateCoordsArr(mode.field)); //set generator to return random coorsd based on current grid fields
      refreshWinner(mode.field); // refresh local winner goals

      if (gameInProcess) { //case 1 if game is started
        setGrid(generateEmptyGrid(mode.field)); //generate empty grid
        runGame(); //run the game
      }

      if (!winner && !gameInProcess) { // case 2 if game is refreshed
        setGrid(generateEmptyGrid(mode.field)); //generate empty grid
      }

      if (gridInfoRef.current.rows !== mode.field || gridInfoRef.current.delay !== mode.delay) { // case 3 user changes the mode
        gridInfoRef.current.rows = mode.field; // set new local fields
        gridInfoRef.current.delay = mode.delay; // set new local delay
        ranNumsRef.current = getRandomValue(generateCoordsArr(mode.field)); //set rnd generator
        setGrid(() => generateEmptyGrid(mode.field)); //generate empty grid
      }

      /*
        * case 4 if game is over but user didnt selected new mode nor clicked "play again"
        * user can view his game results
      */
    }
  }, [gameInProcess, winner, mode]);


  const runGame = useCallback( //not to create every rerender
    prevSqr => { // pass prev coords
      if (!runningRef.current) { //if local game status is false stop to play
        return;
      }

      const randSqr = ranNumsRef.current.next().value; // get next random coord ex: [4,3]

      const [randRow, randIdx] = randSqr ? randSqr : prevSqr; // destructure to row and square. if undefined use prev coords

      setGrid(g => {
        return produce(g, gridCopy => { // make a copy of grid
          for (let i = 0; i < mode.field; i++) {
            for (let k = 0; k < mode.field; k++) {
              if (g[i][k] === 1) { // if user didnt get to click square
                winnerRef.current.ai++; // update AI score
                gridCopy[i][k] = 3; // set this squre to be controlled by AI
              } else if (randRow === i && randIdx === k) { // mark new random square as active
                gridCopy[i][k] = 1; // active, user can click
              }
            }
          }
          if (winnerRef.current.ai > winnerRef.current.goal) { // if computer wins in this round
            /*
             * so computer has won, but next squre is active
             * if square is last on grid(nose to nose case) set it to be controlled by ai. else make it inactive
            */          
            gridCopy[randRow][randIdx] = randSqr ? 0 : 3;
            endGameWithWinner("Computer AI"); // end game, ai wins
          }
        });
      });

      setTimeout(() => { // start again until wictory 
        runGame(randSqr); // pass current coords
      }, mode.delay); 
    },
    [mode, endGameWithWinner] // based on mode
  );

  const handleClick = useCallback(({ row, sqr }) => { // passing single square row and idx attrs
    if (row === undefined) return; // if user clicked on the edge ignore
    if (grid[row][sqr] === 1) { // if user clicked on the active square
      winnerRef.current.player++; // update user score
      if (winnerRef.current.player > winnerRef.current.goal) { // if user has won
        endGameWithWinner(username) // end game user wins
      }
      const newGrid = produce(grid, gridCopy => { // create new grid
        gridCopy[row][sqr] = 2; // set field to be controlled by user
      });
      setGrid(newGrid);
    }
  }, [grid, username, endGameWithWinner]);

  return useMemo( // to handle rerender
    () => (
      <>
        {!mode.field || !grid ? ( // alert if no mode is set
          <InfoAlert message="Set mode to start playing"/> 
        ) : (
          <GameGrid grid={grid} handleClick={handleClick} numRows={mode.field} />
        )}
      </>
    ),
    [grid, mode, handleClick]
  );
};

export default Game;
