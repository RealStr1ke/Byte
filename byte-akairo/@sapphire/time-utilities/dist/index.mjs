/**
 * The supported time types
 */
var TimeTypes;
(function (TimeTypes) {
    TimeTypes["Second"] = "second";
    TimeTypes["Minute"] = "minute";
    TimeTypes["Hour"] = "hour";
    TimeTypes["Day"] = "day";
    TimeTypes["Week"] = "week";
    TimeTypes["Month"] = "month";
    TimeTypes["Year"] = "year";
})(TimeTypes || (TimeTypes = {}));
var Time;
(function (Time) {
    Time[Time["Millisecond"] = 1] = "Millisecond";
    Time[Time["Second"] = 1000] = "Second";
    Time[Time["Minute"] = 60000] = "Minute";
    Time[Time["Hour"] = 3600000] = "Hour";
    Time[Time["Day"] = 86400000] = "Day";
    Time[Time["Month"] = 2628000000] = "Month";
    Time[Time["Year"] = 31536000000] = "Year";
})(Time || (Time = {}));
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const tokens$1 = new Map([
    ['Y', 4],
    ['Q', 1],
    ['M', 4],
    ['D', 4],
    ['d', 4],
    ['X', 1],
    ['x', 1],
    ['H', 2],
    ['h', 2],
    ['a', 1],
    ['A', 1],
    ['m', 2],
    ['s', 2],
    ['S', 3],
    ['Z', 2],
    ['l', 4],
    ['L', 4],
    ['T', 1],
    ['t', 1]
]);
const partRegex = /^(?:(\*)|(\d+)(?:-(\d+))?)(?:\/(\d+))?$/;
const wildcardRegex = /\bh\b|\B\?\B/g;
const allowedNum = [
    [0, 59],
    [0, 23],
    [1, 31],
    [1, 12],
    [0, 6]
];
const predefined = {
    '@annually': '0 0 1 1 *',
    '@yearly': '0 0 1 1 *',
    '@monthly': '0 0 1 * *',
    '@weekly': '0 0 * * 0',
    '@daily': '0 0 * * *',
    '@hourly': '0 * * * *'
};
const cronTokens = {
    jan: 1,
    feb: 2,
    mar: 3,
    apr: 4,
    may: 5,
    jun: 6,
    jul: 7,
    aug: 8,
    sep: 9,
    oct: 10,
    nov: 11,
    dec: 12,
    sun: 0,
    mon: 1,
    tue: 2,
    wed: 3,
    thu: 4,
    fri: 5,
    sat: 6
};
const tokensRegex = new RegExp(Object.keys(cronTokens).join('|'), 'g');
const DEFAULT_UNITS = {
    ["year" /* Year */]: {
        1: 'year',
        DEFAULT: 'years'
    },
    ["month" /* Month */]: {
        1: 'month',
        DEFAULT: 'months'
    },
    ["week" /* Week */]: {
        1: 'week',
        DEFAULT: 'weeks'
    },
    ["day" /* Day */]: {
        1: 'day',
        DEFAULT: 'days'
    },
    ["hour" /* Hour */]: {
        1: 'hour',
        DEFAULT: 'hours'
    },
    ["minute" /* Minute */]: {
        1: 'minute',
        DEFAULT: 'minutes'
    },
    ["second" /* Second */]: {
        1: 'second',
        DEFAULT: 'seconds'
    }
};

/**
 * Compare if both arrays are strictly equal
 * @param arr1 The array to compare to
 * @param arr2 The array to compare with
 */

/**
 * Get an array of numbers with the selected range
 * @param min The minimum value
 * @param max The maximum value
 * @param step The step value
 */
function range(min, max, step) {
    return new Array(Math.floor((max - min) / step) + 1).fill(0).map((_val, i) => min + i * step);
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
/**
 * Handles Cron strings and generates dates based on the cron string provided.
 * @see https://en.wikipedia.org/wiki/Cron
 */
class Cron {
    /**
     * @param cron The cron pattern to use
     */
    constructor(cron) {
        Object.defineProperty(this, "cron", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "normalized", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "minutes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "hours", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "days", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "months", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dows", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cron = cron.toLowerCase();
        this.normalized = Cron.normalize(this.cron);
        [this.minutes, this.hours, this.days, this.months, this.dows] = Cron.parseString(this.normalized);
    }
    /**
     * Get the next date that matches with the current pattern
     * @param outset The Date instance to compare with
     * @param origin Whether this next call is origin
     */
    next(outset = new Date(), origin = true) {
        if (!this.days.includes(outset.getUTCDate()) || !this.months.includes(outset.getUTCMonth() + 1) || !this.dows.includes(outset.getUTCDay())) {
            return this.next(new Date(outset.getTime() + 86400000 /* Day */), false);
        }
        if (!origin)
            return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), this.hours[0], this.minutes[0]));
        const now = new Date(outset.getTime() + 60000);
        for (const hour of this.hours) {
            if (hour < now.getUTCHours())
                continue;
            for (const minute of this.minutes) {
                if (hour === now.getUTCHours() && minute < now.getUTCMinutes())
                    continue;
                return new Date(Date.UTC(outset.getUTCFullYear(), outset.getUTCMonth(), outset.getUTCDate(), hour, minute));
            }
        }
        return this.next(new Date(outset.getTime() + 86400000 /* Day */), false);
    }
    /**
     * Normalize the pattern
     * @param cron The pattern to normalize
     */
    static normalize(cron) {
        if (Reflect.has(predefined, cron))
            return Reflect.get(predefined, cron);
        const now = new Date();
        cron = cron
            .split(' ')
            .map((val, i) => val.replace(wildcardRegex, (match) => {
            if (match === 'h')
                return (Math.floor(Math.random() * allowedNum[i][1]) + allowedNum[i][0]).toString();
            if (match === '?') {
                switch (i) {
                    case 0:
                        return now.getUTCMinutes().toString();
                    case 1:
                        return now.getUTCHours().toString();
                    case 2:
                        return now.getUTCDate().toString();
                    case 3:
                        return now.getUTCMonth().toString();
                    case 4:
                        return now.getUTCDay().toString();
                }
            }
            return match;
        }))
            .join(' ');
        return cron.replace(tokensRegex, (match) => String(Reflect.get(cronTokens, match)));
    }
    /**
     * Parse the pattern
     * @param cron The pattern to parse
     */
    static parseString(cron) {
        const parts = cron.split(' ');
        if (parts.length !== 5)
            throw new Error('Invalid Cron Provided');
        return parts.map((part, i) => Cron.parsePart(part, i));
    }
    /**
     * Parse the current part
     * @param cronPart The part of the pattern to parse
     * @param id The id that identifies the current part
     */
    static parsePart(cronPart, id) {
        if (cronPart.includes(',')) {
            const res = [];
            for (const part of cronPart.split(','))
                res.push(...Cron.parsePart(part, id));
            return [...new Set(res)].sort((a, b) => a - b);
        }
        // eslint-disable-next-line prefer-const
        const [, wild, minStr, maxStr, step] = partRegex.exec(cronPart);
        let [min, max] = [parseInt(minStr, 10), parseInt(maxStr, 10)];
        // If '*', set min and max as the minimum and maximum allowed numbers:
        if (wild)
            [min, max] = allowedNum[id];
        // Else if a number was given, but not a maximum nor a step, return it
        // as only allowed value:
        else if (!max && !step)
            return [min];
        // Set min and max as the given numbers, defaulting max to the maximum
        // allowed, so min is never bigger than max:
        // This makes min and max be, in the following cases (considering minutes):
        // -> 1-2 | 1..2
        // -> 2-1 | 1..2
        // -> 1/7 | 1, 8, 15, 22, 29, 36, 43, 50, 57
        [min, max] = [min, max || allowedNum[id][1]].sort((a, b) => a - b);
        // Generate a range
        return range(min, max, parseInt(step, 10) || 1);
    }
}

/* eslint-disable @typescript-eslint/restrict-plus-operands */
const tokens = new Map([
    ['nanosecond', 1 / 1e6],
    ['nanoseconds', 1 / 1e6],
    ['ns', 1 / 1e6],
    ['millisecond', 1],
    ['milliseconds', 1],
    ['ms', 1],
    ['second', 1000],
    ['seconds', 1000],
    ['sec', 1000],
    ['secs', 1000],
    ['s', 1000],
    ['minute', 1000 * 60],
    ['minutes', 1000 * 60],
    ['min', 1000 * 60],
    ['mins', 1000 * 60],
    ['m', 1000 * 60],
    ['hour', 1000 * 60 * 60],
    ['hours', 1000 * 60 * 60],
    ['hr', 1000 * 60 * 60],
    ['hrs', 1000 * 60 * 60],
    ['h', 1000 * 60 * 60],
    ['day', 1000 * 60 * 60 * 24],
    ['days', 1000 * 60 * 60 * 24],
    ['d', 1000 * 60 * 60 * 24],
    ['week', 1000 * 60 * 60 * 24 * 7],
    ['weeks', 1000 * 60 * 60 * 24 * 7],
    ['wk', 1000 * 60 * 60 * 24 * 7],
    ['wks', 1000 * 60 * 60 * 24 * 7],
    ['w', 1000 * 60 * 60 * 24 * 7],
    ['month', 1000 * 60 * 60 * 24 * (365.25 / 12)],
    ['months', 1000 * 60 * 60 * 24 * (365.25 / 12)],
    ['b', 1000 * 60 * 60 * 24 * (365.25 / 12)],
    ['mo', 1000 * 60 * 60 * 24 * (365.25 / 12)],
    ['year', 1000 * 60 * 60 * 24 * 365.25],
    ['years', 1000 * 60 * 60 * 24 * 365.25],
    ['yr', 1000 * 60 * 60 * 24 * 365.25],
    ['yrs', 1000 * 60 * 60 * 24 * 365.25],
    ['y', 1000 * 60 * 60 * 24 * 365.25]
]);
/**
 * Converts duration strings into ms and future dates
 */
class Duration {
    /**
     * Create a new Duration instance
     * @param pattern The string to parse
     */
    constructor(pattern) {
        /**
         * The offset
         */
        Object.defineProperty(this, "offset", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.offset = Duration.parse(pattern.toLowerCase());
    }
    /**
     * Get the date from now
     */
    get fromNow() {
        return this.dateFrom(new Date());
    }
    /**
     * Get the date from
     * @param date The Date instance to get the date from
     */
    dateFrom(date) {
        return new Date(date.getTime() + this.offset);
    }
    /**
     * Parse the pattern
     * @param pattern The pattern to parse
     */
    static parse(pattern) {
        let result = 0;
        let valid = false;
        pattern
            // ignore commas
            .replace(Duration.kCommaRegex, '')
            // a / an = 1
            .replace(Duration.kAanRegex, '1')
            // do math
            .replace(Duration.kPatternRegex, (_, i, units) => {
            const token = tokens.get(units);
            if (token !== undefined) {
                result += Number(i) * token;
                valid = true;
            }
            return '';
        });
        return valid ? result : NaN;
    }
}
/**
 * The RegExp used for the pattern parsing
 */
Object.defineProperty(Duration, "kPatternRegex", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /(-?\d*\.?\d+(?:e[-+]?\d+)?)\s*([a-zμ]*)/gi
});
/**
 * The RegExp used for removing commas
 */
Object.defineProperty(Duration, "kCommaRegex", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /,/g
});
/**
 * The RegExp used for replacing a/an with 1
 */
Object.defineProperty(Duration, "kAanRegex", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: /\ban?\b/gi
});

/**
 * The duration of each time type in milliseconds
 */
const kTimeDurations = [
    ["year" /* Year */, 31536000000],
    // 29.53059 days is the official duration of a month: https://en.wikipedia.org/wiki/Month
    ["month" /* Month */, 2628000000],
    ["week" /* Week */, 1000 * 60 * 60 * 24 * 7],
    ["day" /* Day */, 1000 * 60 * 60 * 24],
    ["hour" /* Hour */, 1000 * 60 * 60],
    ["minute" /* Minute */, 1000 * 60],
    ["second" /* Second */, 1000]
];
/**
 * Display the duration
 * @param duration The duration in milliseconds to parse and display
 * @param assets The language assets
 */
class DurationFormatter {
    constructor(units = DEFAULT_UNITS) {
        Object.defineProperty(this, "units", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: units
        });
    }
    format(duration, precision = 7) {
        const output = [];
        const negative = duration < 0;
        if (negative)
            duration *= -1;
        for (const [type, timeDuration] of kTimeDurations) {
            const substraction = duration / timeDuration;
            if (substraction < 1)
                continue;
            const floored = Math.floor(substraction);
            duration -= floored * timeDuration;
            output.push(addUnit(floored, this.units[type]));
            // If the output has enough precision, break
            if (output.length >= precision)
                break;
        }
        return `${negative ? '-' : ''}${output.join(' ') || addUnit(0, this.units.second)}`;
    }
}
/**
 * Adds an unit, if non zero
 * @param time The duration of said unit
 * @param unit The unit language assets
 */
function addUnit(time, unit) {
    if (Reflect.has(unit, time))
        return `${time} ${Reflect.get(unit, time)}`;
    return `${time} ${unit.DEFAULT}`;
}

/**
 * Manages timers so that this application can be cleanly exited
 */
class TimerManager extends null {
    /**
     * Creates a timeout gets cleared when destroyed
     * @param fn callback function
     * @param delay amount of time before running the callback
     * @param args additional arguments to pass back to the callback
     */
    static setTimeout(fn, delay, ...args) {
        const timeout = setTimeout(() => {
            this.storedTimeouts.delete(timeout);
            fn(...args);
        }, delay);
        this.storedTimeouts.add(timeout);
        return timeout;
    }
    /**
     * Clears a timeout created through this class
     * @param timeout The timeout to clear
     */
    static clearTimeout(timeout) {
        clearTimeout(timeout);
        this.storedTimeouts.delete(timeout);
    }
    /**
     * Creates an interval gets cleared when destroyed
     * @param fn callback function
     * @param delay amount of time before running the callback
     * @param args additional arguments to pass back to the callback
     */
    static setInterval(fn, delay, ...args) {
        const interval = setInterval(fn, delay, ...args);
        this.storedIntervals.add(interval);
        return interval;
    }
    /**
     * Clears an internal created through this class
     * @param interval The interval to clear
     */
    static clearInterval(interval) {
        clearInterval(interval);
        this.storedIntervals.delete(interval);
    }
    /**
     * Clears running timeouts and intervals created through this class so NodeJS can gracefully exit
     */
    static destroy() {
        for (const i of this.storedTimeouts)
            clearTimeout(i);
        for (const i of this.storedIntervals)
            clearInterval(i);
        this.storedTimeouts.clear();
        this.storedIntervals.clear();
    }
}
/**
 * A set of timeouts to clear on destroy
 */
Object.defineProperty(TimerManager, "storedTimeouts", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Set()
});
/**
 * A set of intervals to clear on destroy
 */
Object.defineProperty(TimerManager, "storedIntervals", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new Set()
});

const tokenResolvers = new Map([
    // Dates
    ['Y', (time) => String(time.getFullYear()).slice(2)],
    ['YY', (time) => String(time.getFullYear()).slice(2)],
    ['YYY', (time) => String(time.getFullYear())],
    ['YYYY', (time) => String(time.getFullYear())],
    ['Q', (time) => String((time.getMonth() + 1) / 3)],
    ['M', (time) => String(time.getMonth() + 1)],
    ['MM', (time) => String(time.getMonth() + 1).padStart(2, '0')],
    ['MMM', (time) => months[time.getMonth()]],
    ['MMMM', (time) => months[time.getMonth()]],
    ['D', (time) => String(time.getDate())],
    ['DD', (time) => String(time.getDate()).padStart(2, '0')],
    ['DDD', (time) => String(Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / 86400000 /* Day */))],
    ['DDDD', (time) => String(Math.floor((time.getTime() - new Date(time.getFullYear(), 0, 0).getTime()) / 86400000 /* Day */))],
    [
        'd',
        (time) => {
            const day = String(time.getDate());
            if (day !== '11' && day.endsWith('1'))
                return `${day}st`;
            if (day !== '12' && day.endsWith('2'))
                return `${day}nd`;
            if (day !== '13' && day.endsWith('3'))
                return `${day}rd`;
            return `${day}th`;
        }
    ],
    ['dd', (time) => days[time.getDay()].slice(0, 2)],
    ['ddd', (time) => days[time.getDay()].slice(0, 3)],
    ['dddd', (time) => days[time.getDay()]],
    ['X', (time) => String(time.valueOf() / 1000 /* Second */)],
    ['x', (time) => String(time.valueOf())],
    // Locales
    ['H', (time) => String(time.getHours())],
    ['HH', (time) => String(time.getHours()).padStart(2, '0')],
    ['h', (time) => String(time.getHours() % 12 || 12)],
    ['hh', (time) => String(time.getHours() % 12 || 12).padStart(2, '0')],
    ['a', (time) => (time.getHours() < 12 ? 'am' : 'pm')],
    ['A', (time) => (time.getHours() < 12 ? 'AM' : 'PM')],
    ['m', (time) => String(time.getMinutes())],
    ['mm', (time) => String(time.getMinutes()).padStart(2, '0')],
    ['s', (time) => String(time.getSeconds())],
    ['ss', (time) => String(time.getSeconds()).padStart(2, '0')],
    ['S', (time) => String(time.getMilliseconds())],
    ['SS', (time) => String(time.getMilliseconds()).padStart(2, '0')],
    ['SSS', (time) => String(time.getMilliseconds()).padStart(3, '0')],
    ['T', (time) => `${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`],
    [
        't',
        (time) => `${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')}:${String(time.getSeconds()).padStart(2, '0')} ${time.getHours() < 12 ? 'am' : 'pm'}`
    ],
    ['L', (time) => `${String(time.getMonth() + 1).padStart(2, '0')}/${String(time.getDate()).padStart(2, '0')}/${String(time.getFullYear())}`],
    ['l', (time) => `${String(time.getMonth() + 1)}/${String(time.getDate()).padStart(2, '0')}/${String(time.getFullYear())}`],
    ['LL', (time) => `${months[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())}`],
    ['ll', (time) => `${months[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())}`],
    [
        'LLL',
        (time) => `${months[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`
    ],
    [
        'lll',
        (time) => `${months[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`
    ],
    [
        'LLLL',
        (time) => `${days[time.getDay()]}, ${months[time.getMonth()]} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`
    ],
    [
        'llll',
        (time) => `${days[time.getDay()].slice(0, 3)} ${months[time.getMonth()].slice(0, 3)} ${String(time.getDate()).padStart(2, '0')}, ${String(time.getFullYear())} ${String(time.getHours() % 12 || 12)}:${String(time.getMinutes()).padStart(2, '0')} ${time.getHours() < 12 ? 'AM' : 'PM'}`
    ],
    [
        'Z',
        (time) => {
            const offset = time.getTimezoneOffset();
            const unsigned = offset >= 0;
            const absolute = Math.abs(offset);
            /* istanbul ignore next: whether it's signed or unsigned, depends on where the machine is, I cannot control this. */
            return `${unsigned ? '+' : '-'}${String(Math.floor(absolute / 60)).padStart(2, '0')}:${String(absolute % 60).padStart(2, '0')}`;
        }
    ],
    [
        'ZZ',
        (time) => {
            const offset = time.getTimezoneOffset();
            const unsigned = offset >= 0;
            const absolute = Math.abs(offset);
            /* istanbul ignore next: whether it's signed or unsigned, depends on where the machine is, I cannot control this. */
            return `${unsigned ? '+' : '-'}${String(Math.floor(absolute / 60)).padStart(2, '0')}:${String(absolute % 60).padStart(2, '0')}`;
        }
    ]
]);
/**
 * Timestamp class, parses the pattern once, displays the desired Date or UNIX timestamp with the selected pattern.
 */
class Timestamp {
    /**
     * Starts a new Timestamp and parses the pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     */
    constructor(pattern) {
        /**
         * The raw pattern
         * @since 1.0.0
         */
        Object.defineProperty(this, "pattern", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        /**
         * @since 1.0.0
         */
        Object.defineProperty(this, "template", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.pattern = pattern;
        this.template = Timestamp.parse(pattern);
    }
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param time The time to display
     */
    display(time = new Date()) {
        return Timestamp.display(this.template, time);
    }
    /**
     * Display the current date utc with the current pattern.
     * @since 1.0.0
     * @param time The time to display in utc
     */
    displayUTC(time) {
        return Timestamp.display(this.template, Timestamp.utc(time));
    }
    /**
     * Edits the current pattern.
     * @since 1.0.0
     * @param pattern The new pattern for this instance
     * @chainable
     */
    edit(pattern) {
        this.pattern = pattern;
        this.template = Timestamp.parse(pattern);
        return this;
    }
    /**
     * Defines the toString behavior of Timestamp.
     */
    toString() {
        return this.display();
    }
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     * @param time The time to display
     */
    static displayArbitrary(pattern, time = new Date()) {
        return Timestamp.display(Timestamp.parse(pattern), time);
    }
    /**
     * Display the current date utc with the current pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     * @param time The time to display
     */
    static displayUTCArbitrary(pattern, time = new Date()) {
        return Timestamp.display(Timestamp.parse(pattern), Timestamp.utc(time));
    }
    /**
     * Creates a UTC Date object to work with.
     * @since 1.0.0
     * @param time The date to convert to utc
     */
    static utc(time = new Date()) {
        time = Timestamp.resolveDate(time);
        return new Date(time.valueOf() + time.getTimezoneOffset() * 60000);
    }
    /**
     * Display the current date with the current pattern.
     * @since 1.0.0
     * @param template The pattern to parse
     * @param time The time to display
     */
    static display(template, time) {
        let output = '';
        const parsedTime = Timestamp.resolveDate(time);
        for (const { content, type } of template)
            output += content || tokenResolvers.get(type)(parsedTime);
        return output;
    }
    /**
     * Parses the pattern.
     * @since 1.0.0
     * @param pattern The pattern to parse
     */
    static parse(pattern) {
        const template = [];
        for (let i = 0; i < pattern.length; i++) {
            let current = '';
            const currentChar = pattern[i];
            const tokenMax = tokens$1.get(currentChar);
            if (typeof tokenMax === 'number') {
                current += currentChar;
                while (pattern[i + 1] === currentChar && current.length < tokenMax)
                    current += pattern[++i];
                template.push({ type: current, content: null });
            }
            else if (currentChar === '[') {
                while (i + 1 < pattern.length && pattern[i + 1] !== ']')
                    current += pattern[++i];
                i++;
                template.push({ type: 'literal', content: current || '[' });
            }
            else {
                current += currentChar;
                while (i + 1 < pattern.length && !tokens$1.has(pattern[i + 1]) && pattern[i + 1] !== '[')
                    current += pattern[++i];
                template.push({ type: 'literal', content: current });
            }
        }
        return template;
    }
    /**
     * Resolves a date.
     * @since 1.0.0
     * @param time The time to parse
     */
    static resolveDate(time) {
        return time instanceof Date ? time : new Date(time);
    }
}

export { Cron, Duration, DurationFormatter, Time, TimeTypes, TimerManager, Timestamp };
//# sourceMappingURL=index.mjs.map
