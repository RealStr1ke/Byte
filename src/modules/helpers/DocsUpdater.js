// Credit to Androz2091 (https://github.com/Androz2091/AtlantaBot) for the original code
// Minor code tweaks have been made

const table = require('markdown-table');
const fs = require('fs');

class DocsUpdater {
	constructor(client) {
		this.client = client;
	}

	update() {
		const commands = this.client.commands;
		const categories = [];

		commands.forEach((command) => {
			if (!categories.includes(command.category)) categories.push(command.category);
		});

		let text = `# Commands  \nHere's the list of Byte's commands. This one contains more than **${Math.floor(commands.size / 10)}0 commands** in **${categories.length} categories**!  \n\n#### Contents of the table  \n**Name**: The name of the command  \n**Description**: A brief explanation of the purpose of the command  \n**Usage**: The arguments/options that the command takes in parameters  \n**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n`;

		categories.sort(function(a, b) {
			const aCmdsLength = Array.from(commands.filter((command) => command.category === a)).length;
			const bCmdsLength = Array.from(commands.filter((command) => command.category === b)).length;
			if (aCmdsLength > bCmdsLength) {
				return -1;
			} else {
				return 1;
			}
		}).forEach((category) => {
			const arrCat = [
				[ 'Name', 'Description', 'Usage', 'Cooldown' ],
			];
			const cmds = Array.from(commands.filter((command) => command.category === category));
			text += `### ${category} (${cmds.length} commands)\n\n`;
			cmds.sort(function(a, b) {
				if (a.name < b.name) {
					return -1;
				} else {
					return 1;
				}
			}).forEach((cmd) => {
				const command = cmd[1];
				arrCat.push([
					`**${command.name}**`,
					`${command.description}`,
					`${command.usage}`,
					`${Math.ceil(command.cooldown / 1000)} seconds`,
				]);
			});
			text += `${table(arrCat)}\n\n`;
		});
		if (fs.existsSync('./docs')) {
			fs.writeFileSync('./docs/Commands.md', text);
			this.client.logger.log('The command documentation has been successfully updated!');
		}
	}
}

module.exports = DocsUpdater;