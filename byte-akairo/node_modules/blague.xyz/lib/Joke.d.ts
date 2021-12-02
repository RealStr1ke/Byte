import { Client } from "./Client";
export interface JokeData {
    question: string;
    answer: string;
    id: number;
}
export declare class Joke {
    client: Client;
    question: string;
    answer: string;
    id: number;
    lang: string;
    constructor(client: Client, data: JokeData, lang: string);
    /**
     * Returns the joke text instead of a Joke instance.
     * @returns {string} The formatted joke.
     */
    toString(): string;
    /**
     * Returns the joke text using Discord spoilers instead of a Joke instance.
     * @returns {string}
     */
    toDiscordSpoils(): string;
}
