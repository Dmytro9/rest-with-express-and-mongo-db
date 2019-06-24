/*
 * Globals fns:
 * console.log();
 * setTimeout();
 * clearTimeout();
 * setInterval();
 * clearInterval(); 
 **/

// in client all global vars or methods can run as window.setTimeout()

// in node not added automatically => to add vars or methods to globals - global.message = 'some message';








/*
 * Modules (every file in node app)
 * every var and fn in node app incapsulated in theihr file, where they are located 
 **/

console.log(module)  








/*
 * Create Module
 *  
**/
var url = 'http://mylogger.io/log';

function log(message) {
  console.log(message);
}

module.exports.log = log;
module.exports.url = url;
module.exports.endPoint = url;

// or exporting only one var or fn => 
module.exports = log;








/*
 * Loading the Module
 * return an object of exported prop (fns and vars) or if exported one prop => then just var or fn
**/

const someObj = require('./2');








/*
 * Path Module (build in module (require('path'!!)) )
 * 
**/
const path = require('path');

const pathObject = path.parse(__filename);
console.log(pathObject);








/*
 * OS Module (build in module)
 * 
**/
const os = require('os');

const totalMemory = os.totalmem();
const freeMemory = os.freemem();
console.log(freeMemory);









/*
 * File System Module (build in module)
 * always use all async in real apps
**/
const fs = require('fs');

fs.readdir('./', (err, res) => console.log(res.length));










/*
 * Event Module (build in module)
 * EventEmiter - class (so capitalize)
**/

// Register a listener (register before emit event)
const Logger = require('./logger');
const logger = new Logger();

logger.on('messageLogger', (arg) => console.log('Listener called', arg));


logger.log('message');









/*
 * HTTP Module (build in module)
 * a lot functionality is based on event emitting 
**/

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello world!');
    res.end();
  }

  if (req.url === '/api/courses') {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
});

// server.on('connection', (socket) => console.log('New connection'));

server.listen(3000, () => console.log('listening on port 3000...'));
