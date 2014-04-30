
var cluster = require('cluster');
var numCPUs = require('os').cpus().length;

var Transform = require('stream').Transform;

var ShapeFileStream = require('./lib/ShapeFileStream'),
    esclient = require('pelias-esclient');

// var stream = new ShapeFileStream( './data/qs_neighborhoods.shp' );
// var stream = new ShapeFileStream( './data/quattroshapes_gazetteer_gn_then_gp_locality.shp' );
var stream = new ShapeFileStream( './data/gn-qs_localities.shp' );


// Transform stream for pretty output
// var objectToJsonStream = new Transform({ objectMode: true });
// objectToJsonStream._transform = function( record, enc, next ){
//   this.push( JSON.stringify( record, null, 2 ) );
//   next();
// }

// Transform stream for creating esclient object
var esClientTransform = new Transform({ objectMode: true });
esClientTransform._write = function( data, enc, next ){

  try {

    console.log( JSON.stringify( data, null, 2 ) );
    process.exit(1);

    // data.geometry.type = data.geometry.type.toLowerCase();
    // console.log( JSON.stringify( data.geometry, null, 2 ) );
    // process.exit();
    // data.geometry.coordinates = data.geometry.coordinates[0];

    var command = {
      _index: 'pelias', _type: 'neighborhood', _id: data.woe_id,
      data: {
        gn_id: data.properties.gn_id,
        woe_id: data.properties.woe_id,
        boundaries: data.geometry,
        // center_point: findCenterPoint( data.geometry.coordinates[0] ),
        suggest: data.properties.name
      }
    }
    this.push( command );
  }
  catch( e ){
    console.error( e );
    return console.log( JSON.stringify( data.geometry, null, 2 ) );
  }

  next();
}

stream.on( 'ready', function(){
  stream
    .pipe( esClientTransform )
    .pipe( esclient.stream )
    // .pipe( objectToJsonStream ).pipe( process.stdout );
})