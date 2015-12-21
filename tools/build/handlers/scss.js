'use strict';

const fs = require("fs");
const sass = require('node-sass');
const exec = require('child_process').exec;
// const postcss = require('postcss');

function build() {
  exec('mkdir -p dist/assets/css', (error, stdout, stderr) => {
    sass.render({
      file: 'src/assets/scss/styles.scss',
      outFile: 'dist/assets/css/styles.css'
    }, (error, result) => {
      if (error) {
        console.log('scss build: error with sass.render');
        return;
      }

      // postcss([ require('autoprefixer'), require('cssnano') ])
      //     .process(css, {
      //       from: 'src/app.css',
      //       to: 'dist/assets/css/styles.css',
      //     })
      //     .then((result) => {
      //         fs.writeFileSync('dist/assets/css/styles.css', result.css);
      //         if ( result.map ) {
      //           fs.writeFileSync('dist/assets/css/styles.css.map', result.map);
      //         }
      //     });

      fs.writeFile('dist/assets/css/styles.css', result.css, (err) => {
        if (err) {
          console.log('scss build: error with fs.writefile');
        }
      });
    });
  });
}

module.exports = Object.freeze({
  build,
});
