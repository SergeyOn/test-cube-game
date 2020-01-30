import React from 'react'
import { Alert } from '@material-ui/lab';

const InfoAlert = ({message}) => {
  return (
    <Alert severity="info">{message}</Alert>
  )
}

export default InfoAlert;
