
var ClusterImport = require('./lib/ClusterImport'),
    QuattroshapesImport = require('./lib/QuattroshapesImport');

var workload = [{
    name: 'admin0',
    data: './data/qs_adm0.shp',
    mapper: '../imports/admin0/mapper'
  }, {
    name: 'admin1',
    data: './data/qs_adm1.shp',
    mapper: '../imports/admin1/mapper'
  }, {
    name: 'admin2',
    data: './data/qs_adm2.shp',
    mapper: '../imports/admin2/mapper'
  }, {
    name: 'localadmin',
    data: './data/qs_localadmin.shp',
    mapper: '../imports/localadmin/mapper'
  }, {
    name: 'neighborhoods',
    data: './data/qs_neighborhoods.shp',
    mapper: '../imports/neighborhoods/mapper'
  }, {
    name: 'localities',
    data: './data/gn-qs_localities.shp',
    mapper: '../imports/localities/mapper'
}];

var cImport = new ClusterImport( workload, function( unitOfWork )
{
    var qImport = new QuattroshapesImport( unitOfWork );
    qImport.stats.on( 'stats', function( statsObj ){
      console.log( statsObj.name, statsObj.stats );
    });
});