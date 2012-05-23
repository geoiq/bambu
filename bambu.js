/** 
  Bambu generates thematic carto.js strings

  Currently under active development and is being used to style 
  vector tile json data in modestmaps via Carto.js & VECNIK.js.

  MIT License - Copryright 2012 
*/
function Bambu() {

  // defaults 
  var colors = 'Reds',
    type = 'quantile',
    classes = 5,
    style = '',
    data = [],
    id = '#',
    field = 'null',
    default_fill; 
    
  // returnable class
  var bambu = function(){};

  // regenerates the classification 
  bambu.classify = function(){

    var vals = data.sort(function(a, b) {
      return a - b;
    });

    switch (type){
      case 'quantile':
          var breaks = [];

          for (var i = 0; i < classes; i++) {
            breaks.push( vals[Math.ceil(i * (vals.length - 1) / classes)])
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

    var bins = [];
    style = '#'+ id +' { ' + ((default_fill) ? 'polygon-fill: ' + default_fill + '; ' : '');

    for (var b = 0; b < breaks.length-1; b++){
      var break_val = breaks[b];
      bins.push('['+field+' > '+break_val+'] { polygon-fill: ' + rgb2hex(colorbrewer[colors][classes][b]) + '; }');
    }

    style = style + bins.join(' ') + '}';
    return style;

  }

  bambu.id = function(x, gen){
    if (!arguments.length) return id;
    id = x;
    if (gen) bambu.classify();
    return bambu;
  };

  bambu.data = function(x, gen){
    if (!arguments.length) return data;
    data = x;
    if (gen) bambu.classify();
    return bambu; 
  };

  bambu.field = function(x, gen){
    if (!arguments.length) return field;
    field = x;
    if (gen) bambu.classify();
    return bambu;
  };

  bambu.colors = function(x, gen){
    if (!arguments.length) return colors;
    colors = x;
    if (gen) bambu.classify();
    return bambu;
  };

   bambu.classes = function(x, gen){
    if (!arguments.length) return classes;
    classes = x;
    if (gen) bambu.classify();
    return bambu;
  };

  bambu.type = function(x, gen){
    if (!arguments.length) return type;
    type = x;
    if (gen) bambu.classify();
    return bambu;
  };

  bambu.style = function(){
    return style;
  };


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
  //_ = require('underscore');
  colorbrewer = require('./colorbrewer.js');
  module.exports.Bambu = Bambu;
}
