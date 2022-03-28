class Utils {
	constructor(client) {
		if (!client) {
			throw new TypeError('Discord client must be valid.');
		}
		this.client = client;
	}

	async fetchUser(key) {
		if (!key || typeof key !== 'string') return;

		if (key.match(/^<@!?(\d+)>$/)) {
			const user = this.client.users.fetch(key.match(/^<@!?(\d+)>$/)[1]).catch(() => {});

			if (user) return user;
		}

		if (key.match(/^!?(\w+)#(\d+)$/)) {
			const user = this.client.users.cache.find(
				u => u.username === key.match(/^!?(\w+)#(\d+)$/)[0] && u.discriminator === key.match(/^!?(\w+)#(\d+)$/)[1],
			);

			if (user) return user;
		}

		return await this.client.users.fetch(key).catch(() => {});
	}

	async fetchMember(key, guild) {
		if (!key || typeof key !== 'string') {
			return;
		}

		if (key.match(/^<@!?(\d+)>$/)) {
			const member = guild.members.fetch(key.match(/^<@!?(\d+)>$/)[1]).catch(() => {});

			if (member) {
				return member;
			}
		}

		if (key.match(/^!?(\w+)#(\d+)$/)) {
			guild = await guild.fetch();
			const member = guild.members.cache.find(m => m.user.tag === key);

			if (member) {
				return member;
			}
		}

		return await guild.members.fetch(key).catch(() => {});
	}

	codeBlock(language, text) {
		return `\`\`\`${language}\n${text || String.fromCharCode(8203)}\`\`\``;
	}
	inlineCode(text) {
		return `\`${text}\``;
	}
	quote(text) {
		return `> ${text}`;
	}
	clean(text, token) {
		return text.replace(token, '███████████████████████');
	}
	toTitleCase(str) {
		return str.replace(/[A-Za-zÀ-ÖØ-öø-ÿ]\S*/g, (txt) => Util.titleCaseVariants[txt] || txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
	}
	toSnakeCase(str) {
		return str.split(/\s/g).join('_');
	}
	trimString(str, max = 30) {
		if (str.length > max) return `${str.substr(0, max)}...`;
		return str;
	}
	random(n1, n2) {
		return Math.floor(Math.random() * (n2 - n1)) + n1;
	}
	randomArray(array) {
		return array[this.random(0, array.length)];
	}
	isUnicodeEmoji(str) {
		return /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c([\ud000-\udfff]){1,2}|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/.test(str);
	}
	isFunction(input) {
		return typeof input === 'function';
	}
	isObject(input) {
		return input && input.constructor === Object;
	}
	isArray(input) {
		return typeof input === 'object';
	}
	isThenable(input) {
		if (!input) return false;
		return (input instanceof Promise) || (input !== Promise.prototype && Util.isFunction(input.then) && Util.isFunction(input.catch));
	}
	generateID() {
		return Date.now().toString(35).toUpperCase();
	}
	shuffleArray(arr) {
		return arr.reduce((newArr, _, i) => {
			const rand = i + (Math.floor(Math.random() * (newArr.length - i)));
			[newArr[rand], newArr[i]] = [newArr[i], newArr[rand]];
			return newArr;
		}, [...arr]);
	}
	base32(int) {
		if (int === 0) {
			return alphabet[0];
		}

		let res = '';
		while (int > 0) {
			res = alphabet[int % 32] + res;
			int = Math.floor(int / 32);
		}
		return res;
	}
	objectIsEmpty = (obj) => {
		return Object.entries(obj).length === 0;
	};
	async sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, (ms * 1000));
		});
	}
	toggleCase(str) {
		if (str.length !== 1) return str;
		if (str.match(/^[A-z]$/)) {
			if (str.toUpperCase() === str) {
				return str.toLowerCase();
			} else {
				return str.toUpperCase();
			}
		}
		return str;
	}

	formatDate(date) {
		const formats = {
			days: {
				0: 'Sunday',
				1: 'Monday',
				2: 'Tuesday',
				3: 'Wednesday',
				4: 'Thursday',
				5: 'Friday',
				6: 'Saturday',
			},
			month: {
				0: 'January',
				1: 'February',
				2: 'March',
				3: 'April',
				4: 'May',
				5: 'June',
				6: 'July',
				7: 'August',
				8: 'September',
				9: 'October',
				10: 'November',
				11: 'December',
			},
			date: {
				1: 'st',
				2: 'nd',
				3: 'rd',
				4: 'th',
				5: 'th',
				6: 'th',
				7: 'th',
				8: 'th',
				9: 'th',
				0: 'th',
			},
		};
		const dayOfWeek = formats.days[date.getDay()];
		const dayOfMonth = date.getDate().toString();
		const month = formats.month[date.getMonth()];
		const formatted = dayOfMonth.substring(2).length > 0 ? formats.date[dayOfMonth.substring(2)] : formats.date[dayOfMonth];
		return `${dayOfWeek} ${dayOfMonth}${formatted} ${month} | ${date.toLocaleTimeString()}`;
	}

	formatNumber(Number) {
		if (typeof Number === 'string') {
			Number = parseInt(Number);
		}

		const DecPlaces = Math.pow(10, 1);
		const Abbrev = ['k', 'm', 'g', 't', 'p', 'e'];

		for (let i = Abbrev.length - 1; i >= 0; i--) {
			const Size = Math.pow(10, (i + 1) * 3);

			if (Size <= Number) {
				Number = Math.round((Number * DecPlaces) / Size) / DecPlaces;

				if (Number === 1000 && i < Abbrev.length - 1) {
					Number = 1;
					i++;
				}

				Number += Abbrev[i];
				break;
			}
		}

		return Number;
	}

	async search(query, results) {
		const google = require('google-it');
		return await google({
			'query': query,
			'no-display': true,
			'limit': results,
		});
	}

	generateInvite() {
		return this.client.generateInvite({
			permisions: this.config.permissions,
			scopes: this.config.scopes,
		});
	}
}

Utils.titleCaseVariants = {
	textchannel: 'TextChannel',
	voicechannel: 'VoiceChannel',
	categorychannel: 'CategoryChannel',
	guildmember: 'GuildMember',
};

module.exports = Utils;