const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
	userID: { type: String, require: true },
	guildID: { type: String, require: true },

	firstName: { type: String, default: null },
	lastName: { type: String, default: null },

	bio: { type: String, default: null },
	photoURL: { type: String, default: null },

	gradelevel: { type: Number, default: 0 }, // 0 for Kindergarten

	schedule: { type: Object, default: { // Periods
		'1': null,
		'2': null,
		'3': null,
		'4': null,
		'5': null,
		'6': null,
		'7': null,
		'8': null,
		'9': null,
		'10': null,
	} },

	registeredAt: { type: Number, default: Date.now() },
});

module.exports = mongoose.model('Student', studentSchema);
