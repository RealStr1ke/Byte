import { CustomLogBase } from "./customBase";
import { LogMsg, CustomLog } from "../interfaces";
interface Data {
    footer: {
        text: string;
        icon_url: any;
    };
}
export default class CustomLogger implements CustomLogBase {
    private data;
    constructor(data: Data);
    getCustomData(customData: CustomLog): CustomLog;
    sendDiscordData({ send }: {
        send: boolean;
    }, data: LogMsg, customData: CustomLog, url: string): Promise<void>;
    getMsgData(messageData: LogMsg): LogMsg;
}
export {};
