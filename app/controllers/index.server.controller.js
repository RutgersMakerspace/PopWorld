exports.main = function(req, res) {
	res.render('index');
};

exports.render = function(req, rest) {
	res.render('index', {
		title: 'POP WORLD',
		user: req.user ? req.user.username : ''
	});
};
