var User = require('mongoose').model('User');
var passport = require('passport');

var getErrorMessage = function(err) {
	var message = '';
	if(err.code) {
		switch(err.code) {
			case 11000:
			case 11001:
				message = 'Username already exists';
				break;
			default: 
				message = 'Something went wrong';
		}
	}
	else {
			for(var errName in err.errors) {
				if(err.errors[errName].message)
					message = err.errors[errName].message;
			}
	}
	return message;
};

exports.renderLogin = function(req, res, next) {
	if(!req.user) { //if current session has no logged in user
		res.render('login', {
			title: 'Log-in Form',
			messages: req.flash('error') || req.flash('info')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.renderRegister = function(req, res, next) {
	if(!req.user) {
		res.render('register', {
			title: 'Register Form',
			messages: req.flash('error')
		});
	}
	else {
		return res.redirect('/');
	}
};

exports.register = function(req,res,next) {
	if(!req.user) {
		var user = new User(req.body);
		var message = null;

		user.provider = 'local'; //strategy used to register the user
		user.save(function(err) {
			if(err) {
				var message = getErrorMessage(err);
				req.flash('error', message);
				return res.redirect('/register');
			}

			req.login(user, function(err) {
				if(err)
					return next(err);
				return res.redirect('/');
			});
		});

	}
	else {
		return res.redirect('/');
	}
};

exports.logout = function(req, res) {
	req.logout();
	res.redirect('/');
};
