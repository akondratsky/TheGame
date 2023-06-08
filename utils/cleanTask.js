const del = require('del');

const cleanTask = (cb) => {
  del.sync('dist', { force: true });
  cb();
};

module.exports = {
  cleanTask,
};
