// const debug = require('debug')('app:startup');
const winston = require('winston');
const express = require("express");
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

require('./startup/middleware')(app)
require('./startup/logging')()
require('./startup/routes')(app)
require('./startup/db')()
require('./startup/config')()
require('./startup/validation')()


// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  winston.info(`Listening on port ${port}...`)
});