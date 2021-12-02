/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
export interface DebounceSettings {
    /**
     * The number of milliseconds to delay.
     * @default 0
     */
    wait?: number;
    /**
     * The maximum time `func` is allowed to be delayed before it's invoked
     * @default null
     */
    maxWait?: number | null;
}
export interface DebouncedFunc<FnArgumentsType extends any[], FnReturnType> {
    /**
     * Call the original function, but applying the debounce rules.
     *
     * If the debounced function can be run immediately, this calls it and returns its return
     * value.
     *
     * Otherwise, it returns the return value of the last invokation, or undefined if the debounced
     * function was not invoked yet.
     */
    (...args: FnArgumentsType): FnReturnType | undefined;
    /**
     * Throw away any pending invokation of the debounced function.
     */
    cancel(): void;
    /**
     * If there is a pending invokation of the debounced function, invoke it immediately and return
     * its return value.
     *
     * Otherwise, return the value from the last invokation, or undefined if the debounced function
     * was never invoked.
     */
    flush(): FnReturnType | undefined;
}
/**
 * Creates a debounced function that delays invoking func until after wait milliseconds have elapsed since
 * the last time the debounced function was invoked. The debounced function comes with a cancel method to
 * cancel delayed invocations and a flush method to immediately invoke them. Provide an options object to
 * indicate that func should be invoked on the leading and/or trailing edge of the wait timeout. Subsequent
 * calls to the debounced function return the result of the last func invocation.
 *
 * Note: If leading and trailing options are true, func is invoked on the trailing edge of the timeout only
 * if the the debounced function is invoked more than once during the wait timeout.
 *
 * See David Corbacho’s article for details over the differences between _.debounce and _.throttle.
 *
 * @param func The function to debounce.
 * @param wait The number of milliseconds to delay.
 * @param options The options object.
 * @return Returns the new debounced function.
 */
export declare function debounce<FnArgumentsType extends any[], FnReturnType>(func: (...args: FnArgumentsType) => FnReturnType, options?: DebounceSettings): DebouncedFunc<FnArgumentsType, FnReturnType>;
//# sourceMappingURL=index.d.ts.map