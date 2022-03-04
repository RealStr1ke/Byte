const Event = require('../structs/templates/Event');
const { MessageEmbed } = require('discord.js');
class debug extends Event {
	constructor(client) {
		super(client);
	}

	async run(info) {
		if (this.client.isReady()) {
			if (this.client.config.support.logs.debug) {
				const DebugEmbed = new MessageEmbed()
					.setTitle(`**${info}**`)
					.setColor('YELLOW')
					.setTimestamp();
				const DebugLog = this.client.channels.cache.get(this.client.support.debug);
				DebugLog.send({
					embeds: [DebugEmbed],
				});
			}
		}
		if (!this.client.config.debug) return;
		return this.client.logger.debug(info);
	}
}

module.exports = debug;