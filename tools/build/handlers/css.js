'use strict';

const fs = require('fs');
const exec = require('child_process').exec;
const postcss = require('postcss');

const findRecursive = require('../helpers/find-recursive');

function build() {
  exec('mkdir -p dist/assets/css', (error, stdout, stderr) => {

    findRecursive('src/assets/css', (err, results) => {
      let cwd = process.cwd();
      let cwdLength = cwd.length;

      results.forEach((result) => {
        let filePath = result.startsWith(cwd) ? result.substr(cwdLength + 1) : result;
        let fileName = result.substr(result.lastIndexOf('/') + 1);

        fs.readFile(result, (err, css) => {
          if (err) {
            console.log('error reading file');
            return;
          }

          postcss([
              require('postcss-import'),
              require('autoprefixer'),
              require('postcss-simple-vars'),
              require('postcss-nested'),
              require('cssnano')
            ])
            .use(require('postcss-import'))
            .process(css, {
              from: filePath
            })
            .then((result) => {
              fs.writeFileSync(`dist/assets/css/${fileName}`, result.css);
              if ( result.map ) {
                fs.writeFileSync(`dist/assets/css/${fileName}.map`, result.map);
              }
            });
        });
      });
    }, (fileName) => {
      if (fileName.startsWith('_')) {
        return false;
      }

      return true;
    });

  });
}

module.exports = Object.freeze({
  build,
});
