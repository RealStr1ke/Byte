export interface ErrorCallback {
    (err: Error): void;
}
export interface LogMsg {
    message: string;
    description?: string;
    error?: Error;
    json?: any;
}
export interface LogOptions {
    hookURL: string;
    iconURL?: string;
    footer?: string;
    console?: boolean;
    consoleError?: boolean;
    errorHandler?: {
        (err: Error): void;
    };
}
export interface CustomLog {
    color: string | number;
    prefix: string;
}
