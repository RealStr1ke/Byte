/**
 * Handles Cron strings and generates dates based on the cron string provided.
 * @see https://en.wikipedia.org/wiki/Cron
 */
export declare class Cron {
    cron: string;
    normalized: string;
    minutes: number[];
    hours: number[];
    days: number[];
    months: number[];
    dows: number[];
    /**
     * @param cron The cron pattern to use
     */
    constructor(cron: string);
    /**
     * Get the next date that matches with the current pattern
     * @param outset The Date instance to compare with
     * @param origin Whether this next call is origin
     */
    next(outset?: Date, origin?: boolean): Date;
    /**
     * Normalize the pattern
     * @param cron The pattern to normalize
     */
    private static normalize;
    /**
     * Parse the pattern
     * @param cron The pattern to parse
     */
    private static parseString;
    /**
     * Parse the current part
     * @param cronPart The part of the pattern to parse
     * @param id The id that identifies the current part
     */
    private static parsePart;
}
//# sourceMappingURL=Cron.d.ts.map