export declare type TimeResolvable = Date | number | string;
export interface TimestampTemplateEntry {
    type: string;
    content: string | null;
}
/**
 * Timestamp class, parses the pattern once, displays the desired Date or UNIX timestamp with the selected pattern.
 */
export declare class Timestamp {
    /**
     * The raw pattern
     * @since 1.0.0
     */
    pattern: string;
    /**
     * @since 1.0.0
     */
    private template;
    /**
     * Starts a new Timestamp and parses the pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     */
    constructor(pattern: string);
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param time The time to display
     */
    display(time?: TimeResolvable): string;
    /**
     * Display the current date utc with the current pattern.
     * @since 1.0.0
     * @param time The time to display in utc
     */
    displayUTC(time?: TimeResolvable): string;
    /**
     * Edits the current pattern.
     * @since 1.0.0
     * @param pattern The new pattern for this instance
     * @chainable
     */
    edit(pattern: string): this;
    /**
     * Defines the toString behavior of Timestamp.
     */
    toString(): string;
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     * @param time The time to display
     */
    static displayArbitrary(pattern: string, time?: TimeResolvable): string;
    /**
     * Display the current date utc with the current pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     * @param time The time to display
     */
    static displayUTCArbitrary(pattern: string, time?: TimeResolvable): string;
    /**
     * Creates a UTC Date object to work with.
     * @since 1.0.0
     * @param time The date to convert to utc
     */
    static utc(time?: Date | number | string): Date;
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param template The pattern to parse
     * @param time The time to display
     */
    private static display;
    /**
     * Parses the pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     */
    private static parse;
    /**
     * Resolves a date.
     * @since 1.0.0
     * @param time The time to parse
     */
    private static resolveDate;
}
//# sourceMappingURL=Timestamp.d.ts.map