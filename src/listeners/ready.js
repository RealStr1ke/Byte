const { Listener } = require('../../discord-akairo/src/index');
const config = require('../config')
const logger = require("../../lib/classes/Logger.js");
const { readdirSync } = require('fs');

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        this.client.log.success(`Loaded ${this.client.listenerHandler.modules.size} listeners`);
        this.client.log.success(`Loaded ${this.client.inhibitorHandler.modules.size} inhibitors`);
        this.client.log.success(`Loaded ${this.client.commandHandler.modules.size} commands`);
        this.client.presence.set({
            status: 'online',
            activity: {
                name: `Byte | ${this.client.guilds.cache.size} servers`,
                type: 'WATCHING'
            }
        });
        this.client.log.success(`Connected to the Discord API`);
        this.client.log.success(`Logged into as ${this.client.user.tag}`);
        // this.client.Cli.start();
    }
}

module.exports = ReadyListener;