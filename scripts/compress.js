const fs = require('fs');
const zlib = require('zlib');
const path = require('path');
const { pipeline } = require('stream');
const { promisify } = require('util');

const compressFile = async filePath => {
  const brotli = zlib.createBrotliCompress({
    params: {
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY // zlib.constants.BROTLI_MAX_QUALIT === 1
    }
  });
  const source = fs.createReadStream(filePath);
  const destination = fs.createWriteStream(filePath + '.br');
  await promisify(pipeline)(source, brotli, destination);
};

const getFilesizeInBytes = filename => {
  const stats = fs.statSync(filename);
  return stats.size;
};

const round = n => Math.round(n * 100) / 100;
const toKb = n => n * 0.00097656;

const getPrettyOut = (url, basic, after) => {
  return `${url}: ${round(toKb(basic))}Kb -> ${round(toKb(after))}Kb(${round(((basic - after) / basic) * 100)}%)`;
};

const toBr = async (filePath, index, totalCountFiles) => {
  await compressFile(filePath);
  const basicSize = getFilesizeInBytes(filePath);
  const sizeAfterCompression = getFilesizeInBytes(filePath + '.br');
  console.log("'\x1b[36m%s\x1b[0m'", `${index}/${totalCountFiles} ` + getPrettyOut(filePath + '.br', basicSize, sizeAfterCompression));
};

const getFilesRecursivelyInDir = dir => {
  const files = [];
  const getFilesRecursively = directory => {
    const filesInDirectory = fs.readdirSync(directory);
    for (const file of filesInDirectory) {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
        getFilesRecursively(absolute);
      } else {
        files.push(absolute);
      }
    }
  };

  getFilesRecursively(dir);

  return files;
};

const extensions = ['css', 'js', 'html', 'txt', 'json', 'svg', 'eot', 'ttf', 'ico'];

(async () => {
  console.log('Brotli compression start');
  console.time('compression');
  const filteredFiles = getFilesRecursivelyInDir('docs').filter(filePath => extensions.some(ext => filePath.endsWith('.' + ext)));
  let index = 0;
  for (const file of filteredFiles) {
    index = index + 1;
    await toBr(file, index, filteredFiles.length);
  }

  console.timeEnd('compression');
  console.log('compression finished');
})();
