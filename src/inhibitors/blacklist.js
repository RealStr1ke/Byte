const { Inhibitor } = require('../../discord-akairo/src/index');

class BlacklistInhibitor extends Inhibitor {
    constructor() {
        super('blacklist', {
            reason: 'blacklist'
        })
    }
of
    exec(message) {
        // He's a meanie!
        const blacklist = ['411641088944766982'];
        return blacklist.includes(message.author.id);
    }
}

module.exports = BlacklistInhibitor;