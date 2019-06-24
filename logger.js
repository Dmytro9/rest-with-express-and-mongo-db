const EventEmitter = require('events');

var url = 'http://logger.io/log';

/*
 * Extend Event Class
 * 
**/

class Logger extends EventEmitter {
  log(message) {
    console.log(message);
  
    this.emit('messageLogger', {id: 1, url: 'http://'});
  }
}

module.exports = Logger;
