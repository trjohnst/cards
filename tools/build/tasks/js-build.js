'use strict';

const fs = require("fs");
const browserify = require("browserify");
const util = require('util')
const exec = require('child_process').exec;

let child = exec('mkdir -p dist/assets/js', (error, stdout, stderr) => {
  browserify("src/assets/js/app.js")
    // .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(fs.createWriteStream("dist/assets/js/app.js"));
});