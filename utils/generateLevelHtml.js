/**
 * @typedef {Object} LevelHtml HTML generated for level
 * @property {string} inputs - checkboxes
 * @property {string} labels - labels for checkboxes
 * @property {string} variables - SCSS variables to create proper CSS
 */

/**
 * @param {import('./logic/generateLevel').CellState[]} cells 
 * @param {number} size 
 * @returns {LevelHtml}
 */
const generateLevelHtml = (cells, size) => {
  let inputs = '\n';
  let labels = '\n';
  let variables = `$field-size: ${size};\n$cells-links: `;
  
  cells.forEach((cell, index) => {
    inputs += `<input type="checkbox" id="cb${index + 1}" ${cell.checked ? 'checked' : ''} />\n`;
    labels += `<label class="cell" for="cb${index + 1}" id="l${index + 1}">\n`;
    labels += `  <span class="cell-bg" id="s${index + 1}"></span>\n`;
    labels += `</label>\n`;

    variables += '( ';
    cell.linkedCellIds.forEach((linkedCellId) => {
      variables += `${linkedCellId + 1} `;
    });
    variables += ')';
  });

  return {
    inputs,
    labels,
    variables
  };
};

module.exports = {
  generateLevelHtml,
};
