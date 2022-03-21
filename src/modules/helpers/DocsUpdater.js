// Credit to Androz2091 (https://github.com/Androz2091/AtlantaBot) for the original code
// Minor code tweaks have been made

const { exec } = require('child_process');
const table = require('markdown-table');
const fs = require('fs');

const simpleGit = require('simple-git');
simpleGit().clean(simpleGit.CleanOptions.FORCE);

class DocsUpdater {
	constructor(client) {
		this.client = client;
	}

	async update() {
		const commands = this.client.commands;
		const categories = [];

		commands.forEach((command) => {
			if (!categories.includes(command.category)) categories.push(command.category);
		});

		// let text = `# Commands\nHere's the list of Byte's commands. This one contains more than **${Math.floor(commands.size / 10)}0 commands** in **${categories.length} categories**!\n\n#### Contents of the table\n**Name**: The name of the command\n**Description**: A brief explanation of the purpose of the command\n**Usage**: The arguments/options that the command takes in parameters\n**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n`;
		let text = [
			'# Commands',
			`Here's the list of Byte's commands. This one contains more than **${Math.floor(commands.size / 10)}0 commands** in **${categories.length} categories**!\n`,
			'#### Contents of the table',
			'**Name**: The name of the command',
			'**Description**: A brief explanation of the purpose of the command',
			'**Usage**: The arguments/options that the command takes in parameters',
			'**Cooldown**: The time that must elapse between each command so that it can be executed again by the user\n\n'
		].join('\n');



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
			fs.writeFileSync('./docs/commands.md', text);
			this.client.logger.log('The command documentation has been successfully updated!');
		}
		await this.commit();
	}

	async commit() {
		let git = simpleGit({
			baseDir: `${process.cwd()}/docs`,
			binary: 'git',
			maxConcurrentProcesses: 6,
		});

		await git.add('./commands.md');
		await git.commit('📓 Updated documentation');
		// await git.push();

		git = simpleGit({
			baseDir: process.cwd(),
			binary: 'git',
			maxConcurrentProcesses: 6,
		});

		await git.add('./docs');
		await git.commit('📓 Updated documentation');
		// await git.push();
	}
}

module.exports = DocsUpdater;