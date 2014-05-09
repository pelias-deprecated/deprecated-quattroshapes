
var Transform = require('stream').Transform,
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  console.log( JSON.stringify( data, null, 2 ) );

}

module.exports = mapper;