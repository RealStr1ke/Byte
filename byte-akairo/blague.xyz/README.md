# Blague.xyz

Blague.xyz is a package to get jokes and FML easily from the [Blague.xyz](https://blague.xyz) API.

🇬🇧 Jokes/FML in english are supported
🇫🇷 Blagues/Vie de merde en français sont supportées

## Installation

```
$ npm install --save blague.xyz
```

## API Token

You need an API Key to send request to the Blague.xyz API. Click [here](https://blague.xyz/) to get one.

## Usage example

### Jokes/Blague

```js
const { Client } = require("blague.xyz");
const joker = new Client("API token", {
    defaultLang: "fr" // The default language for jokes and fml
});

// Gets a random joke. As no language is specified, it will use the default language of the client, "fr" in our case. 
joker.randomJoke().then((joke) => {
    console.log(joke.question); // Que dit une feuille quand elle tombe dans l'eau ?
    console.log(joke.answer); // J'ai papier
    console.log(joke.toString()); // Que dit une feuille quand elle tombe dans l'eau ?\nJ'ai papier
    console.log(joke.toDiscordSpoils()); // Que dit une feuille quand elle tombe dans l'eau ?\n\n||J'ai papier||
    console.log(joke.id); // 71
});

// Gets an english joke. If you specify a language, it will use it instead of the default language.
joker.dailyJoke("en").then((joke) => {
    console.log(joke.question); // What is the only dog you can eat ?
    console.log(joke.answer); // A Hot Dog
});

// Gets a joke with its ID
joker.getJoke(10, "fr").then((joke) => {
    console.log(joke.question); // Que dit une fleur qui a eu zéro à un contrôle ?
    console.log(joke.answer); // Qu'elle s'est plantée
});

// Gets the joke list. [premium only]
joker.listJoke().then((list) => {
    console.log(list); // [ {joke}, {joke}, {joke} ]
});
```

### FML/VDM

```js
const Client = require("blague.xyz");
const joker = new Client("API token", {
    defaultLang: "fr" // The default language for jokes and fml
});

// Gets a random vdm. As no language is specified, it will use the default language of the client, "fr" in our case. 
joker.randomVDM().then((vdm) => {
    console.log(vdm.content); // Aujourd'hui, j'ai acheté une voiture d'occasion à un de mes amis. Après avoir ramené la voiture à la maison et l'avoir inspectée, j'ai trouvé l'une des boucles d'oreilles de ma femme sur le siège arrière.
});

// Gets a random vdm with type "hot".
joker.randomVDM("hot").then((vdm) => {
    console.log(vdm.content); // Censured. Use the package to get some hot vdm...
});

// Gets an english fml. If you specify a language, it will use it instead of the default language.
joker.getVDM("normal", "en").then((fml) => {
    console.log(fml.content); // Today, a little girl asked me how I could be so fat and still have small boobs.
});

// Gets a vdm with its ID
joker.listVDM().then((list) => {
    console.log(list); // [ {vdm}, {vdm}, {vdm} ]
});
```

## Links

* [Website](https://blague.xyz)
* [Documentation](https://docs.blague.xyz)
* [Discord](https://discord.gg/CJgNcJN)
* [Github (source)](https://github.com/Androz2091/blague.xyz)
* [NPM](https://npmjs/package/blague.xyz)
