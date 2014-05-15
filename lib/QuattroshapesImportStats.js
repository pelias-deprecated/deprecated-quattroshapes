
var util = require('util'),
    EventEmitter = require('events').EventEmitter;

var QuattroshapesImportStats = function( name, qImport )
{
  this.name = name;
  this.qImport = qImport;
  this.stats = { total: 0, invalid: 0, valid: 0, written: 0, indexed: 0, errored: 0, queued: 0 }
  EventEmitter.call( this );

  this.bindSanityCheck();
  this.bindMapper();
  this.bindEsClient();
}

util.inherits( QuattroshapesImportStats, EventEmitter );

QuattroshapesImportStats.prototype.update = function()
{
  this.emit( 'stats', { name: this.name, stats: this.stats } );
}

QuattroshapesImportStats.prototype.bindSanityCheck = function()
{  
  var self = this;
  this.qImport.sanityCheck.on( 'invalid', function(){
    self.stats.invalid++;
    self.stats.total++;
    self.update();
  });
  this.qImport.sanityCheck.on( 'ok', function(){
    self.stats.total++;
    self.update();
  });
}

QuattroshapesImportStats.prototype.bindMapper = function()
{  
  var self = this;
  this.qImport.mapper.on( 'invalid', function(){
    self.stats.invalid++;
    self.update();
  });
  this.qImport.mapper.on( 'ok', function(){
    self.stats.valid++;
    self.update();
  });
}

QuattroshapesImportStats.prototype.bindEsClient = function()
{  
  var self = this;
  this.qImport.esclient.stream.on( 'stats', function( stats ){
    for( var attr in stats ){
      self.stats[attr] = stats[attr];
    }
    self.update();
  });
}

module.exports = QuattroshapesImportStats;