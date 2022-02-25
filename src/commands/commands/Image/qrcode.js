const Command = require('../../../structs/templates/Command');
const { MessageEmbed } = require('discord.js');
const path = require('path'),
	isurl = require('is-url');

class QRCodeCommand extends Command {

	constructor(client) {
		super(client, {
			name        : 'qrcode',
			description : 'Creates a QR Code for the given link.',
			usage       : 'qrcode <value>',
			args        : true,
			aliases     : ['qr', 'qrc'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
			ownerOnly   : false,
		});
	}

	async run(message, args) {
		const link = `http://api.qrserver.com/v1/create-qr-code/?data=${args[0]}&size=200x200`;

		if (isurl(link) == false) return message.reply('Please provide a valid link with `https://`');

		// const qrcode = new MessageAttachment(link, 'qrcode.png');

		const QRCodeEmbed = new MessageEmbed()
			.setTitle('QR Code')
			.setDescription(`QR Code for \`${args[0]}\``)
			.setImage(link)
			.setFooter({
				text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setTimestamp();

		return await message.reply({
			embeds: [QRCodeEmbed],
		});

	}
}

module.exports = QRCodeCommand;