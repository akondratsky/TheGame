const { createOriginCellsState } = require('./createOriginCellsState');
const { shuffleCellStates } = require('./shuffleCellStates');

/**
 * @typedef {Object} CellState
 * @property {boolean} checked - state of the checkbox
 * @property {number[]} linkedCellIds - IDs of linked cells
 * @property {boolean[]} affectedFrom
 */

/**
 * require('./types');
 * @param {number} size - number of cells in the square field
 * @param {number} maxLinkedCellsNumber
 * @param {number} steps - number of steps to randomly shuffle cell states
 * @returns {CellState[]}
 */
const generateLevel = (size, maxLinkedCellsNumber, steps) => {
  var numberOfCells = size * size;
  const cells = createOriginCellsState(numberOfCells, maxLinkedCellsNumber);
  shuffleCellStates(cells, steps);

  return cells;
};

module.exports = {
  generateLevel,
};
