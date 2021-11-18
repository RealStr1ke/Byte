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
        logger.log(`Loaded ${this.client.listenerHandler.modules.size} listeners`);
        logger.log(`Loaded ${this.client.inhibitorHandler.modules.size} inhibitors`);
        logger.log(`Loaded ${this.client.commandHandler.modules.size} commands`);
        this.client.presence.set({
            status: 'online',
            activity: {
                name: `Byte | ${this.client.guilds.cache.size} servers`,
                type: 'WATCHING'
            }
        });
        logger.log(`Connected to the Discord API (Ping: ${Math.round(this.client.ping)}ms)`);
        logger.log(`Logged into as ${this.client.user.tag}`);
        logger.log(`I have been fully activated and I'm ready!!`);
    }
}

module.exports = ReadyListener;