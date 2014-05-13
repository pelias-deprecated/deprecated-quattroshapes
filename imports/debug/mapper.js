
var Transform = require('stream').Transform,
    mapper = new Transform({ objectMode: true });

// Record property stats
var stats = { total: 0 };

setInterval( function(){
  console.log( 'stats', stats );
});

mapper._write = function( data, enc, next ){

  stats.total++;
  for( var attr in data.properties ){
    if( !stats[attr] ) stats[attr] = 0;
    if( data.properties[attr] ) stats[attr]++;
  }

  // console.log( JSON.stringify( data, null, 2 ) );

  next();
}

module.exports = mapper;