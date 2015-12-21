'use strict';

const fs = require("fs");
const exec = require('child_process').exec;
const postcss = require('postcss');

function build() {
  exec('mkdir -p dist/assets/css', (error, stdout, stderr) => {
    fs.readFile('src/assets/css/styles.css', (err, css) => {
      if (err) {
        console.log('error reading file');
        return;
      }

      postcss([
          require('autoprefixer'),
          require('postcss-simple-vars'),
          require('postcss-nested'),
          require('cssnano')
        ])
        .process(css, {
          from: 'src/assets/css/styles.css',
          to: 'dist/assets/css/styles.css'
        })
        .then((result) => {
          fs.writeFileSync('dist/assets/css/styles.css', result.css);
          if ( result.map ) {
            fs.writeFileSync('dist/assets/css/styles.css.map', result.map);
          }
        });
    });
  });
}

module.exports = Object.freeze({
  build,
});
