
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Transform = require('stream').Transform;

var ShapeFileStream = require('./lib/ShapeFileStream'),
    esclient = require('pelias-esclient');

// neighborhoods
// var stream = new ShapeFileStream( './data/qs_neighborhoods.shp' );
// var mapper = require('./imports/neighborhoods/mapper');

// localities
var stream = new ShapeFileStream( './data/gn-qs_localities.shp' );
var mapper = require('./imports/localities/mapper');
// var debugmapper = require('./imports/debug/mapper');

// Transform stream for pretty output
// var objectToJsonStream = new Transform({ objectMode: true });
// objectToJsonStream._transform = function( record, enc, next ){
//   this.push( JSON.stringify( record, null, 2 ) );
//   next();
// }

stream.on( 'ready', function(){
  stream
    .pipe( mapper )
    // .pipe( debugmapper )
    .pipe( esclient.stream )
    // .pipe( objectToJsonStream ).pipe( process.stdout );
})