const { createLinkedCellIds } = require('./createLinkedCellIds');

/**
 * Generate clear unaffected one-color field
 * @param {number} numberOfCells
 * @param {number} maxLinkedCellsNumber
 */
const createOriginCellsState = (numberOfCells, maxLinkedCellsNumber) => {
  /** @type {import('./generateLevel').CellState[]} */
  const cells = [];
  for (let i = 0; i < numberOfCells; i++) {
    cells.push({
      checked: true,
      linkedCellIds: createLinkedCellIds(i, numberOfCells, maxLinkedCellsNumber),
      affectedFrom: new Array(numberOfCells).fill(false)
    });
  }
  return cells;
};

module.exports = {
  createOriginCellsState,
};
