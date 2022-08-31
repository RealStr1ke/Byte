const Command = require('../../../structs/templates/Command');
const { MessageAttachment, EmbedBuilder } = require('discord.js');
const Sentry = require('@sentry/node');
const fetch = require('node-fetch');
const gamedig = require('gamedig');
const path = require('path');

class MinecraftCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'minecraft',
			description : 'Gives information about the Minecraft server with the given IP address.',
			usage       : 'minecraft <IP>',
			args        : true,
			aliases     : ['mc'],
			directory   : __dirname,
			userPerms   : 'SendMessages',
			botPerms    : ['SendMessages', 'EmbedLinks'],
		});
	}

	async run(message, args) {
		const ip = args[0];

		const favicon = `https://eu.mc-api.net/v3/server/favicon/${ip}`;
		let options = {
			type: 'minecraft',
			host: ip,
		};

		if (ip.split(':').length > 1) {
			options = {
				type: 'minecraft',
				host: ip.split(':')[0],
				port: ip.split(':')[1],
			};
		}

		const MCMessage = await message.channel.send('**Please wait...**');

		let json = null;

		try {
			json = await gamedig.query(options);
		} catch (error) {
			await Sentry.captureException(error);
		}

		if (!json) {
			options.type = 'minecraftpe';
			try {
				json = await gamedig.query(options);
			} catch (error) {
				await Sentry.captureException(error);
			}
		}

		if (!json) {
			const ErrorEmbed = new EmbedBuilder()
				.setTitle('🔴 Unavailable')
				.setDescription('This server either doesn\'t exist, is offline or blocking access!')
				.setColor('Red')
				.setTimestamp();
			return message.reply({
				embeds: [ErrorEmbed],
			});
		}

		const ImageResponse = await fetch(`https://www.minecraftskinstealer.com/achievement/a.php?i=2&h=Success&t=${ip}`);
		const ImageAttachment = new MessageAttachment(await ImageResponse.buffer(), 'success.png');

		const MinecraftEmbed = new EmbedBuilder()
			.setTitle(`**Information about \`${ip}\`**`)
			.addField('Version', `**\`${json.raw.vanilla.raw.version.name}\`**`)
			.addField('Players Online', `**\`${(json.raw.players ? json.raw.players.online : json.players.length)}/${(json.raw.players ? json.raw.players.max : json.maxplayers)}\`**`)
			.addField('Status', '🟢 Online')
			.addField('IP', `**\`${json.connect}\`**`)
			.setThumbnail(favicon)
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			});

		MCMessage.edit({
			content: `\`${ip}\` has been found!`,
			embeds: [MinecraftEmbed],
			files: [ImageAttachment],
		});
	}
}

module.exports = MinecraftCommand;