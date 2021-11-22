const { Listener } = require('../../../discord-akairo/src/index');
const config = require('../../config')
// const logger = require("../../lib/classes/Logger.js");
const { readdirSync } = require('fs');

class MessageCreateListener extends Listener {
    constructor() {7
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    exec(message) {
        this.client.log.log(`${message.author.tag} sent a message.`);
    }
}

module.exports = MessageCreateListener;