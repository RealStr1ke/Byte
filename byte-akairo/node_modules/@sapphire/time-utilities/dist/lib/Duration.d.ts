/**
 * Converts duration strings into ms and future dates
 */
export declare class Duration {
    /**
     * The offset
     */
    offset: number;
    /**
     * Create a new Duration instance
     * @param pattern The string to parse
     */
    constructor(pattern: string);
    /**
     * Get the date from now
     */
    get fromNow(): Date;
    /**
     * Get the date from
     * @param date The Date instance to get the date from
     */
    dateFrom(date: Date): Date;
    /**
     * The RegExp used for the pattern parsing
     */
    private static readonly kPatternRegex;
    /**
     * The RegExp used for removing commas
     */
    private static readonly kCommaRegex;
    /**
     * The RegExp used for replacing a/an with 1
     */
    private static readonly kAanRegex;
    /**
     * Parse the pattern
     * @param pattern The pattern to parse
     */
    private static parse;
}
//# sourceMappingURL=Duration.d.ts.map