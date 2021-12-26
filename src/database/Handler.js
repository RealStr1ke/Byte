const Discord = require('discord.js');

const User = require("./models/User"),
    Guild = require("./models/Guild"),
    Member = require("./models/Member"),
    Student = require("./models/Student"),
    Log = require("./models/Log");

class MongoHandler {
    constructor() {
        this.client = client;
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
				member = this.createMember(userID, guildID);
				return member;
			}
			return member;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}
	// Creates a new member in the database
	async createMember(userID, guildID) {
		let member;
		try {
			member = await Member.create({
				userID: userID,
				guildID: guildID
			});
			member.save();
			return member;
		} catch (err) {
			this.client.logger.fail(error.message)
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
				student = this.createStudent(userID, guildID);
				return student;
			}
			return student;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}
	// Creates a new member in the database
	async createStudent(userID, guildID) {
		let student;
		try {
			student = await Student.create({
				userID: userID,
				guildID: guildID
			});
			student.save();
			return student;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}

	// Finds or creates a new user in the database
	async getUser(userID) {
		let user;
		try {
			user = await User.findOne({
				userID: userID
			});
			if (!user) {
				user = this.createUser(userID);
				return user;
			}
			return user;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}
	// Creates a new user in the database
	async createUser(userID) {
		let user;
		try {
			user = await User.create({
				userID: userID
			});
			user.save();
			return user;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}

	// Finds or creates a new guild in the database
	async getGuild(guildID) {
		let guild;
		try {
			guild = await Guild.findOne({
				guildID: guildID
			});
			if (!guild) {
				guild = this.createGuild(guildID);
				return guild;
			}
			return guild;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}
	// Creates a new guild in the database
	async createGuild(guildID) {
		let guild;
		try {
			guild = await Guild.create({
				guildID: guildID
			});
			guild.save();
			return guild;
		} catch (err) {
			this.client.logger.fail(error.message)
			console.log(err);
		}
	}
}