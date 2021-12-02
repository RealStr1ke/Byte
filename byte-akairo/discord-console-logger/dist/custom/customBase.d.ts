import { CustomLog, LogMsg } from "../interfaces";
export declare class CustomLogBase {
    constructor();
    /**
     * Gets Message Data
     * @param messageData Message Data
     * @type {void}
     */
    getMsgData(messageData: LogMsg): LogMsg;
    getCustomData(customData: CustomLog): CustomLog;
    sendDiscordData({ send }: {
        send: boolean;
    }, data: LogMsg, customData: CustomLog, url: string): void;
}
