import React, { useContext } from 'react'
import { WinnersContext } from 'context/WinnersContext';
import WinnersList from './WinnersList';
import TableWithTitle from 'components/TableWIthTitle';
import Spinner from 'components/Spinner';
import ErrorIndicator from 'components/ErrorIndicator';

export const Winners = () => {
  return (
    <TableWithTitle title='Leader board'>
      <WinnersContainer />
    </TableWithTitle>
  );
};

const WinnersContainer = () => {
  const context = useContext(WinnersContext);
  const { winnersState } = context;
  const {winners, loading, error } = winnersState;

  if (loading) return <Spinner />;

  if (error) return <ErrorIndicator error={error}/>;

  return <WinnersList winners={winners}/>;
};

export default Winners;
