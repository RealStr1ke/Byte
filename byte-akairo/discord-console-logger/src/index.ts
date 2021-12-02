import request from "superagent";
import {
    resolveColor
} from "./util/resolveColor";
import {
    info,
    debug,
    warn,
    error,
    verbose,
    custom
} from "./util/console-levels";
import {
    ErrorCallback,
    LogMsg,
    CustomLog,
    LogOptions
} from "./interfaces";
import CustomLogger from "./custom/customLogger";

const COLORS: {
    [key: string]: number
} = {
    error: 14362664,
    warn: 16497928,
    info: 2196944,
    verbose: 6559689,
    debug: 47694,
}

type Log_Levels = "error" | "warn" | "info" | "verbose" | "debug" | "custom";

export class DiscordConsoleLogger {
    private hook: string
    private icon: string | undefined = undefined;
    private footer: string | undefined = undefined;
    private id: string | undefined = undefined;
    private token: string | undefined = undefined;
    private console: boolean | undefined = false;
    private consoleError: boolean | undefined = false
    private onErrorCallback: ErrorCallback | undefined = undefined;

    /**
     * Discord Console Logger
     * @param options Discord logger options
     * @author lucaslah
     * @license MIT
     */
    constructor(options: LogOptions) {
        this.hook = options.hookURL;
        this.icon = options.iconURL;
        this.footer = options.footer;
        this.console = options.console;
        this.consoleError = options.consoleError
        this.onErrorCallback = options.errorHandler;
        this.getToken()
    }

    private logInternalError = (err: Error) => {
        if (this.onErrorCallback) {
            this.onErrorCallback(err);
        } else {
            console.error(err);
        }
    }

    private getToken = async (): Promise < {
        id: string;token: string
    } > => {
        if (!this.id || !this.token) {
            try {
                const response = await request
                    .get(this.hook)
                    .set('accept', 'json');

                this.id = response.body.id;
                this.token = response.body.token;
            } catch (err) {
                this.logInternalError(err);
            }
        }
        return {
            id: this.id || '',
            token: this.token || ''
        };
    };

    private getUrl = async () => {
        const {
            id,
            token
        } = await this.getToken();
        return `https://discord.com/api/webhooks/${id}/${token}`;
    }

    /**
     * @param level Log Level
     * @param data Log message data
     */
    public log = async (
        level: Log_Levels,
        data: LogMsg,
        customData ? : CustomLog,
    ) => {
        try {
            if (level === "custom" && customData) {
                const customLogger = new CustomLogger({
                    footer: {
                        text: this.footer,
                        icon_url: this.icon
                    }
                });
                const cd: CustomLog = {
                    color: customData.color,
                    prefix: customData.prefix
                }
                customLogger.sendDiscordData({
                    send: true
                }, data, cd, await this.getUrl());
                return;
            }
            const postBody = {
                content: undefined as string | undefined,
                /**
                 * Embed Data
                 */
                embeds: [{
                    /**
                     * Embed Title
                     */
                    title: data.message,
                    /**
                     * Embed description
                     */
                    description: data.description,
                    /**
                     * Embed Color
                     */
                    color: COLORS[level],
                    /**
                     * Embed fields
                     */
                    fields: [] as any[],
                    /**
                     * Embed Timestamp
                     */
                    timestamp: new Date().toISOString(),
                    /**
                     * Embed footer
                     */
                    footer: {
                        /**
                         * Embed footer text
                         */
                        text: this.footer,
                        /**
                         * Embed footer Icon
                         */
                        icon_url: this.icon
                    }
                }]
            };

            const contentStrings: string[] = [];

            if (data.json) {
                contentStrings.push(JSON.stringify(data.json, undefined, '  '));
            }

            if (data.error && data.error.stack) {
                contentStrings.push(data.error.stack);
            }

            if (contentStrings.length > 0) {
                postBody.content = `\`\`\`${contentStrings.join('\n\n')}\`\`\``;
            }


            const options = {
                url: await this.getUrl(),
                body: postBody
            };

            await request
                .post(options.url)
                .send(options.body)
                .set('accept', 'json');
        } catch (err) {
            this.logInternalError(err);
        }
    };

    /**
     * Log error
     * @param data
     * @type {Promise<void>}
     * @example <logger>.error({ message: "Hello", error: new Error("Test Error") })
     * @public
     */
    public error = async (data: LogMsg): Promise < void > => {
        this.log('error', data);
        if (this.console) {
            error(data.message)
            if (this.consoleError) {
                console.error(data.error)
            }
        }
    }

    /**
     * Log warn
     * @param data
     * @type {Promise<void>}
     * @example <logger>.warn({ message: "Hello" })
     * @public
     */
    public warn = async (data: LogMsg): Promise < void > => {
        this.log('warn', data);
        if (this.console) {
            warn(data.message)
        }
    }

    /**
     * Log info
     * @param data
     * @type {Promise<void>}
     * @example <logger>.info({ message: "Hello" })
     * @public
     */
    public info = async (data: LogMsg): Promise < void > => {
        this.log('info', data);
        if (this.console) {
            info(data.message)
        }
    }

    /**
     * Log verbose
     * @param data
     * @type {Promise<void>}
     * @example <logger>.verbose({ message: "Hello" })
     * @public
     */
    public verbose = async (data: LogMsg): Promise < void > => {
        this.log('verbose', data);
        if (this.console) {
            verbose(data.message)
        }
    }

    /**
     * Log debug
     * @param data
     * @type {Promise<void>}
     * @example <logger>.debug({ message: "Hello" })
     * @public
     */
    public debug = async (data: LogMsg): Promise < void > => {
        this.log("debug", data);
        if (this.console) {
            debug(data.message)
        }
    }

    /**
     * Log Custom
     * @param data 
     * @param customData 
     * @type {Promise<void>}
     * @public
     */
    public custom = async (data: LogMsg, customData: CustomLog): Promise < void > => {
        this.log("custom", data, customData);
        if (this.console) {
            const _color_ = resolveColor(customData.color);
            const prefix = customData.prefix;
            custom(data.message, prefix);
        }
    }

}