import type { DurationFormatAssetsTime } from './DurationFormatter';
/**
 * The supported time types
 */
export declare const enum TimeTypes {
    Second = "second",
    Minute = "minute",
    Hour = "hour",
    Day = "day",
    Week = "week",
    Month = "month",
    Year = "year"
}
export declare const enum Time {
    Millisecond = 1,
    Second = 1000,
    Minute = 60000,
    Hour = 3600000,
    Day = 86400000,
    Month = 2628000000,
    Year = 31536000000
}
export declare const days: string[];
export declare const months: string[];
export declare const tokens: Map<string, number>;
export declare const partRegex: RegExp;
export declare const wildcardRegex: RegExp;
export declare const allowedNum: number[][];
export declare const predefined: {
    readonly '@annually': "0 0 1 1 *";
    readonly '@yearly': "0 0 1 1 *";
    readonly '@monthly': "0 0 1 * *";
    readonly '@weekly': "0 0 * * 0";
    readonly '@daily': "0 0 * * *";
    readonly '@hourly': "0 * * * *";
};
export declare const cronTokens: {
    readonly jan: 1;
    readonly feb: 2;
    readonly mar: 3;
    readonly apr: 4;
    readonly may: 5;
    readonly jun: 6;
    readonly jul: 7;
    readonly aug: 8;
    readonly sep: 9;
    readonly oct: 10;
    readonly nov: 11;
    readonly dec: 12;
    readonly sun: 0;
    readonly mon: 1;
    readonly tue: 2;
    readonly wed: 3;
    readonly thu: 4;
    readonly fri: 5;
    readonly sat: 6;
};
export declare const tokensRegex: RegExp;
export declare const DEFAULT_UNITS: DurationFormatAssetsTime;
//# sourceMappingURL=constants.d.ts.map