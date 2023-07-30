const Discord = require('discord.js');
// const { Message, EmbedBuilder } = require('discord.js');

// Message Extenders
async function AmongUsMessage() {
	this.reply('Among Us!');
}

// Discord.Message.prototype.sus = AmongUsMessage;


// EmbedBuilder Extenders
function DefaultEmbedParams(client) {
	this
		.setAuthor({
			name: client.user.tag,
			iconURL: client.user.displayAvatarURL(),
		})
		.setFooter({
			text: client.config.embed.footer,
			iconURL: client.user.displayAvatarURL(),
		})
		.setColor(client.config.embed.color)
		.setTimestamp();
	return this;
}
// Discord.EmbedBuilder.prototype.setDefault = DefaultEmbedParams;

// Date Extenders
function NowUnixTime() {
	return Math.round(Date.now() / 1000);
}

Date.prototype.nowUnix = NowUnixTime;


// Channel Extenders
// function isText() {
// 	return this.type === Discord.ChannelType.GuildText;
// }
// function isVoice() {
// 	return this.type === Discord.ChannelType.GuildVoice;
// }
// function isDM() {
// 	return this.type === Discord.ChannelType.DM;
// }

// Discord.Channel.prototype.isText = isText;
// Discord.Channel.prototype.isVoice = isVoice;
// Discord.Channel.prototype.isDM = isDM;


// Interaction Extenders
// function isCommand() {
// 	return this.type === Discord.InteractionType.ApplicationCommand;
// }
// function isAutocomplete() {
// 	return this.type === Discord.InteractionType.ApplicationCommandAutocomplete;
// }
// function isMessageComponent() {
// 	return this.type === Discord.InteractionType.MessageComponent;
// }
// function isModalSubmit() {
// 	return this.type === Discord.InteractionType.ModalSubmit;
// }
// Discord.Interaction.prototype.isCommand = isCommand;
// Discord.Interaction.prototype.isAutocomplete = isAutocomplete;
// Discord.Interaction.prototype.isMessageComponent = isMessageComponent;
// Discord.Interaction.prototype.isModalSubmit = isModalSubmit;
