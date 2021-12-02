import { LogMsg, CustomLog, LogOptions } from "./interfaces";
declare type Log_Levels = "error" | "warn" | "info" | "verbose" | "debug" | "custom";
export declare class DiscordConsoleLogger {
    private hook;
    private icon;
    private footer;
    private id;
    private token;
    private console;
    private consoleError;
    private onErrorCallback;
    /**
     * Discord Console Logger
     * @param options Discord logger options
     * @author lucaslah
     * @license MIT
     */
    constructor(options: LogOptions);
    private logInternalError;
    private getToken;
    private getUrl;
    /**
     * @param level Log Level
     * @param data Log message data
     */
    log: (level: Log_Levels, data: LogMsg, customData?: CustomLog) => Promise<void>;
    /**
     * Log error
     * @param data
     * @type {Promise<void>}
     * @example <logger>.error({ message: "Hello", error: new Error("Test Error") })
     * @public
     */
    error: (data: LogMsg) => Promise<void>;
    /**
     * Log warn
     * @param data
     * @type {Promise<void>}
     * @example <logger>.warn({ message: "Hello" })
     * @public
     */
    warn: (data: LogMsg) => Promise<void>;
    /**
     * Log info
     * @param data
     * @type {Promise<void>}
     * @example <logger>.info({ message: "Hello" })
     * @public
     */
    info: (data: LogMsg) => Promise<void>;
    /**
     * Log verbose
     * @param data
     * @type {Promise<void>}
     * @example <logger>.verbose({ message: "Hello" })
     * @public
     */
    verbose: (data: LogMsg) => Promise<void>;
    /**
     * Log debug
     * @param data
     * @type {Promise<void>}
     * @example <logger>.debug({ message: "Hello" })
     * @public
     */
    debug: (data: LogMsg) => Promise<void>;
    /**
     * Log Custom
     * @param data
     * @param customData
     * @type {Promise<void>}
     * @public
     */
    custom: (data: LogMsg, customData: CustomLog) => Promise<void>;
}
export {};
