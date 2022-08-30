const Command = require('../../../structs/templates/Command');
const { EmbedBuilder } = require('discord.js');
const covid = require('novelcovid');
const moment = require('moment-timezone');
const axios = require('axios');
const path = require('path');

class COVID19Command extends Command {

	constructor(client) {
		super(client, {
			name        : 'covid-19',
			description : 'Gives you the latest COVID-19 data.',
			usage       : 'covid-19 <country>',
			args        : false,
			aliases     : ['covid', 'covid19', 'cov'],
			directory   : __dirname,
			userPerms   : 'SEND_MESSAGES',
		});
	}

	async run(message, args) {
		let COVIDEmbed;
		let covidStats;

		if (args[0]) {
			covidStats = await covid.countries({
				country: args[0],
			});
			if (covidStats.message === 'Country not found or doesn\'t have any cases') return message.reply(`\`\`\`${covidStats.message}.\`\`\``);
			COVIDEmbed = new EmbedBuilder()
				.setTitle(`COVID-19 Stats (${args[0]})`)
				.addField('Cases', covidStats.cases.toLocaleString(), true)
				.addField('Deaths', covidStats.deaths.toLocaleString(), true)
				.addField('Recovered', covidStats.recovered.toLocaleString(), true)
				.addField('Current Infections', covidStats.active.toLocaleString(), true)
				.addField('Critical Condition', covidStats.critical.toLocaleString(), true)
				.addField('Tested', covidStats.tests.toLocaleString(), true)
				.addField('Last Updated', `${moment(moment.tz(covidStats.updated, 'America/New_York')).format('dddd, MMMM Do YYYY, h:mm:ss a')} EST`, true)
				.setThumbnail('https://www.cdc.gov/dotw/covid-19/images/main_928px.jpg')
				.setColor(this.client.config.embed.color)
				.setFooter({
					text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();
		}

		if (!args[0]) {
			covidStats = await covid.all();
			COVIDEmbed = new EmbedBuilder()
				.setTitle('Worldwide COVID-19 Stats')
				.addField('Deaths', covidStats.deaths.toLocaleString(), true)
				.addField('Recovered', covidStats.recovered.toLocaleString(), true)
				.addField('Cases Today', covidStats.todayCases.toLocaleString(), true)
				.addField('Deaths Today', covidStats.todayDeaths.toLocaleString(), true)
				.addField('Recovered Today', covidStats.todayRecovered.toLocaleString(), true)
				.addField('Current Infections', covidStats.active.toLocaleString(), true)
				.addField('Critical Condition', covidStats.critical.toLocaleString(), true)
				.addField('Tested', covidStats.tests.toLocaleString(), true)
				.addField('Last Updated', `${moment(moment.tz(covidStats.updated, 'America/New_York')).format('dddd, MMMM Do YYYY, h:mm:ss a')} EST`, true)
				.setThumbnail('https://www.cdc.gov/dotw/covid-19/images/main_928px.jpg')
				.setColor(this.client.config.embed.color)
				.setFooter({
					text: `Requested by ${message.author.tag} • ${this.client.config.embed.footer}`,
					iconURL: this.client.user.displayAvatarURL(),
				})
				.setTimestamp();
		}

		return message.channel.send({
			embeds: [COVIDEmbed],
		});
	}
}

module.exports = COVID19Command;