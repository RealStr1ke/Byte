'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Compare if both arrays are strictly equal
 * @param arr1 The array to compare to
 * @param arr2 The array to compare with
 */
function arrayStrictEquals(arr1, arr2) {
    if (arr1 === arr2)
        return true;
    if (arr1.length !== arr2.length)
        return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i] || typeof arr1[i] !== typeof arr2[i])
            return false;
    }
    return true;
}

/**
 * Splits up an array into chunks
 * @param array The array to chunk up
 * @param chunkSize The size of each individual chunk
 */
function chunk(array, chunkSize) {
    if (!Array.isArray(array))
        throw new TypeError('entries must be an array.');
    if (!Number.isInteger(chunkSize))
        throw new TypeError('chunkSize must be an integer.');
    if (chunkSize < 1)
        throw new RangeError('chunkSize must be 1 or greater.');
    const clone = array.slice();
    const chunks = [];
    while (clone.length)
        chunks.push(clone.splice(0, chunkSize));
    return chunks;
}

/**
 * Checks whether or not the value class extends the base class.
 * @param value The constructor to be checked against.
 * @param base The base constructor.
 */
function classExtends(value, base) {
    let ctor = value;
    while (ctor !== null) {
        if (ctor === base)
            return true;
        ctor = Object.getPrototypeOf(ctor);
    }
    return false;
}

const zws$1 = String.fromCharCode(8203);
/**
 * Wraps text in a markdown codeblock with optionally a language indicator for syntax highlighting
 * @param language The codeblock language
 * @param expression The expression to be wrapped in the codeblock
 */
function codeBlock(language, expression) {
    if (typeof expression === 'string') {
        if (expression.length === 0)
            return `\`\`\`${zws$1}\`\`\``;
        return `\`\`\`${language}\n${expression.replace(/```/, `\`${zws$1}\`\``).replace(/`$/g, `\`${zws$1}`)}\`\`\``;
    }
    return `\`\`\`${language}\n${expression || zws$1}\`\`\``;
}

/**
 * Split a string by its latest space character in a range from the character 0 to the selected one.
 * @param str The text to split.
 * @param length The length of the desired string.
 * @param char The character to split with
 * @copyright 2019 Antonio Román
 * @license Apache-2.0
 */
function splitText(str, length, char = ' ') {
    const x = str.substring(0, length).lastIndexOf(char);
    const pos = x === -1 ? length : x;
    return str.substring(0, pos);
}

/**
 * Split a text by its latest space character in a range from the character 0 to the selected one.
 * @param str The text to split.
 * @param length The length of the desired string.
 * @copyright 2019 Antonio Román
 * @license Apache-2.0
 */
function cutText(str, length) {
    if (str.length < length)
        return str;
    const cut = splitText(str, length - 3);
    if (cut.length < length - 3)
        return `${cut}...`;
    return `${cut.slice(0, length - 3)}...`;
}

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
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
function debounce(func, options = {}) {
    var _a;
    let lastArgs;
    let result;
    let timerId;
    let lastCallTime;
    let lastInvokeTime = 0;
    const wait = (_a = options.wait) !== null && _a !== void 0 ? _a : 0;
    const maxWait = typeof options.maxWait === 'number' ? Math.max(options.maxWait, wait) : null;
    function invokeFunc(time) {
        const args = lastArgs;
        lastArgs = undefined;
        lastInvokeTime = time;
        result = func(...args);
        return result;
    }
    function leadingEdge(time) {
        // Reset any `maxWait` timer.
        lastInvokeTime = time;
        // Start the timer for the trailing edge.
        timerId = setTimeout(timerExpired, wait);
        // Invoke the leading edge.
        return result;
    }
    function remainingWait(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        const result = wait - timeSinceLastCall;
        return maxWait === null ? result : Math.min(result, maxWait - timeSinceLastInvoke);
    }
    function shouldInvoke(time) {
        const timeSinceLastCall = time - lastCallTime;
        const timeSinceLastInvoke = time - lastInvokeTime;
        // Either this is the first call, activity has stopped and we're at the
        // trailing edge, the system time has gone backwards and we're treating
        // it as the trailing edge, or we've hit the `maxWait` limit.
        return (lastCallTime === undefined || //
            timeSinceLastCall >= wait ||
            timeSinceLastCall < 0 ||
            (maxWait !== null && timeSinceLastInvoke >= maxWait));
    }
    function timerExpired() {
        const time = Date.now();
        if (shouldInvoke(time)) {
            trailingEdge(time);
            return;
        }
        // Restart the timer.
        timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
        timerId = undefined;
        return invokeFunc(time);
    }
    function cancel() {
        if (timerId !== undefined) {
            clearTimeout(timerId);
        }
        lastInvokeTime = 0;
        lastArgs = undefined;
        lastCallTime = undefined;
        timerId = undefined;
    }
    function flush() {
        return timerId === undefined ? result : trailingEdge(Date.now());
    }
    function debounced(...args) {
        const time = Date.now();
        const isInvoking = shouldInvoke(time);
        lastArgs = args;
        lastCallTime = time;
        if (isInvoking) {
            if (timerId === undefined) {
                return leadingEdge(lastCallTime);
            }
            if (maxWait !== null) {
                // Handle invocations in a tight loop.
                timerId = setTimeout(timerExpired, wait);
                return invokeFunc(lastCallTime);
            }
        }
        if (timerId === undefined) {
            timerId = setTimeout(timerExpired, wait);
        }
        return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
}

const primitiveTypes = ['string', 'bigint', 'number', 'boolean'];
/**
 * Check whether a value is a primitive
 * @param input The input to check
 */
function isPrimitive(input) {
    return primitiveTypes.includes(typeof input);
}

/**
 * Deep clone an object
 * @param source The object to clone
 */
function deepClone(source) {
    // Check if it's a primitive (with exception of function and null, which is typeof object)
    if (source === null || isPrimitive(source)) {
        return source;
    }
    if (Array.isArray(source)) {
        const output = new source.constructor(source.length);
        for (let i = 0; i < source.length; i++) {
            output[i] = deepClone(source[i]);
        }
        return output;
    }
    if (source instanceof Map) {
        const output = new source.constructor();
        for (const [key, value] of source.entries()) {
            output.set(key, deepClone(value));
        }
        return output;
    }
    if (source instanceof Set) {
        const output = new source.constructor();
        for (const value of source.values()) {
            output.add(deepClone(value));
        }
        return output;
    }
    if (typeof source === 'object') {
        const output = new source.constructor();
        for (const [key, value] of Object.entries(source)) {
            Object.defineProperty(output, key, {
                configurable: true,
                enumerable: true,
                value: deepClone(value),
                writable: true
            });
        }
        return output;
    }
    return source;
}

/**
 * Checks whether or not a value is `null` or `undefined`
 * @param value The value to check
 */
function isNullOrUndefined(value) {
    return value === undefined || value === null;
}

/**
 * Checks whether a value is not `null` nor `undefined`.
 * This can be used in {@link Array.filter} to remove `null` and `undefined` from the array type
 * @param value The value to verify that is neither `null` nor `undefined`
 * @returns A boolean that is `true` if the value is neither `null` nor `undefined`, false otherwise.
 * @example
 * ```typescript
 * // TypeScript Type: (string | undefined | null)[]
 * const someArray = ['one', 'two', undefined, null, 'five'];
 *
 * // TypeScript Type: string[]
 * const filteredArray = someArray.filter(filterNullAndUndefined);
 * // Result: ['one', 'two', 'five']
 * ```
 */
function filterNullAndUndefined(value) {
    return !isNullOrUndefined(value);
}

/**
 * Checks whether or not a value is `null`, `undefined` or `''`, `[]`
 * @param value The value to check
 */
function isNullOrUndefinedOrEmpty(value) {
    return isNullOrUndefined(value) || value.length === 0;
}

/**
 * Checks whether a value is not `null` nor `undefined` nor `''` (empty string).
 * This can be used in {@link Array.filter} to remove `null`, `undefined` from the array type
 * @param value The value to verify that is neither `null`, `undefined` nor `''` (empty string)
 * @returns A boolean that is `true` if the value is neither `null`, `undefined` nor `''` (empty string), false otherwise.
 * @example
 * ```typescript
 * // TypeScript Type: (string | undefined | null)[]
 * const someArray = ['one', 'two', undefined, null, ''];
 *
 * // TypeScript Type: string[]
 * const filteredArray = someArray.filter(filterNullAndUndefinedAndEmpty);
 * // Result: ['one', 'two']
 * ```
 */
function filterNullAndUndefinedAndEmpty(value) {
    return !isNullOrUndefinedOrEmpty(value);
}

/**
 * Checks whether or not a value is `null`, `undefined` or `0`
 * @param value The value to check
 */
function isNullOrUndefinedOrZero(value) {
    return value === 0 || isNullOrUndefined(value);
}

/**
 * Checks whether a value is not `null` nor `undefined` nor `0`.
 * This can be used in {@link Array.filter} to remove `null`, `undefined` from the array type
 * @param value The value to verify that is neither `null`, `undefined` nor `0`
 * @returns A boolean that is `true` if the value is neither `null`, `undefined` nor `0`, false otherwise.
 * @example
 * ```typescript
 * // TypeScript Type: (string | number | undefined | null)[]
 * const someArray = ['one', 'two', undefined, null, 0, 1];
 *
 * // TypeScript Type: (string | number)[]
 * const filteredArray = someArray.filter(filterNullAndUndefinedAndZero);
 * // Result: ['one', 'two', 1]
 * ```
 */
function filterNullAndUndefinedAndZero(value) {
    return !isNullOrUndefinedOrZero(value);
}

/**
 * Checks whether any of the {@link keys} are in the {@link map}
 * @param map The map to check
 * @param keys The keys to find in the map
 * @returns `true` if at least one of the {@link keys} is in the {@link map}, `false` otherwise.
 */
function hasAtLeastOneKeyInMap(map, keys) {
    return keys.some((key) => map.has(key));
}

const zws = String.fromCharCode(8203);
/**
 * Wraps text in a markdown inline codeblock
 * @param expression The expression to be wrapped in the codeblock
 */
function inlineCodeBlock(input) {
    return `\`${input.replace(/ /g, '\u00A0').replace(/`/g, `\`${zws}`)}\``;
}

/**
 * Verify if the input is a class constructor.
 * @param input The function to verify
 */
function isClass(input) {
    return typeof input === 'function' && typeof input.prototype === 'object';
}

/**
 * Verify if the input is a function.
 * @param input The function to verify
 */
// eslint-disable-next-line @typescript-eslint/ban-types
function isFunction(input) {
    return typeof input === 'function';
}

/**
 * Verify if a number is a finite number.
 * @param input The number to verify
 */
function isNumber(input) {
    return typeof input === 'number' && !isNaN(input) && Number.isFinite(input);
}

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Verify if the input is an object literal (or class).
 * @param input The object to verify
 */
function isObject(input) {
    return typeof input === 'object' && input ? input.constructor === Object : false;
}

/* eslint-disable @typescript-eslint/ban-types */
function hasThen(input) {
    return Reflect.has(input, 'then') && isFunction(input.then);
}
function hasCatch(input) {
    return Reflect.has(input, 'catch') && isFunction(input.catch);
}
/**
 * Verify if an object is a promise.
 * @param input The promise to verify
 */
function isThenable(input) {
    if (typeof input !== 'object' || input === null)
        return false;
    return input instanceof Promise || (input !== Promise.prototype && hasThen(input) && hasCatch(input));
}

/**
 * Turn a dotted path into a json object.
 * @param path The dotted path
 * @param value The value
 * @param obj The object to edit
 */
function makeObject(path, value, obj = {}) {
    if (path.includes('.')) {
        const route = path.split('.');
        const lastKey = route.pop();
        let reference = obj;
        for (const key of route) {
            if (!reference[key])
                reference[key] = {};
            reference = reference[key];
        }
        reference[lastKey] = value;
    }
    else {
        obj[path] = value;
    }
    return obj;
}

/**
 * Deep merges 2 objects. Properties from the second parameter are applied to the first.
 * @remark `overwrites` is also mutated!
 * @remark If the value of a key in `overwrites` is `undefined` then the value of that same key in `base` is used instead!
 * @remark This is essentially `{ ...base, ...overwrites }` but recursively
 * @param base Base object
 * @param overwrites Overwrites to apply
 * @example
 * ```typescript
 * const base = { a: 0, b: 1 };
 * const overwrites = {}; // will be { a: 0, b: 1 } after merge
 * mergeDefault(base, overwrites) // { a: 0, b: 1 }
 * ```
 * @example
 * ```typescript
 * const base = { a: 0, b: 1 };
 * const overwrites = { a: 2, i: 3 };
 * mergeDefault(base, overwrites) // { a: 2, i: 3, b: 1 };
 * ```
 * @example
 * ```typescript
 * const base = { a: 0, b: 1 };
 * const overwrites = { a: null };
 * mergeDefault(base, overwrites) // { a: null, b: 1 };
 * ```
 * @example
 * ```typescript
 * const base = { a: 0, b: 1 };
 * const overwrites = { a: undefined };
 * mergeDefault(base, overwrites) // { a: 0, b: 1 };
 * ```
 * @example
 * ```typescript
 * const base = { a: null };
 * const overwrites = { a: { b: 5 } };
 * mergeDefault(base, overwrites) // { a: { b: 5 } };
 * ```
 */
function mergeDefault(base, overwrites) {
    // If no overwrites are specified then deep clone the base
    if (!overwrites)
        return deepClone(base);
    for (const [baseKey, baseValue] of Object.entries(base)) {
        const overwritesValueAtBaseKey = Reflect.get(overwrites, baseKey);
        if (typeof overwritesValueAtBaseKey === 'undefined') {
            Reflect.set(overwrites, baseKey, deepClone(baseValue));
        }
        else if (isObject(overwritesValueAtBaseKey)) {
            Reflect.set(overwrites, baseKey, mergeDefault((baseValue !== null && baseValue !== void 0 ? baseValue : {}), overwritesValueAtBaseKey));
        }
    }
    return overwrites;
}

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Merges two objects
 * @param objTarget The object to be merged
 * @param objSource The object to merge
 */
function mergeObjects(objTarget, objSource) {
    for (const [key, value] of Object.entries(objSource)) {
        const targetValue = Reflect.get(objTarget, key);
        if (isObject(value)) {
            Reflect.set(objTarget, key, isObject(targetValue) ? mergeObjects(targetValue, value) : value);
        }
        else if (!isObject(targetValue)) {
            Reflect.set(objTarget, key, value);
        }
    }
    return objTarget;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() { }

/**
 * Convert an object to a tuple
 * @param value The object to convert
 * @param prefix The prefix for the key
 */
function objectToTuples(original, prefix = '') {
    const entries = [];
    for (const [key, value] of Object.entries(original)) {
        if (isObject(value)) {
            entries.push(...objectToTuples(value, `${prefix}${key}.`));
        }
        else {
            entries.push([`${prefix}${key}`, value]);
        }
    }
    return entries;
}

/**
 * Parses an URL, returns null if invalid.
 * @param url The url to parse
 */
function parseURL(url) {
    try {
        // @ts-expect-error URL is global in NodeJS and evergreen Browsers
        return new URL(url);
    }
    catch {
        return null;
    }
}

/**
 * Partitions `array` into a tuple of two arrays,
 * where one array contains all elements that satisfies `predicate`,
 * and the other contains all elements that do not satisfy `predicate`.
 * @param array The array to partition. This array is not mutated.
 * @param predicate The predicate function to determine in which partition the item should be placed.
 * The function should return true for items that should be placed in the first partition, and false for those that should be placed in the second partition.
 * @returns A tuple of two arrays.
 */
function partition(array, predicate) {
    if (!Array.isArray(array))
        throw new TypeError('entries must be an array.');
    if (!isFunction(predicate))
        throw new TypeError('predicate must be an function that returns a boolean value.');
    const partitionOne = [];
    const partitionTwo = [];
    for (let i = 0; i < array.length; i++) {
        if (predicate(array[i], i)) {
            partitionOne.push(array[i]);
        }
        else {
            partitionTwo.push(array[i]);
        }
    }
    return [partitionOne, partitionTwo];
}

/**
 * Get an array of numbers with the selected range
 * @param min The minimum value
 * @param max The maximum value
 * @param step The step value
 */
function range(min, max, step) {
    return new Array(Math.floor((max - min) / step) + 1).fill(0).map((_val, i) => min + i * step);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const REGEXPESC = /[-/\\^$*+?.()|[\]{}]/g;
/**
 * Cleans a string from regex injection
 * @param str The string to clean
 */
function regExpEsc(str) {
    return str.replace(REGEXPESC, '\\$&');
}

/**
 * Properly rounds up or down a number.
 * Also supports strings using an exponent to indicate large or small numbers.
 * @param num The number to round off
 * @param scale The amount of decimals to retain
 */
function roundNumber(num, scale = 0) {
    if (!num.toString().includes('e')) {
        return Number(`${Math.round(Number(`${num}e+${scale}`))}e-${scale}`);
    }
    const arr = `${num}`.split('e');
    let sig = '';
    if (Number(arr[1]) + scale > 0) {
        sig = '+';
    }
    return Number(`${Math.round(Number(`${Number(arr[0])}e${sig}${Number(arr[1]) + scale}`))}e-${scale}`);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const TOTITLECASE = /[A-Za-zÀ-ÖØ-öø-ÿ]\S*/g;
const titleCaseVariants = {
    textchannel: 'TextChannel',
    voicechannel: 'VoiceChannel',
    categorychannel: 'CategoryChannel',
    guildmember: 'GuildMember'
};
/**
 * Converts a string to Title Case
 * @description This is designed to also ensure common Discord PascalCased strings
 * 				are put in their TitleCase titleCaseVariants. See below for the full list.
 * @param str The string to title case
 * @terms
 * This table lists how certain terms are converted, these are case insensitive.
 * Any terms not included are converted to regular Titlecase.
 *
 *      | Term            |    Converted To |
 *      |-----------------|-----------------|
 *      | textchannel     |     TextChannel |
 *      | voicechannel    |    VoiceChannel |
 *      | categorychannel | CategoryChannel |
 *      | guildmember     |     GuildMember |
 */
function toTitleCase(str) {
    return str.replace(TOTITLECASE, (txt) => titleCaseVariants[txt] || txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
}

/* eslint-disable @typescript-eslint/ban-types */
/**
 * Try parse a stringified JSON string.
 * @param value The value to parse
 */
function tryParse(value) {
    try {
        return JSON.parse(value);
    }
    catch (err) {
        return value;
    }
}

exports.arrayStrictEquals = arrayStrictEquals;
exports.chunk = chunk;
exports.classExtends = classExtends;
exports.codeBlock = codeBlock;
exports.cutText = cutText;
exports.debounce = debounce;
exports.deepClone = deepClone;
exports.filterNullAndUndefined = filterNullAndUndefined;
exports.filterNullAndUndefinedAndEmpty = filterNullAndUndefinedAndEmpty;
exports.filterNullAndUndefinedAndZero = filterNullAndUndefinedAndZero;
exports.filterNullish = filterNullAndUndefined;
exports.filterNullishOrEmpty = filterNullAndUndefinedAndEmpty;
exports.filterNullishOrZero = filterNullAndUndefinedAndZero;
exports.hasAtLeastOneKeyInMap = hasAtLeastOneKeyInMap;
exports.inlineCodeBlock = inlineCodeBlock;
exports.isClass = isClass;
exports.isFunction = isFunction;
exports.isNullOrUndefined = isNullOrUndefined;
exports.isNullOrUndefinedOrEmpty = isNullOrUndefinedOrEmpty;
exports.isNullOrUndefinedOrZero = isNullOrUndefinedOrZero;
exports.isNullish = isNullOrUndefined;
exports.isNullishOrEmpty = isNullOrUndefinedOrEmpty;
exports.isNullishOrZero = isNullOrUndefinedOrZero;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isPrimitive = isPrimitive;
exports.isThenable = isThenable;
exports.makeObject = makeObject;
exports.mergeDefault = mergeDefault;
exports.mergeObjects = mergeObjects;
exports.noop = noop;
exports.objectToTuples = objectToTuples;
exports.parseURL = parseURL;
exports.partition = partition;
exports.range = range;
exports.regExpEsc = regExpEsc;
exports.roundNumber = roundNumber;
exports.splitText = splitText;
exports.toTitleCase = toTitleCase;
exports.tryParse = tryParse;
//# sourceMappingURL=index.js.map
