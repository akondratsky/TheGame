const { getRandomCellId } = require('./getRandomCellId');

/**
 * Returns random cells connected with target one
 * @param {number} targetCellId 
 * @param {number} numberOfCells 
 * @param {number} maxLinkedCellsNumber
 * @returns {number[]} cell IDs
 */
const createLinkedCellIds = (targetCellId, numberOfCells, maxLinkedCellsNumber) => {
  const numberOfLinks = Math.floor(Math.random() * (maxLinkedCellsNumber - 1) + 1);
  const links = [];
  let linkedCellId = getRandomCellId(numberOfCells);
  for (let i = 0; i < numberOfLinks; i++) {
    while (linkedCellId === targetCellId || links.includes(linkedCellId)) {
      linkedCellId = getRandomCellId(numberOfCells);
    }
    links.push(linkedCellId);
  }
  return links;
}

module.exports = {
  createLinkedCellIds,
};
