const { Routes } = require('discord-api-types/v9');
const { REST } = require('@discordjs/rest');
const { readdirSync, statSync } = require('fs');
const path = require('path');
require('dotenv').config();
const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);
const { production, devGuild } = require('../config');

class SlashHandler {
    constructor(client, {
        directory
    }) {
        this.client = client;
        this.commands = [];
        this.directory = directory;
    }

    async init() {
        await this.loadCommands();
        this.client.classLoader.push('[ClassLoader] SlashHandler loaded');
    }
    formatCommands() {
        let formatted = [];
        const categories = readdirSync(this.directory);
        for (const category of categories) {
            let commands = this.getCommands(path.join(this.directory, category).split(/\\/g).join('/'));
            let commandData = [];
            for (const command of commands) {
                let data = require(`${process.cwd()}/${command}`)
                commandData.push({
                    name: data.data.name,
                    description: data.description,
                    permissions: data.permissions || [],
                    ownerOnly: data.ownerOnly || false
                })
            }
            formatted.push({ category: category, commands: commandData });
        }
        return formatted;
    }
    getCommands(directory) {
        const results = [];

        (function read(dir) {
            const files = readdirSync(dir);
            for (const file of files) {
                const filepath = path.join(dir, file).split(/\\/g).join('/');
                if (statSync(filepath).isDirectory()) {
                    read(filepath);
                } else {
                    results.push(filepath);
                }
            }
        }(directory));
        return results;
    }
    async loadCommands() {
        let files = this.getCommands(this.directory);
        for (let file of files) {
            const command = require(`${process.cwd()}/${file}`);
            this.commands.push(command.data.toJSON());
            this.client.slashCommands.set(command.data.name, command);
        }
        try {
            if (production) {
                return await rest.put(Routes.applicationCommands(this.client.user.id), {
                    body: this.commands
                });
            } else {
                return await rest.put(Routes.applicationGuildCommands(this.client.user.id, devGuild), {
                    body: []
                });
            }
        } catch (error) {
            this.client.logger.error([
                'Loading slash commands failed',
                `Type:   ${error.name}`,
                `Error:  ${error.message}`
            ]);
        }
    }
}

module.exports = SlashHandler;