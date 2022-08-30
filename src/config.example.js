const { PermissionsBitField, GatewayIntentBits, Partials } = require('discord.js');
module.exports = {
	/* The token of the Discord Bot */
	token: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',

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

	// API Keys
	apiKeys: { // The API keys that are used
		// AlexFlipnote's API
		flipnoteAPI: '',

		// Hypixel API
		hypixelAPI: '',

		// Amethyste API (https://api.amethyste.moe)
		amethyste: '',
	},

	// Discord Status
	status: {
		name: 'with Str1ke\'s mind', // The status text of the bot
		type: 'PLAYING', // The status type of the bot
	},

	// Developer Zone
	// The debug status of the bot
	debug: false,

	// Custom configurations
	custom: {	},

	// Discord Gateway Intents for the bot
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildBans,
		GatewayIntentBits.GuildMessageReactions,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildEmojisAndStickers,
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.DirectMessageReactions,
		GatewayIntentBits.DirectMessageTyping,
	], // or 32767 for All Intents

	// Discord Partials for the bot
	partials: [
		Partials.Message,
		Partials.Channel,
		Partials.Reaction,
		Partials.GuildMember,
		Partials.User,
	],

	// Discord Permissions for the bot
	permissions: [
		PermissionsBitField.Flags.CreateInstantInvite,
		PermissionsBitField.Flags.SendMessages,
		PermissionsBitField.Flags.ViewChannel,
		PermissionsBitField.Flags.ManageGuild,
		PermissionsBitField.Flags.ManageChannels,
		PermissionsBitField.Flags.EmbedLinks,
		PermissionsBitField.Flags.AttachFiles,
		PermissionsBitField.Flags.ReadMessageHistory,
		PermissionsBitField.Flags.MentionEveryone,
		PermissionsBitField.Flags.Connect,
		PermissionsBitField.Flags.Speak,
		PermissionsBitField.Flags.MuteMembers,
		PermissionsBitField.Flags.DeafenMembers,
		PermissionsBitField.Flags.MoveMembers,
		PermissionsBitField.Flags.ChangeNickname,
		PermissionsBitField.Flags.ManageNicknames,
		PermissionsBitField.Flags.ManageRoles,
		PermissionsBitField.Flags.ManageWebhooks,
		PermissionsBitField.Flags.ManageEmojisAndStickers,
		PermissionsBitField.Flags.UseApplicationCommands,
		PermissionsBitField.Flags.ManageThreads,
		PermissionsBitField.Flags.CreatePublicThreads,
		PermissionsBitField.Flags.CreatePrivateThreads,
		PermissionsBitField.Flags.UseExternalEmojis,
		PermissionsBitField.Flags.UseExternalStickers,
		PermissionsBitField.Flags.SendMessagesInThreads,
		PermissionsBitField.Flags.KickMembers,
		PermissionsBitField.Flags.BanMembers,
		PermissionsBitField.Flags.AddReactions,
		PermissionsBitField.Flags.ViewAuditLog,
	],
	scopes: ['bot', 'applications.commands'],

};
