const constants = {

	// Emojis
	emojis: require('./utils/emojis.json'),

	// Swear Words
	swears: require('./utils/swearwords.json'),

	// Permissions
	permissions: require('./utils/permissions.json'),

	// Responses
	responses: require('./utils/responses.json'),

	/**
	 * Wordle
	 * Daily Wordle Answers: "daily"
	 * Wordle Word List: "wordList"
	 */
	wordle: require('./utils/wordle.json'),

	/**
	 * Server Info
	 * Regions: "region"
	 * Verification Levels: "verificationLevels"
	 * Notifications: "notifications"
	 */
	serverInfo: require('./utils/serverinfo.json'),

	/**
	 * Eight Ball
	 * 1-10 - Yes
	 * 11-15 - Maybe
	 * 16-20 - No
	 */
	eightball: ['As I see it, yes', 'It is certain', 'It is decidedly so', 'Most likely', 'Outlook good', 'Signs point to yes', 'Without a doubt', 'Yes', 'Yes - definitely', 'You may rely on it', 'Reply hazy, try again', 'Ask again later', 'Better not tell you now', 'Cannot predict now', 'Concentrate and ask again', 'Don\'t count on it', 'My reply is no', 'My sources say no', 'Outlook not so good', 'Very doubtful'],

	// Quotes
	quotes: [
		'So do the Mongols come from Mongolia?',
		'Is Bangladesh a country?',
		'Is Germany in Russia? Wait…',
		'Do the Mongols in Mongolia speak Mongolian?',
		'Aren\'t the Turkics from Turkey?',
		'Regiment! Wait is that right?',
		'Do you have any tips for understanding normal English?',
		'It\'s kind of, like, superior.',
		'Clevy\'s not ready! Clevy\'s not ready!',
		'South America and Canada are technically the same thing. They\'re both Americas.',
		'Confusing Confucianism.',
		'Were breastplates a predecessor to bras?',
		'`(TRIGGER WARNING)` Women have great debate skills. They have something called stubbornness.',
	],

	// F*** My Life Quotes (Incomplete)
	fml: [
		'Today, we\'re both 19 and on our third date I tried to get intimate with him. He asked what I was doing. Turns out his bible-thumping mom censored his entire life, such as zero internet access, and homeschooled him to make sure he never, ever learned about sex. He\'s 19 and truly has no idea.',
		'Today, after trying really hard to impress a girl and thinking everything was going the right way, hugs, kisses and chatting every night, and trying to spend as much time together, I get told, "I don\'t know what I want, but I know what I don\'t want." Meaning me.',
		'Today, our 9 year-old son managed to shoot himself in the gut with my nail gun. According to my wife, this is completely my fault, because I ONLY kept it in my locked garage, ONLY secured in its box, ONLY completely disconnected from the power, ONLY on the highest shelf near the roof.',
		'Today, my crush from high school finally agreed to go out with me. While on the seemingly good date, she offered me a discount to her OnlyFans page.',
		'Today, I asked my 5-year-old son how school went today. He sighed and said, "Fuck off, dad." I thought kids only became such colossal douchebags in their teens.',
		'Today, I finally got the courage to talk to my crush of two years. We went to the same school for a year but then he moved to my old school and became friends with people I knew from primary school. Anyways, I finally got the courage to have a conversation with him on Instagram. Then he blocked me.',
		'Today, I found out my husband was having an affair with his coworker. When I had a talk with him about it, his response in all seriousness was, “Lose that weight that you didn’t have before and I’ll stop fucking her.” I’d gained weight giving birth to our first child.',
		'Today, I had threesome with my wife and her best friend. Now my wife is mad at me for sleeping with her best friend.',
	],
};

module.exports = constants;