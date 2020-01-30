/**
 * creates matrix filled with coords, from number of rows, and spreads it to array
 * ex: [[[0,1],[0,2],[0,3]],
 *      [[1,1],[1,2],[1,3]],
 *      [[2,1],[2,2],[2,3]]],
 * 
 * than: [[0,1],[0,2],[0,3],[1,1],[1,2],[1,3],[2,1],[2,2],[2,3]]
 * 
 * needs for getting random coord in matrix
 **/

const generateCordsArr = numRows =>
  [].concat(
    ...Array.from(Array(numRows), (_, i) =>
      Array.from(Array(numRows), (_, k) => [i, k])
    )
  );

export default generateCordsArr;
