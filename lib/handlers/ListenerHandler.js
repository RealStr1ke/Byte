// const { readdirSync, statSync } = require('fs');
// const path = require('path');
// require('dotenv').config();
// const { production, devGuild } = require('../config');

class ListenerHandler extends ByteHandler {
    constructor (client, {
		directory,
		classToHandle = Command,
		extensions = ['.js'],
	} = {}) {
		super(client, {
			directory,
			classToHandle,
			extensions
		})

		// this.commands = new Collectiion();
		// this.aliases = new Collection();
		// this.categories = new Collection();
		// this.prefixes = new Collection();
    }

    async loadAll(){
		const eventFiles = super.getFiles(directory, extensions);
		eventFiles.forEach(async (file) => {
			const eventN = (file.split(".")[0]).split('/');
			const eventName = eventN[eventN.length-1];
			this.logger.log(`Loading Event: ${eventName}`);
			const event = new (require(`${file}`))(this);
			this.client.on(eventName, (...args) => event.run(...args));
			delete require.cache[require.resolve(`${file}`)];
		});
}

module.exports = SlashHandler;