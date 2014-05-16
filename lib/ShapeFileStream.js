
var util = require('util'),
    shapefile = require('shapefile'),
    Readable = require('stream').Readable;

function ShapeFileStream( filename, shapeFileOptions ){
  Readable.call( this, { objectMode: true } );
  this.eof = false;
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
    if( record === shapefile.end ){
      this.eof = true;
      this.emit( 'eof' );
    }
    else {
      // This error should never trigger
      if( this.eof ){
        console.log( 'got record after EOF' );
        console.log( record );
        process.exit( 1 );
      }
      this.push( record );
    }
  }.bind(this) );
}

module.exports = ShapeFileStream;