var mongoose = require('mongoose');
var crypto = require('crypto');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name: String,
	email: String,
	username: {
		type: String,
		trim: true, //properly remove whitespace
		unique: true
	},
	password: String,
	provider: String, //the strategy used to register the user
	providerId: String, //the user identifier for the authentication strategy`
	providerData: {}, //used to store the user object retrieved from OAuth
});

//pre save middleware to handle users password hashing
UserSchema.pre('save', function(next) {
		if(this.password) {
			//create an MD5 hash of the password
			var md5 = crypto.createHash('md5');
			//replace current password with a hashed one
			this.password = md5.update(this.password).digest('hex');
		}

		next();
	}
);

//accepts string password argument, which it then hashes and
//compares to the current users hashed password
UserSchema.methods.authenticate = function(password) {
	var md5 = crypto.createHash('md5');
	md5 = md5.update(password).digest('hex');

	//this.password is current users hashed password, md5 is newly hashed pass
	return this.password === md5;
};

//used when username already exists
UserSchema.statics.findUniqueUsername = function(username, suffix, callback) {
	var _this = this;
	var possibleUsername = username + (suffix || '');

	_this.findOne({username: possibleUsername}, function(err, user) {
		if(!err) {
			if(!user) {
				callback(possibleUsername);
			}
			else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		}
		else {
			callback(null);
		}
	});
};

mongoose.model('User', UserSchema);
