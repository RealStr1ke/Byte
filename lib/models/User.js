const mongoose = require('mongoose');

const genToken = () => {
	let token = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwzy0123456789.-_";
	for (let i = 0; i < 32; i++){
		token += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return token;
};

const userSchema = new mongoose.Schema({
	id: { type: String }, 

	rep: { type: Number, default: 0 },
	bio: { type: String }, 
	birthdate: { type: Number }, 
	spouse: { type: String }, 

	registeredAt: { type: Number, default: Date.now() },

	achievements: { type: Object, default: {
		married: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		},
		work: {
			achieved: false,
			progress: {
				now: 0,
				total: 10
			}
		},
		firstCommand: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		},
		rep: {
			achieved: false,
			progress: {
				now: 0,
				total: 20
			},
		},
		invite: {
			achieved: false,
			progress: {
				now: 0,
				total: 1
			}
		}
	}},

	cooldowns: { type: Object, default: {
		rep: 0
	}},

	afk: { type: String, default: null },
	reminds: { type: Array, default: [] },
	apiToken: { type: String, default: genToken() }

});

userSchema.method("genApiToken", async function(){
	this.apiToken = genToken();
	await this.save();
	return this.apiToken;
});

module.exports = mongoose.model("User", userSchema);