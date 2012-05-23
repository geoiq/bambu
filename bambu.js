/** 
  Bambu generates thematic carto.js strings

  Currently under active development and is being used to style 
  vector tile json data in modestmaps via Carto.js & VECNIK.js.

  MIT License - Copryright 2012 
*/
function Bambu() {

  var data,
    id,
    values,
    field,
    default_fill;

  var bambu = function(){};

  bambu.id = function(x){
    if (!arguments.length) return id;
    id = x;
    return bambu;
  };

  bambu.data = function(x){
    if (!arguments.length) return data;
    data = x;
    values = _.values(data);
    return bambu; 
  };

  bambu.values = function(x){
    if (!arguments.length) return values;
    values = x;
    return values;
  };

  bambu.field = function(x){
    if (!arguments.length) return field;
    field = x;
    return bambu;
  };


  bambu.classify = function(type, ramp, n){
    
    var vals = values.sort(function(a, b) {
      return a - b;
    });

    switch (type){
      case 'quantile':
          var breaks = [];

          for (var i = 0; i < n; i++) {
            breaks.push( vals[Math.ceil(i * (vals.length - 1) / n)])
          }

          break;
      case 'equal_interval':
          var breaks = [],
            range = vals[vals.length - 1] - vals[0];

          for (var i=0; i < n; i++) {
            breaks.push(Math.floor(vals[0] + i * range / n))
          }

          breaks[n] = vals[vals.length - 1];
          break;
    }

    var classes = [];
    var style = '#'+ id +' { ' + ((default_fill) ? 'polygon-fill: ' + default_fill + '; ' : '');

 
    for (var b = 0; b < breaks.length-1; b++){
      var break_val = breaks[b];
      classes.push('['+field+' > '+break_val+'] { polygon-fill: ' + rgb2hex(colorbrewer[ramp][n][b]) + '; }');
    }

    return style + classes.join(' ') + '}';

  }


  function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
      ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
      ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
  }


  return bambu;
}


if (typeof module !== 'undefined' && module.exports) {
  _ = require('underscore');
  colorbrewer = require('./colorbrewer.js');
  module.exports.Bambu = Bambu;
}
