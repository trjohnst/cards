'use strict';

console.log('hi');

const $ = require('jquery');

let $container = $('#card-container');

function mousemove(event) {
  console.log(event.clientX);
}

function mousedown(event) {
  $container.on('mousemove', mousemove);
  $container.on('mouseup', mouseup);
  $container.off('mousedown', mousedown);
}


function mouseup(event) {
  $container.off('mousemove', mousemove);
  $container.off('mouseup', mouseup);
  $container.on('mousedown', mousedown);
}

$container.on('mousedown', mousedown);