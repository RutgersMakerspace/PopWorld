var users = require('../controllers/users.server.controller');
var passport = require('passport');

module.exports = function(app) {
	app.route('/users')
		.get(users.list);

	app.route('/register')
		.get(users.renderRegister)
		.post(users.register);

	app.route('/login')
		.get(users.renderLogin)
		.post(passport.authenticate('local', {
			successRedirect: '/',
			failureRedirect: '/login',
			failureFlash: true
		}));

	app.get('/logout', users.logout);
};
