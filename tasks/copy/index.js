const fs = require('fs');
const path = require('path');

function CopyService() { }

const p = CopyService.prototype;

p.setOptions = function (options) {
  const s = this;

  const defaults = {
    copyFile: filePath => true,
    rename: filePath => filePath
  };

  s.options = Object.assign({}, defaults, options);
};

p.copyFile = function (filePath) {
  const s = this;
  const o = s.options;

  if (o.copyFile(filePath)) {
    destPath = o.rename(filePath);

    if (destPath !== filePath) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(filePath, destPath);
      return true;
    }
  }

  return false;
};

module.exports = {
  getNew: (options) => {
    const svc = new CopyService();
    svc.setOptions(options);
    return svc;
  }
};
