
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Transform = require('stream').Transform;

var ShapeFileStream = require('./lib/ShapeFileStream'),
    esclient = require('pelias-esclient');

// sanityCheck
var sanityCheck = require('./imports/sanityCheck/mapper');

// local admin
var stream = new ShapeFileStream( './data/qs_localadmin.shp' );
var mapper = require('./imports/localadmin/mapper');

// neighborhoods
// { _invalid: 0, _valid: 49906 }
// var stream = new ShapeFileStream( './data/qs_neighborhoods.shp' );
// var mapper = require('./imports/neighborhoods/mapper');

// localities
// { _invalid: 26404, _valid: 136981 }
// var stream = new ShapeFileStream( './data/gn-qs_localities.shp' );
// var mapper = require('./imports/localities/mapper');

// Debugger
// var debugmapper = require('./imports/debug/mapper');

// Transform stream for pretty output
// var objectToJsonStream = new Transform({ objectMode: true });
// objectToJsonStream._transform = function( record, enc, next ){
//   this.push( JSON.stringify( record, null, 2 ) );
//   next();
// }

var stats = { _invalid:0, _valid:0 }
sanityCheck.on( 'invalid', function(){
  stats._invalid++;
});
mapper.on( 'invalid', function(){
  stats._invalid++;
});
mapper.on( 'ok', function(){
  stats._valid++;
});

setInterval( function(){
  console.log( 'stats:', stats );
}, 500 );

stream.on( 'ready', function(){
  stream
    .on( 'error', console.log.bind(this) )
    .pipe( sanityCheck )
    .on( 'error', console.log.bind(this) )
    .pipe( mapper )
    // .on( 'invalid', function( record ){
    //   console.log( JSON.stringify( record, null, 2 ) );
    //   // process.exit(1);
    // })
    .on( 'error', console.log.bind(this) )
    // .pipe( debugmapper )
    .pipe( esclient.stream )
    .on( 'error', console.log.bind(this) )
    // .pipe( objectToJsonStream ).pipe( process.stdout );
})