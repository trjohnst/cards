'use strict';

const fs = require('fs');
const browserify = require('browserify');
const exec = require('child_process').exec;


function build() {
  exec('mkdir -p dist/assets/js', (error, stdout, stderr) => {
    browserify('src/assets/js/app.js')
      .transform('babelify', {presets: ['es2015']})
      .bundle()
      .pipe(fs.createWriteStream('dist/assets/js/app.js'));
  });
}

module.exports = Object.freeze({
  build,
});

