const Command = require('../../../structs/templates/Command'),
	{ EmbedBuilder } = require('discord.js'),
	{ dependencies } = require('../../../../package.json'),
	os = require('os'),
	osu = require('os-utils'),
	{ DurationFormatter } = require('@sapphire/time-utilities'),
	path = require('path'),
	durationFormatter = new DurationFormatter();

class BotStatsCommand extends Command {
	constructor(client) {
		super(client, {
			name        : 'stats',
			description : 'Responds with the current bot stats.',
			usage       : 'stats',
			args        : false,
			aliases     : ['bs'],
			directory   : __dirname,
			userPerms   : 'SendMessages',
			ownerOnly   : true,
		});
	}

	async run(message) {
		const botStats = new EmbedBuilder()
			.setTitle(`<@!${this.client.user.id}>'s Statistics`)
			.setDescription(`Detailed information about <@!${this.client.user.id}>'s hardware and other statistics`)
			.addFields([
				{
					name: '**— Bot**',
					value: '```' + [
						`Servers    : ${ this.client.guilds.cache.size }`,
						`Channels   : ${ this.client.channels.cache.size }`,
						`Users      : ${ this.client.users.cache.size }`,
						`Shards     : ${ this.client.shard && this.client.shard.count || 0 }`,
						`Uptime     : ${ durationFormatter.format(this.client.uptime) }`,
					].join('\n') + '```',
				},
				{
					name    : '**— Host**',
					value: '```' + [
						`DiscordJS  : ${ dependencies['discord.js'] }`,
						`NodeJS     : ${ process.version }`,
						`CPU        : ${os.cpus()[0].model.substring(0, os.cpus()[0].model.indexOf('CPU'))}`,
						`CPU Usage  : ${~~(osu.loadavg(1))} %`,
						`Mem Usage  : ${~~(process.memoryUsage().heapUsed / 1024 / 1024) } MB`,
						`Arch       : ${process.arch}`,
						`OS         : ${process.platform}`,
					].join('\n') + '```',
				},
			])
			.setTimestamp()
			.setAuthor({
				name: this.client.user.tag,
				iconURL: this.client.user.displayAvatarURL(),
			})
			.setColor(this.client.config.embed.color)
			.setFooter({
				text: this.client.config.embed.footer,
				iconURL: this.client.user.displayAvatarURL(),
			});

		return message.reply({
			embeds: [botStats],
		});


		// let total = this.client.guilds.cache.reduce((a, c) => a + c.memberCount, 0);
		//           let cached = this.client.guilds.cache.reduce((a, c) => a + c.members.cache.size, 0);
		//           let percent = (cached / total * 100).toFixed(0) + '%';
		//           const embed = this.client.util.embed()
		//               .setTitle('Statistics and information')
		//               .setColor(this.client.color)
		//               .setFooter(message.author.username)
		//               .setTimestamp()
		//               .setThumbnail(this.client.avatar)
		//               .setDescription(`Detailed information about ${this.client.user.username}'s hardware and other statistics`)
		//               .addField('Operating system', `${process.platform === 'linux' ? 'Ubuntu 18.04' : 'Windows 10'} ${process.arch}`)
		//               .addField('CPU', os.cpus()[0].model)
		//               .addField('Memory', `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2) > 1024 ? `${(process.memoryUsage().heapUsed / 1024 / 1024 / 1024).toFixed(2)} GB` : `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`} / ${(os.totalmem() / 1024 / 1024).toFixed(2) > 1024 ? `${(os.totalmem() / 1024 / 1024 / 1024).toFixed(2)} GB` : `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`}`, true)
		//               .addField('CPU', `${os.loadavg()[0].toFixed(1)}%`, true)
		//               .addField('Bot stats', `Users: ${(total).toLocaleString()} total, ${(cached).toLocaleString()} cached (**${percent}**)\nGuilds: ${(this.client.guilds.cache.size).toLocaleString()}`)
		//     return message.reply({embeds: [embed]});
	}
}

module.exports = BotStatsCommand;