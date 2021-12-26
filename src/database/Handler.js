const Discord = require('discord.js');

const User = require("./models/User"),
    Guild = require("./models/Guild"),
    Member = require("./models/Member"),
    Student = require("./models/Student"),
    Log = require("./models/Log");

class MongoHandler {
    constructor(client) {
        this.client = client;
    }

    // Finds or creates a new user in the database
	async getUser(userID) {
		let user;
		try {
			user = await User.findOne({
				userID: userID
			});
			if (!user) {
				let user = await User.create({ 
					userID: userID
				});
				user.save();
				return user;
			}
			return user;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds or creates a new member in the database
	async getMember(userID, guildID) {
		let member;
		try {
			member = await Member.findOne({
				userID: userID,
				guildID: guildID
			});
			if (!member) {
				let member = await Member.create({
					userID: userID,
					guildID: guildID
				});
				member.save();
				return member;
			}
			return member;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds or creates a new student in the database
	async getStudent(userID, guildID) {
		let student;
		try {
			student = await Student.findOne({
				userID: userID,
				guildID: guildID
			});
			if (!student) {
				let student = await Student.create({
					userID: userID,
					guildID: guildID
				});
				student.save();
				return student;
			}
			return student;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds or creates a new guild in the database
	async getGuild(guildID) {
		let guild;
		try {
			guild = await Guild.findOne({
				guildID: guildID,
			});
			if (!guild) {
				let guild = await Guild.create({
					guildID: guildID,
				});
				guild.save();
				return guild;
			}
			return guild;
		} catch (err) {
			console.log(err);
		}
	}

	// Finds and deletes a new user in the database
	async deleteGuild(guildID) {
		let guild;
		try {
			guild = await Guild.findOne({
				guildID: guildID,
			});
			if (!guild) {
				return false
			}
			Guild.findOneAndDelete({
				guildID: guildID,
			})
			return true;
		} catch (err) {
			console.log(err);
			return false;
		}
	}

	
}