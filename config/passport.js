var passport = require('passport');
var mongoose = require('mongoose');

module.exports = function() {
	var User = mongoose.model('User');

	//passport will save a user's _id property to the
	//session when a user is authenticated
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	//likewise, when the user object is needed, will use
	//the _id property to fetch the user obj from database
	passport.deserializeUser(function(id, done) {
		User.findOne(
			{_id: id},
			'-password', //dont fetch the password field
			function(err, user) {
				done(err, user);
			}
	)});

	require('./strategies/local.js')();
};
