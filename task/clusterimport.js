
var ClusterImport = require('../lib/ClusterImport'),
    QuattroshapesImport = require('../lib/QuattroshapesImport'),
    workload = require('../workload');

module.exports = function () {

  var cImport = new ClusterImport( workload, function( unitOfWork )
  {
    var qImport = new QuattroshapesImport( unitOfWork );
    
    qImport.stats.on( 'stats', function( statsObj ){
      console.log( statsObj.name, JSON.stringify( statsObj.stats ) );
    });
  
  });

}