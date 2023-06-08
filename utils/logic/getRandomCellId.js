/**
 * Returns random cell ID
 * @param {number} numberOfCells - count of cells on the field
 * @returns {number}
 */
const getRandomCellId = (numberOfCells) => Math.floor(Math.random() * (numberOfCells - 1) + 1);

module.exports = {
  getRandomCellId,
};