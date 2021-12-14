const Command = require( "../../../lib/structs/Command" );
const Discord = require('discord.js');

class EvalCommand extends Command {

    constructor(client) {
        super(client, {
            name        : "eval",
            description : "Executes arbituary JavaScript code.",
            usage       : "eval <code>",
            args        : true,
            category    : "Owner",
            aliases     : [],
            userPerms   : "SEND_MESSAGES",
            ownerOnly   : true,
        });
    }

    async run(message, args) {
        let txt = args.join(" ")
   const { inspect } = require('util')
   if(!txt) return message.channel.send("Please specify something to Evaluate")                                                                                           
   try{
       const evaled = eval(txt)
       let ff = inspect(evaled, { depth: 0})
       if (String(ff).length > 2000) ff = "Output is too long"
        message.reply({ content:`\`\`\`js\n${ff}\`\`\``, allowedMentions: { repliedUser: false } })
   } catch (error){
       let embed1 = new Discord.MessageEmbed()
       .setTitle('Evaluation Error!')
       .setColor("RANDOM")
       .addField("❌╎ Error",`${error}`)
       message.channel.send({embeds: [embed1]})
   }
   
    }
    }


module.exports = EvalCommand;