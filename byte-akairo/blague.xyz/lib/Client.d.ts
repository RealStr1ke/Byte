import { Joke } from "./Joke";
import { VDM } from "./VDM";
interface ClientOptions {
    baseURL: string;
    defaultLang: string;
}
interface APIResponse {
    data: any;
    lang: string;
}
export declare class Client {
    token: string;
    defaultLang: string;
    baseURL: string;
    constructor(token: string, options: ClientOptions);
    /**
     * Make a call to the API
     * @param {string} path The path of the endpoint to call
     * @param {string} [lang] The lang to add to the request
     * @returns {Promise<APIResponse>}
    */
    _get(path: string, lang?: string, type?: string): Promise<APIResponse>;
    /**
     * Get a random joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    randomJoke(lang?: string): Promise<Joke>;
    /**
     * Get the joke of the day
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    dailyJoke(lang?: string): Promise<Joke>;
    /**
     * Get a joke with its ID
     * @param {number} id ID of the joke
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    getJoke(id: string, lang?: string): Promise<Joke>;
    /**
     * Get the joke list
     * @param {string} [lang] The joke language
     * @returns {Promise<Joke>}
    */
    listJoke(lang?: string): Promise<any>;
    /**
     * Get a random vdm
     * @param {string} [type] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<Joke>}
    */
    randomVDM(type?: string, lang?: string): Promise<VDM>;
    /**
     * Get the vdm of the day
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    dailyVDM(type?: string, lang?: string): Promise<VDM>;
    /**
     * Get a vdm with its ID
     * @param {number} id ID of the vdm
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    getVDM(id: string, type?: string, lang?: string): Promise<VDM>;
    /**
     * Get the vdm list
     * @param {string} [type='normal'] The vdm type
     * @param {string} [lang] The vdm language
     * @returns {Promise<VDM>}
    */
    listVDM(type?: string, lang?: string): Promise<any>;
}
export default Client;
