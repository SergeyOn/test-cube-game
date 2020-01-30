import React, { useContext } from 'react';
import {Box} from '@material-ui/core';

import {GameContext} from 'context/GameContext';

import SettingsSelect from './SettingsSelect';
import PlayBtn from './PlayBtn';
import NameInput from './NameInput';

import ErrorIndicator from 'components/ErrorIndicator';
import Spinner from 'components/Spinner';

const SettingsBar = () => (
  <Box
    display="flex"
    flexWrap="wrap"
    alignItems="center"
    justifyContent="space-between"
    p={1}
    m={1}
  >
    <SettingsSelect />
    <Box>
      <NameInput />
    </Box>
    <Box>
      <PlayBtn />
    </Box>
  </Box>
);

const SettingsBarContainer = () => {
  const gameCtx = useContext(GameContext);
  const { loading, error } = gameCtx;

  if (loading) return <Spinner />;

  if (error) return <ErrorIndicator error={error} />;

  return <SettingsBar /> ;
};

export default SettingsBarContainer;
