import { format } from 'date-fns';

const formatDate = date => {
  return format(date, 'hh:mm; dd MMMM yyyy');
  // "07:36; 29 January 2020"
}

export default formatDate;