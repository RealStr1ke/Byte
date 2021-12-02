/// <reference types="node" />
/**
 * Manages timers so that this application can be cleanly exited
 */
export declare class TimerManager extends null {
    /**
     * A set of timeouts to clear on destroy
     */
    private static storedTimeouts;
    /**
     * A set of intervals to clear on destroy
     */
    private static storedIntervals;
    /**
     * Creates a timeout gets cleared when destroyed
     * @param fn callback function
     * @param delay amount of time before running the callback
     * @param args additional arguments to pass back to the callback
     */
    static setTimeout<A = unknown>(fn: (...args: A[]) => void, delay: number, ...args: A[]): NodeJS.Timeout;
    /**
     * Clears a timeout created through this class
     * @param timeout The timeout to clear
     */
    static clearTimeout(timeout: NodeJS.Timeout): void;
    /**
     * Creates an interval gets cleared when destroyed
     * @param fn callback function
     * @param delay amount of time before running the callback
     * @param args additional arguments to pass back to the callback
     */
    static setInterval<A = unknown>(fn: (...args: A[]) => void, delay: number, ...args: A[]): NodeJS.Timeout;
    /**
     * Clears an internal created through this class
     * @param interval The interval to clear
     */
    static clearInterval(interval: NodeJS.Timeout): void;
    /**
     * Clears running timeouts and intervals created through this class so NodeJS can gracefully exit
     */
    static destroy(): void;
}
//# sourceMappingURL=TimerManager.d.ts.map