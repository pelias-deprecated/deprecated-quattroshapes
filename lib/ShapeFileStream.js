
var util = require('util'),
    shapefile = require('shapefile'),
    Readable = require('stream').Readable;

function ShapeFileStream( filename, shapeFileOptions ){
  Readable.call( this, { objectMode: true } );
  this.reader = shapefile.reader( filename, shapeFileOptions );
  this.reader.readHeader( function( err, header ){
    if( err ){
      console.error( err );
      return this.emit( 'error', err );
    }
    this.emit( 'ready' );
  }.bind(this));
}

util.inherits( ShapeFileStream, Readable );

ShapeFileStream.prototype._read = function(){
  this.reader.readRecord( function( err, record ){
    if( err ){
      console.error( err );
      return this.emit( 'error', err );
    }
    this.push( record );
  }.bind(this) );
}

module.exports = ShapeFileStream;