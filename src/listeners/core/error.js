const { Listener } = require('../../../discord-akairo/src/index');

class ErrorListener extends Listener {
    constructor() {
        super('error', {
            emitter: 'commandHandler',
            event: 'error'
        });
    }

    async exec(error, message) {
        console.log(error)
        this.client.log.fail(error.message)
        let embed = this.client.util.embed()
            .setColor(this.client.color)
            .setTitle('Error')
            .setDescription(`Guild: **${message.guild ? message.guild.name : 'Direct messages'}**\nUser: \`${message.author.tag} (${message.author.id})\`\nCommand: \`${message.content}\`\n\n\`\`\`properties\n${error.stack}\`\`\``)
            .setTimestamp()

        return message.channel.send(`\`\`\`js\n${error.message}\`\`\``);
    }
};

module.exports = ErrorListener;