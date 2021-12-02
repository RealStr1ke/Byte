"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
var Joke = /** @class */ (function () {
    function Joke(client, data, lang) {
        this.client = client;
        this.question = data.question;
        this.answer = data.answer;
        this.id = data.id;
        this.lang = lang;
    }
    /**
     * Returns the joke text instead of a Joke instance.
     * @returns {string} The formatted joke.
     */
    Joke.prototype.toString = function () {
        return this.question + "\n" + this.answer;
    };
    /**
     * Returns the joke text using Discord spoilers instead of a Joke instance.
     * @returns {string}
     */
    Joke.prototype.toDiscordSpoils = function () {
        return this.question + "\n\n||" + this.answer + "||";
    };
    return Joke;
}());
exports.Joke = Joke;
;
