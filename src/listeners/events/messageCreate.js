const { Listener } = require('../../../discord-akairo/src/index');
const config = require('../../config')
// const logger = require("../../lib/classes/Logger.js");
const { readdirSync } = require('fs');

class MessageCreateListener extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        if(message.author.bot) return;
        if(message.content.startsWith(this.client.prefix)) return this.client.log.log(`${message.author.tag} ran the command ${message.content}`);
        return this.client.log.log(`${message.author.tag} sent a message.`);
    }
}

module.exports = MessageCreateListener;