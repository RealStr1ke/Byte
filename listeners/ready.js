const { Listener } = require('../discord-akairo/src/index');
const config = require('../config')

class ReadyListener extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log(`I have been fully activated and I'm ready!!`);
    }
}

module.exports = ReadyListener;