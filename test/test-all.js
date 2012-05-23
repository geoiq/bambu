
var Bambu = require('../bambu.js').Bambu,
  assert = require('assert');

var data = [0,35,2,41,46,10,9,5,3,23,55,76,64,42,22,22,37,6,77,8,3,1,3,4,5,11,14,17,34]

var bambu = Bambu()
  .id('test')
  .field('val')
  .data(data, true) // passing true forces a classification to run, creates a style string
  .type('quantile')
  .colors('Reds')
  .classes(5);

assert.equal(bambu.id(), 'test');
assert.equal(bambu.field(), 'val');
assert.equal(bambu.data(), data);
assert.equal(bambu.classes(), 5);
assert.equal(bambu.type(), 'quantile');
assert.equal(bambu.colors(), 'Reds');

bambu.classes(10)
console.log(bambu.classes());

bambu.classes(-5)
console.log(bambu.classes());

// get the style 
console.log(bambu.style())

// re-classifying can be delayed by passing in false as a second option to any method
// calling .classify() returns current style string
console.log(bambu.colors('Blues', false).classify())

// or you can force each method to regenerate the classification and create a new carto string
bambu.classes(9, true);
console.log('Style w/9 classes: ', bambu.style())

