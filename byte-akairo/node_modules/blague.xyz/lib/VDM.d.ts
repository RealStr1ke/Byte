import { Client } from "./Client";
export interface VDMData {
    content: string;
    id: number;
}
export declare class VDM {
    client: Client;
    content: string;
    id: number;
    lang: string;
    constructor(client: Client, data: VDMData, lang: string);
    /**
     * Returns the vdm content instead of a VDM instance.
     * @returns {string} The formatted vdm.
     */
    toString(): string;
    /**
     * Returns the vdm text using Discord spoilers instead of a VDM instance.
     * @returns {string}
     */
    toDiscordSpoils(): string;
}
