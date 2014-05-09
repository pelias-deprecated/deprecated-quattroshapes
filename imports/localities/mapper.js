
var Transform = require('stream').Transform,
    geoJsonCenter = require('../../lib/geoJsonCenter'),
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  try {

    this.push({
      _index: 'pelias', _type: 'locality', _id: data.properties.qs_loc_lc,
      data: {
        gn_id: data.properties.gs_gn_id || '',
        woe_id: data.properties.woe_id || '',
        boundaries: data.geometry,
        center_point: geoJsonCenter( data.geometry ),
        suggest: data.properties.qs_loc
      }
    });

  } catch( e ) {

    console.error( e );
    // console.log( JSON.stringify( data.geometry, null, 2 ) );

  }

  next();
}

module.exports = mapper;