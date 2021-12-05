const Byte = require('./base/Byte')
const client = new Byte();
const util = require("util"),
	fs = require("fs"),
	readdir = util.promisify(fs.readdir);
const config = require('./src/config');

const init = async () => {

	// Search for all commands
	const directories = await readdir("./src/commands/");
	client.logger.log(`Loading a total of ${directories.length} categories.`, "log");
	directories.forEach(async (dir) => {
		const commands = await readdir("./src/commands/"+dir+"/");
		commands.filter((cmd) => cmd.split(".").pop() === "js").forEach((cmd) => {
			const response = client.loadCommand("./src/commands/"+dir, cmd);
			if(response){
				client.logger.log(response, "error");
			}
		});
	});

	
	const evtFiles = await readdir("./src/events/");
	client.logger.log(`Loading a total of ${evtFiles.length} events.`, "log");
	evtFiles.forEach((file) => {
		const eventName = file.split(".")[0];
		client.logger.log(`Loading Event: ${eventName}`);
		const event = new (require(`./src/events/${file}`))(client);
		client.on(eventName, (...args) => event.run(...args));
		delete require.cache[require.resolve(`./src/events/${file}`)];
	});
    
	client.login(client.config.token); 
};

init();

process.on('unhandledRejection', err => console.error(err));