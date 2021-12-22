const mongoose = require('mongoose');
const config = require('../../src/config');

const guildSchema = new mongoose.Schema({
	guildID: { type: String, require: true },
	
	prefix: { type: String, default: config.prefix },
	plugins: { type: Object, default: {
		// Welcome Messages
		welcome: {
			enabled: false, 
			message: null, 
			channel: null
		},
		// Goodbye Messages
		goodbye: {
			enabled: false, 
			message: null, 
			channel: null
		},
		// Autorole
		autorole: {
			enabled: false, 
			role: null 
		},
		// Auto moderation
		automod: {
			enabled: false, 
			ignored: [] 
		},
		suggestions: false,
		modlogs: false, 
		logs: false 
	}},
	autoDeleteModCommands: { type: Boolean, default: false }, 
	disabledCommands: { type: Array, default: [] },
	disabledCategories: { type: Array, default: [] }
});

module.exports = mongoose.model("Guild", guildSchema);