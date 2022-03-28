const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	userID: { type: String, require: true },
	guildID: { type: String, require: true },

	economy: { type: Object, default: {
		wallet: 1000,
		bank: 0,
		multiplier: 0,
	} },

	exp: { type: Number, default: 0 },
	level: { type: Number, default: 0 },

	cooldowns: { type: Object, default: {
		daily: 0,
		beg: 0,
		coinflip: 0,
		rob: 0,
	} },

	registeredAt: { type: Number, default: Date.now() },

});

module.exports = mongoose.model('Member', memberSchema);

