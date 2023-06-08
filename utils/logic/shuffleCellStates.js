const { getRandomCellId } = require('./getRandomCellId');

/**
 * Shuffles states by doing random steps. Mutates input array
 * @param {import('./generateLevel').CellState[]} cells 
 * @param {number} steps - number of steps to original state
 */
const shuffleCellStates = (cells, steps) => {
  let previous = getRandomCellId(cells.length);
  let next = getRandomCellId(cells.length);

  for (let step = 0; step < steps; step++) {
    while (next === previous) {
      next = getRandomCellId(cells.length);
    }
    previous = next;
    cells[next].checked = !cells[next].checked;
    
    const linkedCells = cells[next].linkedCellIds;
    linkedCells.forEach((id) => {
      cells[id].affectedFrom[next] = !cells[id].affectedFrom[next];
    });
  }
};

module.exports = {
  shuffleCellStates,
};
