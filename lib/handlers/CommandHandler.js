// const { readdirSync, statSync } = require('fs');
// const path = require('path');
// require('dotenv').config();
// const { production, devGuild } = require('../config');

class CommandHandler extends ByteHandler {
    constructor (client, {
		directory,
		classToHandle = Command,
		extensions = ['.js'],
		prefix = '!'
	} = {}) {
		super(client, {
			directory,
			classToHandle,
			extensions
		})

		this.commands = new Collectiion();
		this.aliases = new Collection();
	    this.categories = new Collection();
		this.prefixes = new Collection();
    }

    async loadAll(){
		const cmdFiles = await super.getFiles(directory, extensions);
		for (const command of cmdFiles) {
			delete require.cache[command];
            const file = new (require( path.resolve(command)))(this);
			if(!(file instanceof Command)) return;
			this.logger.log(`Loading Command: ${file.name}`);
            this.commands.set( file.name, file);
            if (file.aliases && Array.isArray(file.aliases))
                file.aliases.forEach((alias) => this.aliases.set(alias, file.name));
	}
}

module.exports = SlashHandler;