const error = require('../middleware/error');
const courses = require('../routes/courses');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const rentals = require('../routes/rentals');
const movies = require('../routes/movies');
const users = require('../routes/users');
const auth = require('../routes/auth');
const home = require('../routes/home');


module.exports = function (app) {
	app.use('/', home);
	app.use('/api/courses', courses);
	app.use('/api/genres', genres);
	app.use('/api/customers', customers);
	app.use('/api/movies', movies);
	app.use('/api/rentals', rentals);
	app.use('/api/users', users);
	app.use('/api/auth', auth);

	// Handling errors (wich happen in request process pipline)
	app.use(error)
}