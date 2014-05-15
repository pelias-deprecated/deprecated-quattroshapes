
var ShapeFileStream = require( './ShapeFileStream' ),
    QuattroshapesImportStats = require( './QuattroshapesImportStats' );

var QuattroshapesImport = function( settings )
{
  this.esclient = require( 'pelias-esclient' );

  // do some basic sanity checks on the data to make sure it wont break
  // elasticsearch or node due to it's complexity or invalidity.
  this.sanityCheck = require( '../imports/sanityCheck/mapper' );

  this.mapper = require( settings.mapper );
  this.datasource = new ShapeFileStream( settings.data );

  this.stats = new QuattroshapesImportStats( settings.name, this );
  this.run();
}

QuattroshapesImport.prototype.run = function()
{
  var self = this;
  self.datasource.on( 'ready', function(){
    self.datasource
      .pipe( self.sanityCheck )
      .pipe( self.mapper )
      .pipe( self.esclient.stream );
  });
}

module.exports = QuattroshapesImport;