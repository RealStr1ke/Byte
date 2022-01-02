const Discord = require('discord.js');

const mongoose = require('mongoose');
const User = require("./models/User"),
    Guild = require("./models/Guild"),
    Member = require("./models/Member"),
    Student = require("./models/Student"),
    Log = require("./models/Log");


class Handler {
    constructor(client) {
        this.client = client;
    }

	// Loads the database
	async loadDatabase() {
		mongoose.connect(this.client.config.mongodb, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			// useFindAndModify: false
		}).then(() => {
			this.client.logger.startup("Connected to mongoDB database!");	
			mongoose.connection.on("error", console.error.bind(console, "Database connection error!"));
			return true;
		}).catch((err) => {
			this.client.logger.fail('An error occured while connecting to the database.');
			console.log(err);
			return false;
		});
	}
	
	// Closes the database connection
	async closeDatabase() {
		mongoose.connection.close().then(() => {
			this.client.logger.shutdown('Database closed.');
			return true;
		}).catch(() => {
			this.client.logger.fail('An error occured while closing the connection to the database.');
			console.log(err);
			return false;
		});
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

module.exports = Handler;
