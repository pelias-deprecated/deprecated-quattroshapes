#!/usr/bin/env node

var program = require('commander-plus');

program
  .version('0.0.0')
  .usage('[options]')
  .option('-d, --download', 'locally cache data from geonames.org for [ISO country code]')
  .parse(process.argv);

// if( program.foo ){
//   program.prompt('name: ', function(name){
//     console.log('hi %s', name);
//     process.stdin.destroy();
//   });
// }

if( program.countrycodes ){
  var task = require('../task/countrycodes');
  task();
}

else if( program.import ){
  var isocode = validateISOCode( program.import );
  var task = require('../task/import');
  task( isocode === 'ALL' ? 'allCountries' : isocode );
}

else if( program.download ){
  var isocode = validateISOCode( program.download );
  var task = require('../task/download');
  task( isocode === 'ALL' ? 'allCountries' : isocode );
}

else if( program.meta ){
  var task = require('../task/meta');
  task();
}

else {
  program.help();
}

function error( message ){
  console.error( '\n  ' + message + '\n' );
  process.exit( 1 );
}

function validateISOCode( input ){
  var isocode = ( 'string' === typeof input ) ? input.toUpperCase() : null;
  if( !isocode || ( isocode !== 'ALL' && !( isocode in countryInfo ) ) ){
    return error( 'invalid ISO code. either use \'ALL\' or list available ISO codes with the -c option' );
  }
  return isocode;
}