
var Transform = require('stream').Transform,
    geoJsonCenter = require('../../lib/geoJsonCenter'),
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  try {

    // Validation
    if( !data.properties.woe_id ){
      throw new Error( 'MAPPER - INVALID ID' );
    }

    if( !data.properties.name ){
      throw new Error( 'MAPPER - INVALID NAME' );
    }

    this.push({
      _index: 'pelias', _type: 'neighborhood', _id: data.properties.woe_id,
      data: {
        gn_id: data.properties.gn_id || '',
        woe_id: data.properties.woe_id || '',
        boundaries: data.geometry,
        center_point: geoJsonCenter( data.geometry ),
        suggest: {
          input: data.properties.name,
          output: data.properties.name,
          payload: {
            type: 'neighborhood',
            geoname_id: data.properties.gn_id || '',
            woe_id: data.properties.woe_id || ''
          }
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
