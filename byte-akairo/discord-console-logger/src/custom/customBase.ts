import { CustomLog, LogMsg } from "../interfaces";

export class CustomLogBase {
    constructor() {
        return null;
    }

    /**
     * Gets Message Data
     * @param messageData Message Data
     * @type {void}
     */
    public getMsgData(messageData: LogMsg): LogMsg {
        return null;
    }
    public getCustomData(customData: CustomLog): CustomLog {
        return null;
    }
    public sendDiscordData({ send }: { send: boolean }, data: LogMsg, customData: CustomLog, url: string): void {}
}