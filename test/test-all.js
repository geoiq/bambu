
var _ = require('underscore'),
  Bambu = require('../bambu.js').Bambu,
  assert = require('assert');

var data = {
  'val1': 0,
  'val2': 34,
  'val3': 35,
  'val4': 9,
  'val5': 23,
  'val6': 12,
  'val7': 5,
  'val8': 3,
  'val9': 36,
  'val10': 25,
  'val11': 28,
  'val12': 17,
}

var bambu = Bambu()
  .id('test')
  .field('val')
  .data(data);

//var style = 

assert.equal(bambu.id(), 'test');
assert.equal(bambu.field(), 'val');
assert.equal(bambu.data(), data);

//var style = bambu.classify('quantile', 'Reds', 5);

//console.log(style)
