
var fs = require('fs'),
    util = require('util'),
    request = require('request'),
    mkdirp = require('mkdirp'),
    decompress = require('decompress'),
    pad = require('pad'),
    progress = require('../util/streamProgressBar');

var download = function( filename, done )
{
  var remoteFilePath = util.format( 'http://static.quattroshapes.com/%s', filename );
  
  mkdirp( 'data', function( error ){

    if( error ){ return console.error( error ); }

    request.get( remoteFilePath )
      .on( 'end', done )
      .pipe( progress( pad( filename, 30 ) ) )
      .pipe( decompress({ path: 'data', ext: '.zip' }) );

  });
}

// Process file in sync
module.exports = function( filenames ){

  var next = function(){}

  filenames.reverse().forEach( function( filename ){
    next = download.bind( this, filename, next );
  });

  next();
};
