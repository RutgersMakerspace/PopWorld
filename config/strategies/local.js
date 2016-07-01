var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne(
			{username: username},
			function(err, user) {
				if(err) {
					//return a callback with an error
					return done(err);
				}
				if(!user) {
					//return a callback with no error, and false for 
					//user authenticated with an optional message
					return done(null, false, {message: 'Unknown user'});
				}
				if(!user.authenticate(password)) {
					return done(null, false, {message: 'Invalid password'});
				}
				//success
				return done(null, user);
			}
		);
	}));
};
