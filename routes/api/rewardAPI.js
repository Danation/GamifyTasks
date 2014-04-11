var mongoose = require('mongoose');
var Reward = require('../../models/rewards.js').Reward;

// GET /api/reward/:id
// Get one specific reward
exports.getRewardByID = function(req, res) {
	Reward.findById(req.params.id, function(err, reward) {
		if (!err && reward) {
			res.send(reward);
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};

// GET /api/reward/
// Get all rewards
exports.getRewardsByUser = function(req, res) {
	Reward.find({ 'userID' : req.session.userId },
		function(err, rewards) {
			if (!err && rewards) {
				res.send(rewards);
			}
			else {
				console.log(err);
				res.send(400);
			}
		});
};

// POST /api/reward/
// Add new reward
exports.addReward = function(req, res) {
	var reward;
	try
	{
		reward = new Reward({
			userID : req.session.userId,
			name : req.body.name,
			categories : {
				green : req.body.categories.green,
				purple : req.body.categories.purple,
				red : req.body.categories.red,
				blue : req.body.categories.blue
			},
			schedule : req.body.schedule
		});
	}
	catch (err) {
		// Not enough information in request body
		res.send(400);
		return;
	}
	reward.save(function(err) {
		if (!err) {
			// Send back reward
			res.send(reward);
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};

// PUT /api/reward/:id
// Update reward (or insert if id is not yet in database)
exports.updateReward = function(req, res) {
	Reward.findByIdAndUpdate(req.params.id,
	{
		userID : req.session.userId,
		name : req.body.name,
		categories : {
			green : req.body.categories.green,
			purple : req.body.categories.purple,
			red : req.body.categories.red,
			blue : req.body.categories.blue
		},
		schedule : req.body.schedule
	},
	{ upsert : true },
	function(err, reward) {
		// Send back object if successful
		if (!err && reward) {
			res.send(reward);
		}
		else {
			res.send(400);
		}
	});
};

// DELETE /api/reward/:id
// Find reward by id, make sure it exists, and delete it
exports.deleteReward = function(req, res) {
	Reward.findByIdAndRemove(req.params.id, function(err, reward) {
		if (!err && reward) {
			res.send(200);
		}
		else {
			console.log(err);
			res.send(400);
		}
	});
};