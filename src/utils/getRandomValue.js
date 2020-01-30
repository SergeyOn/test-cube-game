/**
 * after calling .next() yields random coords from array
 * 
 * ex: rndm.next().value // [2,3]
 **/

function* getRandomValue(array) {
  let i = array.length;

  while (i--) {
    yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
  }
}

export default getRandomValue;