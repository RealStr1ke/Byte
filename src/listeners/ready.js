const { Listener } = require('../../discord-akairo/src/index');
const config = require('../config')
const { readdirSync } = require('fs');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(`debug`);
        let slashCommands = this.client.slashHandler.getCommands('./src/slash/');
        this.client.log.success(`Loaded ${this.client.listenerHandler.modules.size} listeners`);
        this.client.log.success(`Loaded ${this.client.inhibitorHandler.modules.size} inhibitors`);
        this.client.log.success(`Loaded ${this.client.commandHandler.modules.size} commands`);
        this.client.log.success(`Loaded ${slashCommands.length} slash commands`);
        this.client.presence.set({
            status: 'online',
            activity: {
                name: `${this.client.prefix}help | ${this.client.guilds.cache.size} servers`,
                type: 'WATCHING'
            }
        });
        this.client.log.success(`Connected to the Discord API`);
        this.client.log.success(`Logged into as ${this.client.user.tag} on ${this.client.guilds.cache.size} servers`);
        // this.client.Cli.start();
    }
}

module.exports = ReadyListener;