const { Intents, Permissions } = require('discord.js');
module.exports = {
	/* The token of the Discord Bot */
	token: '',

	/* The prefix(s) of the Discord Bot */
	prefix: 'b!',

	support: {
		id: '',
		logs: {
			database: '',
			commands: '',
			errors: '',
			status: '',
			debug: '',
		},
	},

	embed: {
		color: '#0091fc', // The default color for embeds
		footer: 'Byte | Open Source', // The default footer text for embeds
	},

	mongodb: '',

	/* The information of the bot's owner */
	owner: {
		id: '',
		name: '',
	},

	apiKeys: { // The API keys that are used
		// AlexFlipnote's API
		flipnoteAPI: '',
		// Hypixel API
		hypixelAPI: '',
		// Amethyste API (https://api.amethyste.moe)
		amethyste: '',
	},
	status: {
		name: 'with Str1ke\'s mind', // The status text of the bot
		type: 'PLAYING', // The status type of the bot
	},

	custom: {
		/* Custom values go here*/
	},

	// Developer Zone
	/* The debug status of the bot */
	debug: false,

	/* The Discord intents for the bot*/
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_BANS,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
		Intents.FLAGS.GUILD_VOICE_STATES,
		Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
		Intents.FLAGS.DIRECT_MESSAGES,
		Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
		Intents.FLAGS.DIRECT_MESSAGE_TYPING,
	], // or 32767 for All Intents

	/* The Discord partials for the bot*/
	partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER'],

	/* The Discord permissions and scopes for the bot */
	permissions: [
		Permissions.FLAGS.CREATE_INSTANT_INVITE,
		Permissions.FLAGS.SEND_MESSAGES,
		Permissions.FLAGS.VIEW_CHANNEL,
		Permissions.FLAGS.MANAGE_GUILD,
		Permissions.FLAGS.MANAGE_CHANNELS,
		Permissions.FLAGS.EMBED_LINKS,
		Permissions.FLAGS.ATTACH_FILES,
		Permissions.FLAGS.READ_MESSAGE_HISTORY,
		Permissions.FLAGS.MENTION_EVERYONE,
		Permissions.FLAGS.CONNECT,
		Permissions.FLAGS.SPEAK,
		Permissions.FLAGS.MUTE_MEMBERS,
		Permissions.FLAGS.DEAFEN_MEMBERS,
		Permissions.FLAGS.MOVE_MEMBERS,
		Permissions.FLAGS.CHANGE_NICKNAME,
		Permissions.FLAGS.MANANGE_NICKNAMES,
		Permissions.FLAGS.MANAGE_ROLES,
		Permissions.FLAGS.MANAGE_EMOJIS_AND_STICKERS,
		Permissions.FLAGS.USE_APPLICATION_COMMANDS,
		Permissions.FLAGS.MANAGE_THREADS,
		Permissions.FLAGS.CREATE_PUBLIC_THREADS,
		Permissions.FLAGS.CREATE_PRIVATE_THREADS,
		Permissions.FLAGS.USE_EXTERNAL_STICKERS,
		Permissions.FLAGS.SEND_MESSAGES_IN_THREADS,
		Permissions.FLAGS.KICK_MEMBERS,
		Permissions.FLAGS.BAN_MEMBERS,
		Permissions.FLAGS.ADD_REACTIONS,
		Permissions.FLAGS.VIEW_AUDIT_LOG,
	],
	scopes: ['bot', 'applications.commands'],

};
