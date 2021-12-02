import { CustomLogBase } from "./customBase";
import { LogMsg, CustomLog, LogOptions } from "../interfaces";
import request from "superagent";

interface Data {
    footer: {
        text: string;
        icon_url: any;
    }
}

export default class CustomLogger implements CustomLogBase {
    private data: Data;
    constructor(data: Data) {
        this.data = data;
    }
    public getCustomData(customData: CustomLog): CustomLog {
        return {
            color: customData.color,
            prefix: customData.prefix
        }
    }
    public async sendDiscordData({ send }: { send: boolean }, data: LogMsg, customData: CustomLog, url: string): Promise<void> {
        if (!send) return;
        const postBody = {
            content: undefined as string | undefined,
            /**
             * Embed Data
             */
            embeds: [{
                /**
                 * Embed Title
                 */
                title: this.getMsgData(data).message,
                /**
                 * Embed description
                 */
                description: this.getMsgData(data).description,
                /**
                 * Embed Color
                 */
                color: customData.color,
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
                    text: this.data.footer.text,
                    /**
                     * Embed footer Icon
                     */
                    icon_url: this.data.footer.icon_url
                }
            }]
        }

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
                url: await url,
                body: postBody
            };

            await request
                .post(options.url)
                .send(options.body)
                .set('accept', 'json');
    }
    public getMsgData(messageData: LogMsg): LogMsg {
        return {
            description: messageData.description,
            message: messageData.message,
            error: messageData.error,
            json: messageData.json
        }
    }
}