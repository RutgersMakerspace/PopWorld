var config = require('./config');
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function() {
	//create an express app
	var app = express();

	//for parsing mongoDB json data
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());

	//define html src to be ./app/views
	app.set('views','./app/views');
	//using ejs templating
	app.set('view engine', 'ejs');

	//routes library
	require('../app/routes/index.server.routes.js')(app);
	//require('../app/routes/users.server.routes.js')(app);

	//define where static files will be
	app.use(express.static('./public'));
	
	return app;
};
