const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');


module.exports = function () {

  process.on('uncaughtException', ex => {
    winston.info('WE GOT AN UNCOUGHT EXCEPTION', ex);
    winston.error(ex.message, ex);
    process.exit(1); // in prod use process manager
  })

  process.on('unhandledRejection', ex => {
    winston.info('WE GOT AN UNHANDLED REJECTION', ex);
    winston.error(ex.message, ex);
  })

  // check in docum..
  // winston.exceptions.handle(new winston.transports.File({
  // filename: 'uncoughtExceptions.log'
  // }))

  // to write this one and above and avoid to write process on unhandledRejection and uncaughtException
  // process.on('unhandledRejection', ex => {
  // 	throw ex;
  // })

  // throw new Error('Something failed during startup.')

  // const p = Promise.reject(new Error('Something failed miserably'))

  // winston.add(winston.transports.File, { - deprecating
  //     filename: 'logfile.log'
  // });

  winston.configure({
    transports: [
      new winston.transports.File({
        filename: 'logfile.log',
        level: 'log',
        // json: true,
        timestamp: true,
        // maxsize: 1000000
      }),
      new winston.transports.Console({
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        prettyPrint: true
      })
    ]
  });

  // winston.configure({
  //     transports: [new winston.transports.MongoDB({
  //         db: 'mongodb://localhost:27017/playground',
  //         level: 'error',
  //         // level: 'info' ...
  //     })]
  // });
}