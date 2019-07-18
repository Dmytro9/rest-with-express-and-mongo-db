const Joi = require("joi")
require('express-async-errors')
Joi.objectId = require('joi-objectid')(Joi)
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require("express");
const log = require('./middleware/logger');
const error = require('./middleware/error');
const courses = require('./routes/courses');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const home = require('./routes/home');
const mongoose = require('mongoose');

const app = express();

if (!config.get('jwtPrivateKey')) {
    console.log('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1) // - error (hear set)
    // process.exit(0) // - success
}

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
// console.log(`app: ${app.get('env')}`);


// DB
mongoose.connect('mongodb://localhost:27017/playground', {
        useNewUrlParser: true
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB... ', err));



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
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/api/rentals', rentals);
app.use('/api/users', users);
app.use('/api/auth', auth);

// Handling errors
app.use(error)

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