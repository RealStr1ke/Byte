const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
	userID: { type: String, require: true },
	guildID: { type: String, require: true },

	wallet: { type: Number, default: 1000 },
	bank: { type: Number, default: 0 },

	exp: { type: Number, default: 0 },
	level: { type: Number, default: 0 },

	registeredAt: { type: Number, default: Date.now() },

});

module.exports = mongoose.model('Member', memberSchema);

