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
        this.client.log.success(`${message.author.tag} sent a message.`);
    }
}

module.exports = MessageCreateListener;