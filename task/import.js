
var QuattroshapesImport = require('../lib/QuattroshapesImport'),
    workload = require('../workload');

var importer = function( unitOfWork, done ) {

  var qImport = new QuattroshapesImport( unitOfWork );
  
  qImport.on( 'complete', done );

  qImport.stats.on( 'stats', function( statsObj ){
    console.log( statsObj.name, JSON.stringify( statsObj.stats ) );
  });

}

// Process imports in sync
module.exports = function(){

  var next = function(){}

  workload.reverse().forEach( function( unitOfWork ){
    next = importer.bind( this, unitOfWork, next );
  });

  next();
};