/**
 * creates matrix from number of rows filled with 0
 * ex: [[0,0,0],
 *      [0,0,0],
 *      [0,0,0]]
 **/

const generateEmptyGrid = numRows =>
  Array(numRows).fill(Array(numRows).fill(0));

export default generateEmptyGrid;