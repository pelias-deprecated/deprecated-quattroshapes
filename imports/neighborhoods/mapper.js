
var Transform = require('stream').Transform,
    geoJsonCenter = require('../../lib/geoJsonCenter'),
    mapper = new Transform({ objectMode: true });

mapper._write = function( data, enc, next ){

  try {

    this.push({
      _index: 'pelias', _type: 'neighborhood', _id: data.properties.woe_id,
      data: {
        gn_id: data.properties.gn_id || '',
        woe_id: data.properties.woe_id || '',
        boundaries: data.geometry,
        center_point: geoJsonCenter( data.geometry ),
        suggest: data.properties.name
      }
    });
  
  } catch( e ) {

    console.error( e );
    // console.log( JSON.stringify( data.geometry, null, 2 ) );

  }

  next();
}

module.exports = mapper;