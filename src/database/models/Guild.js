const mongoose = require('mongoose');
const config = require('../../config');

const guildSchema = new mongoose.Schema({
	guildID: { type: String, require: true },

	prefix: { type: String, default: config.prefix },
	plugins: { type: Object, default: {
		// Welcome Messages
		welcome: {
			enabled: false,
			message: null,
			channel: null,
		},
		// Goodbye Messages
		goodbye: {
			enabled: false,
			message: null,
			channel: null,
		},
		// Autorole
		autorole: {
			enabled: false,
			role: null,
		},
		// Auto moderation
		automod: {
			enabled: false,
			ignored: [],
		},
		suggestions: {
			enabled: false,
			channel: null,
		},
		modLogs: {
			enabled: false,
			channel: null,
		},
		logs: {
			enabled: false,
			channel: null,
		},
		education: {
			enabled: false,
			school: null,
			address: null,
			phone: null,
			logoURL: null,
			staff: {
				teachers: [],
				administration: [],
			},
			studentData: [],
			subjects: [],
		},
	} },
	autoDeleteModCommands: { type: Boolean, default: false },
	disabledCommands: { type: Array, default: [] },
	disabledCategories: { type: Array, default: [] },
});

module.exports = mongoose.model('Guild', guildSchema);