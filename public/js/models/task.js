Gamify.Task = DS.Model.extend({
	 "userID": DS.attr('string'),
	"name": DS.attr('string'),
	"green": DS.attr('number'),
	"purple": DS.attr('number'),
	"red": DS.attr('number'),
	"blue": DS.attr('number'),
	"schedule": DS.attr('string'),
	"__v" : DS.attr('number')
});

