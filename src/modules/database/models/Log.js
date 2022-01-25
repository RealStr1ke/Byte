const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({

	commandName: { type: String, default: 'unknown' },
	date: { type: Number, default: Date.now() },
	author: { type: Object, default: {
		username: 'Unknown',
		discrminator: '0000',
		id: null,
	} },
	guild: { type: Object, default: {
		name: 'Unknown',
		id: null,
	} },

});

module.exports = mongoose.model('Log', logSchema);
