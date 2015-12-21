'use strict';

const jsHandler = require('./handlers/js');
const cssHandler = require('./handlers/css');

const fs = require('fs');

fs.watch('src', { persistent: true, recursive: true }, (event, filename) => {
  if (event === 'change') {
    console.log(filename.substr(filename.lastIndexOf('.') - filename.length));
    switch (filename.substr(filename.lastIndexOf('.') - filename.length)) {
      case '.js':
        console.log('js build');
        jsHandler.build();
        break;
      case '.css':
        console.log('css build');
        cssHandler.build();
        break;
    }
  }
});