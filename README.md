# Bambu.js

### A library for generating thematic carto.js styles from arrays of data 

Bambu is very simple Javascript library for classifying arrays of data, and can be used in Node.js or within a Browwer. The primary motivation for Bambu at this point is to create Carto.js style strings that can be used to style data within ModestMaps via the VECNIK vector tile library. 

Right now Bambu supports Quantile and Equal Interval classifications.

## Example

    // start with a simple array of data 
    var data = [0,35,2,41,46,10,9,5,3,23,55,76,64,42,22,22,37,6,77,8,3,1,3,4,5,11,14,17,34];
    
    var bambu = Bambu()
      .id('test')
      .field('val')
      .data(data, true) // passing true forces a classification to run, creating a style string
      .type('quantile')
      .colors('Reds')
      .classes(5);
    
    // to access the style string we call style() 
    var style = bambu.style();
    
    // we can update the style very easily by calling any of the methods above
    var new_style = bambu.colors('Blues').classify();
    
    // depending on the size of our data array we can choose to delay a re-classification
    // or force it generate a new one
    bambu.colors('YlGnBu', false).classes(9); // delays re-classification
    
    var style = bambu.classify();
    console.log(style);

    // this is what our final style var looks like:
    // #test { [val > 0] { polygon-fill: #f7fbff; } [val > 3] { polygon-fill: #deebf7; } [val > 5] { polygon-fill: #c6dbef; } [val > 8] { polygon-fill: #9ecae1; } [val > 11] { polygon-fill: #6baed6; } [val > 22] { polygon-fill: #4292c6; } [val > 34] { polygon-fill: #2171b5; } [val > 41] { polygon-fill: #08519c; }} 



## Dependencies

1. colorbrewer.js (see ./colorbrewer.js) 

## Authors

* Chris Helm (chelm now with Esri)
