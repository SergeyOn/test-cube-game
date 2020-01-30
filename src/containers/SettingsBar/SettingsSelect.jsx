import React, {useContext}from 'react';

import {InputLabel, FormControl, NativeSelect} from '@material-ui/core';

import {GameContext} from 'context/GameContext';

const SettingsSelect = () => {
  const gameCtx = useContext(GameContext);
  const {gameModes, changeMode, gameInProcess } = gameCtx;
  const [options, setOptions] = React.useState('');
  const handleSelectChange = event => {
    if(gameInProcess) return;
    setOptions(event.target.value);
    changeMode(event.target.value);
  };
  const renderModes = key => {
    return <option value={key} key={key}>{key}</option>
  }
  return (
    <FormControl>
      <InputLabel htmlFor="demo-customized-select-native">Pick mode</InputLabel>
      <NativeSelect
        value={options}
        onChange={handleSelectChange}
      >
        {!options && <option value="" />} {/* for default state */ }
        {Object.keys(gameModes).map(renderModes)} {/* map by keys */ }
      </NativeSelect>
    </FormControl>
  )
}

export default SettingsSelect;
