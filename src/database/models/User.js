const mongoose = require('mongoose');

const genToken = () => {
	let token = 'B-';
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_';
	for (let i = 0; i < 32; i++) {
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return token;
};

const userSchema = new mongoose.Schema({
	userID: { type: String },

	rep: { type: Number, default: 0 },
	bio: { type: String },
	birthdate: { type: Number },
	spouse: { type: String },

	registeredAt: { type: Number, default: Date.now() },

	cooldowns: { type: Object, default: {
		rep: 0,
	} },

	afk: { type: String, default: null },
	reminds: { type: Array, default: [] },
	apiToken: { type: String, default: genToken() },

});

userSchema.method('genApiToken', async function() {
	this.apiToken = genToken();
	await this.save();
	return this.apiToken;
});

module.exports = mongoose.model('User', userSchema);