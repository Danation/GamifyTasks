var mongoose = require('mongoose');
var wallet = new mongoose.Schema({
	userID: String,
	green: Number,
	purple: Number,
	red: Number,
	blue: Number
});

exports.wallet = wallet;