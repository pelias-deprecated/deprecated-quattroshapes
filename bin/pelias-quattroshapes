#!/usr/bin/env node

var program = require('commander-plus'),
    workload = require('../workload');

program
  .version('0.0.0')
  .usage('[options]')
  .option('-d, --download', 'download quattroshapes data')
  .option('-i, --import', 'import all quattroshapes data in to Pelias')
  .parse(process.argv);

if( program.download ){
  var task = require('../task/download');
  task( workload.map( function( unitOfWork ){
    return unitOfWork.remote;
  }) );
}

else if( program.import ){
  var task = require('../task/import');
  task();
}

else {
  program.help();
}