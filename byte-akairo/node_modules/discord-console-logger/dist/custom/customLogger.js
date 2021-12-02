"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const superagent_1 = __importDefault(require("superagent"));
class CustomLogger {
    constructor(data) {
        this.data = data;
    }
    getCustomData(customData) {
        return {
            color: customData.color,
            prefix: customData.prefix
        };
    }
    sendDiscordData({ send }, data, customData, url) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!send)
                return;
            const postBody = {
                content: undefined,
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
                        fields: [],
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
            };
            const contentStrings = [];
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
                url: yield url,
                body: postBody
            };
            yield superagent_1.default
                .post(options.url)
                .send(options.body)
                .set('accept', 'json');
        });
    }
    getMsgData(messageData) {
        return {
            description: messageData.description,
            message: messageData.message,
            error: messageData.error,
            json: messageData.json
        };
    }
}
exports.default = CustomLogger;
