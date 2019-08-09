/** Generates random number of linked cells that will be
 * affected when player click on the cell with that id */
const getLinkedCells = (mainCellId, numberOfCells, cohesion) => {
  const getRandomCellId = () => Math.floor(Math.random() * (numberOfCells - 1) + 1);
  const numberOfLinks = Math.floor(Math.random() * (cohesion - 1) + 1);
  const links = [];
  let linkedCellId = getRandomCellId();
  for (let i = 0; i < numberOfLinks; i++) {
    while (linkedCellId === mainCellId || links.includes(linkedCellId)) {
      linkedCellId = getRandomCellId();
    }
    links.push(linkedCellId);
  }
  return links;
}

/** Generate clear unaffected one-color field */
const generateUnaffectedMap = (numberOfCells, cohesion) => {
  const cells = [];
  for (let i = 0; i < numberOfCells; i++) {
    cells.push({
      checked: true,
      linkedWith: getLinkedCells(i, numberOfCells, cohesion),
      affectedFrom: new Array(numberOfCells).fill(false)
    });
  }
  return cells;
}

const mutateCellsWithAffectingBySteps = (cells, steps) => {
  const getRandomCellId = () => Math.floor(Math.random() * (cells.length - 1));
  let previous = getRandomCellId();
  let next = getRandomCellId();

  for (let step = 0; step < steps; step++) {
    while (next === previous) {
      next = getRandomCellId();
    }
    previous = next;
    cells[next].checked = !cells[next].checked;
    
    const linkedCells = cells[next].linkedWith;
    linkedCells.forEach((id) => {
      cells[id].affectedFrom[next] = !cells[id].affectedFrom[next];
    });
  }
}

const generateLevelMap = (size, cohesion, steps) => {
  var numberOfCells = size * size;
  const cells = generateUnaffectedMap(numberOfCells, cohesion);
  mutateCellsWithAffectingBySteps(cells, steps);

  return {
    cells,
    size
  };
}

const generateStringsToInject = ({ cells, size }) => {
  let sb;

  // string with inputs
  sb = ['\n'];
  cells.forEach((cell, index) => {
    const checkedAttr = cell.checked ? 'checked' : '';
    sb.push(`<input type="checkbox" id="cb${index + 1}" ${checkedAttr} />\n`);
  });
  const inputs = sb.join('');

  // string with labels
  sb = ['\n'];
  cells.forEach((cell, index) => {
    sb.push(`<label class="cell" for="cb${index + 1}" id="l${index + 1}">\n`);
    sb.push(`  <span class="cell-bg" id="s${index + 1}"></span>\n`);
    sb.push(`</label>\n`);
  })
  const labels = sb.join('');

  // string with SCSS variables
  sb = [];
  sb.push(`$field-size: ${size};\n`);
  sb.push('$cells-links: ');
  cells.forEach((cell) => {
    sb.push(`( `)
    cell.linkedWith.forEach((linkedCellId) => {
      sb.push(`${linkedCellId + 1} `);
    });
    sb.push(')');
  })
  const variables = sb.join('');

  return {
    inputs,
    labels,
    variables
  };
};

module.exports = {
  generateLevelMap,
  generateStringsToInject
};
