
var Transform = require('stream').Transform,
    geoJsonCenter = require('../../lib/geoJsonCenter'),
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  try {

    // Validation
    if( !data.properties.qs_gn_id ){
      throw new Error( 'MAPPER - INVALID ID' );
    }

    if( !data.properties.qs_loc ){
      throw new Error( 'MAPPER - INVALID NAME' );
    }

    this.push({
      _index: 'pelias', _type: 'locality', _id: data.properties.qs_gn_id,
      data: {
        gn_id: data.properties.gs_gn_id || '',
        woe_id: data.properties.qs_woe_id || '',
        boundaries: data.geometry,
        center_point: geoJsonCenter( data.geometry ),
        suggest: {
          input: data.properties.qs_loc,
          output: data.properties.qs_loc,
          payload: {
            type: 'locality',
            geoname_id: data.properties.gs_gn_id || '',
            woe_id: data.properties.qs_woe_id || ''
          },
          weight: 5
        }
      }
    });

    this.emit( 'ok' );

  } catch( e ) {

    // console.error( e );
    this.emit( 'invalid', data );
    // console.log( JSON.stringify( data.geometry, null, 2 ) );

  }

  next();
}

module.exports = mapper;
