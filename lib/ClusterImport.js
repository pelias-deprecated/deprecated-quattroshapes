
var cluster = require('cluster'),
    numCPUs = require('os').cpus().length;

var ClusterImport = function( workload, eachWorkerCb )
{
  this.workload = workload;
  this.workers = [];

  if( !cluster.isMaster ) {
    process.on( 'message', eachWorkerCb );
  }

  else {
    this.fork();
    this.assignWorkload();

    cluster.on( 'exit', function( worker, code, signal ) {
      console.log( 'worker ' + worker.process.pid + ' died' );
    });
  }
}

ClusterImport.prototype.fork = function()
{
  for( var c=0; c<numCPUs; c++ ){
    this.workers.push( cluster.fork() );
  }
}

ClusterImport.prototype.assignWorkload = function()
{
  var self = this;
  var currentWorker = 0;
  this.workload.forEach( function( workload ){

    // Send workload to worker
    self.workers[currentWorker].send( workload );

    // Cycle through worker nodes
    currentWorker++;
    if( !self.workers[currentWorker] ){ currentWorker = 0; }
  });
}

module.exports = ClusterImport;