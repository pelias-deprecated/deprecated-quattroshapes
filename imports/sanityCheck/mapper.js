
var Transform = require('stream').Transform,
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  // Skip invalid records
  if( !data ){
    console.error( 'SANITY CHECK - INVALID DATA' );
    this.emit( 'invalid', data );
  }

  // Skip invalid records
  else if( !data.geometry || !data.geometry.coordinates || !data.geometry.coordinates.length ){
    console.error( 'SANITY CHECK - INVALID GEOMETRY' );
    this.emit( 'invalid', data );
  }

  // Skip records where geometry is too large for ES to process
  else if( data.geometry.coordinates.length > 1000 ){
    console.error( 'SANITY CHECK - COORDS MAX LENGTH', data.geometry.coordinates.length );
    this.emit( 'invalid', data );
  }

  // Record is OK
  else {
    this.push( data );
    this.emit( 'ok' );
  }

  next();
}

module.exports = mapper;