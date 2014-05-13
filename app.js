
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Transform = require('stream').Transform;

var ShapeFileStream = require('./lib/ShapeFileStream'),
    esclient = require('pelias-esclient');

// sanityCheck
var sanityCheck = require('./imports/sanityCheck/mapper');

// // admin0
// var stream = new ShapeFileStream( './data/qs_adm0.shp' );
// var mapper = require('./imports/admin0/mapper');

// // admin1
// var stream = new ShapeFileStream( './data/qs_adm1.shp' );
// var mapper = require('./imports/admin1/mapper');

// admin2
// var stream = new ShapeFileStream( './data/qs_adm2.shp' );
// var mapper = require('./imports/admin2/mapper');

// // local admin
// var stream = new ShapeFileStream( './data/qs_localadmin.shp' );
// var mapper = require('./imports/localadmin/mapper');

// neighborhoods
// var stream = new ShapeFileStream( './data/qs_neighborhoods.shp' );
// var mapper = require('./imports/neighborhoods/mapper');

// localities
// var stream = new ShapeFileStream( './data/gn-qs_localities.shp' );
// var mapper = require('./imports/localities/mapper');

// Debugger
// var mapper = require('./imports/debug/mapper');

// Stats

// var stats = { _invalid:0, _valid:0 }
// sanityCheck.on( 'invalid', function(){
//   stats._invalid++;
// });
// mapper.on( 'invalid', function(){
//   stats._invalid++;
// });
// mapper.on( 'ok', function(){
//   stats._valid++;
// });

// setInterval( function(){
//   console.log( 'stats:', stats );
// }, 500 );

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
    .pipe( esclient.stream )
    .on( 'error', console.log.bind(this) );
})