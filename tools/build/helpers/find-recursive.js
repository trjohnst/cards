'use strict';

const fs = require('fs');
const path = require('path');

function findRecursive(dir, done, filter) {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (err) {
      return done(err);
    }

    let pending = list.length;
    if (!pending) return done(null, results);
    list.forEach((fileName) => {
      let fullFilePath = path.resolve(dir, fileName);
      fs.stat(fullFilePath, (err, stat) => {
        if (stat && stat.isDirectory()) {
          findRecursive(fullFilePath, (err, res) => {
            results = results.concat(res);
            if (!--pending) done(null, results);
          });
        } else {
          if (!filter || filter && filter(fileName)) {
            results.push(fullFilePath);
          }
          if (!--pending) done(null, results);
        }
      });
    });
  });
};

module.exports = findRecursive;