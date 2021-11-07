const cheerio = require('cheerio');
const fs = require('fs');
const path = require('path');
const minify = require('html-minifier').minify;

const minifyHtml = () => {
  const DIST_FOLDER = path.join(process.cwd(), 'docs');
  try {
    const data = fs.readFileSync(path.join(DIST_FOLDER, 'index.html'), { encoding: 'utf8' });
    const $ = cheerio.load(data); // load in the HTML into cheerio

    fs.writeFileSync(
      path.join(DIST_FOLDER, 'index.html'),
      minify($.html(), {
        collapseWhitespace: true,
        removeTagWhitespace: true,
        removeComments: true,
        minifyCss: true,
        useShortDoctype: true,
        processConditionalComments: true
      })
    );
  } catch (error) {
    console.error(error);
  }
};

minifyHtml();
console.log('index.html modification is finished');
