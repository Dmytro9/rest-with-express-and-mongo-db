const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require("express");
const log = require('./middleware/logger');
const app = express();
const courses = require('./routes/courses');
const home = require('./routes/home');

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);

app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.json()); // req.body

app.use(express.urlencoded({
    extended: true
})); // key=value&key=value

app.use(express.static('public'));

app.use(helmet());
app.use('/', home);
app.use('/api/courses', courses);


// console.log('Application Name: ' + config.get('name'));
// console.log('Mail Server: ' + config.get('mail.host'));
// console.log('Mail Password: ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('dev'));
    console.log('Morgan enabled...');
}

app.use(log);
app.use((req, res, next) => {
    console.log("Auth...");
    next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));