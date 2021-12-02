export declare type Primitive = string | number | boolean | bigint | symbol | undefined | null;
export declare type Builtin = Primitive | Function | Date | Error | RegExp;
export declare type DeepRequired<T> = T extends Builtin ? NonNullable<T> : T extends Map<infer K, infer V> ? Map<DeepRequired<K>, DeepRequired<V>> : T extends ReadonlyMap<infer K, infer V> ? ReadonlyMap<DeepRequired<K>, DeepRequired<V>> : T extends WeakMap<infer K, infer V> ? WeakMap<DeepRequired<K>, DeepRequired<V>> : T extends Set<infer U> ? Set<DeepRequired<U>> : T extends ReadonlySet<infer U> ? ReadonlySet<DeepRequired<U>> : T extends WeakSet<infer U> ? WeakSet<DeepRequired<U>> : T extends Promise<infer U> ? Promise<DeepRequired<U>> : T extends {} ? {
    [K in keyof T]-?: DeepRequired<T[K]>;
} : NonNullable<T>;
export declare type RequiredExcept<T, K extends keyof T> = Partial<Pick<T, K>> & Required<Omit<T, K>>;
export declare type PartialRequired<T, K extends keyof T> = Partial<Omit<T, K>> & Required<Pick<T, K>>;
export declare type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends Array<infer U> ? Array<DeepPartial<U>> : T[P] extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : DeepPartial<T[P]>;
};
export declare type ArgumentTypes<F extends (...args: any[]) => unknown> = F extends (...args: infer A) => any ? A : never;
/**
 * A readonly array of any values.
 * @private
 */
export declare type Arr = readonly any[];
/**
 * A generic constructor with parameters
 */
export declare type Ctor<A extends Arr = readonly any[], R = any> = new (...args: A) => R;
/**
 * A generic abstract constructor with parameters
 */
export declare type AbstractCtor<A extends Arr = readonly any[], R = any> = abstract new (...args: A) => R;
/**
 * A generic constructor without parameters
 */
export declare type Constructor<T> = new (...args: any[]) => T;
/**
 * A generic abstract constructor without parameters
 */
export declare type AbstractConstructor<T> = abstract new (...args: any[]) => T;
/**
 * Gets the first argument of any given function
 */
export declare type FirstArgument<T> = T extends (arg1: infer U, ...args: unknown[]) => unknown ? U : unknown;
/**
 * Gets the second argument of any given function
 */
export declare type SecondArgument<T> = T extends (arg1: unknown, arg2: infer U, ...args: unknown[]) => unknown ? U : unknown;
/**
 * ReturnType for a function that can return either a value or a `Promise` with that value
 */
export declare type Awaitable<T> = PromiseLike<T> | T;
/**
 * Type union for the full 2 billion dollar mistake in the JavaScript ecosystem
 */
export declare type Nullish = null | undefined;
/**
 * Similar to the built in {@link NonNullable}, but properly removes `null` from all keys in the class or interface
 * This does not recurse deeply, for that use {@link DeepRequired}
 */
export declare type NonNullableProperties<T = unknown> = {
    [P in keyof T]: NonNullable<T[P]>;
};
/**
 * An object that is non nullable, to bypass TypeScript not easily working with {@link Record}<{@link PropertyKey}, unknown> in various instances.
 */
export interface NonNullObject {
}
/**
 * Gets all the keys (as a string union) from a type `T` that match value `V`
 * @example
 * ```typescript
 * interface Sample {
 * 	id: string;
 * 	name: string | null;
 * 	middleName?: string;
 * 	lastName: string;
 * 	hobbies: readonly string[];
 * }
 *
 * type BB = PickByValue<Sample, string>;
 * // Expected:
 * // "id" | "lastName"
 * ```
 */
export declare type PickByValue<T, V> = {
    [P in keyof T]: T[P] extends V ? P : never;
}[keyof T] & keyof T;
/**
 * Transforms a `readonly` type to be mutable
 * @example
 * ```typescript
 * interface Sample {
 * 	id: string;
 * 	hobbies: readonly string[];
 * }
 *
 * type BB = Mutable<Sample>;
 * // Expected:
 * // {
 * //    id: string;
 * //    hobbies: string[];
 * // }
 * ```
 */
export declare type Mutable<T> = {
    -readonly [P in keyof T]: T[P] extends Array<unknown> | NonNullObject ? Mutable<T[P]> : T[P];
};
/**
 * Transforms every key in an object to be strictly required, essentially removing `undefined` and `null` from the type.
 * @example
 * ```typescript
 * interface Sample {
 * 	id: string;
 * 	name: string | null;
 * 	middleName?: string;
 * }
 *
 * type BB = StrictRequired<Sample>;
 * // Expected:
 * // {
 * //    id: string;
 * //    name: string;
 * //    middleName: string;
 * // }
 * ```
 */
export declare type StrictRequired<T> = {
    [P in keyof T]-?: NonNullable<T[P]>;
};
/**
 * Gets a union type of all the keys that are in an array.
 * @example
 * ```typescript
 * const sample = [1, 2, '3', true];
 *
 * type arrayUnion = ArrayElementType<typeof sample>;
 * // Expected: string | number | boolean
 * ```
 */
export declare type ArrayElementType<T> = T extends (infer K)[] ? K : T extends readonly (infer RK)[] ? RK : T;
//# sourceMappingURL=utilityTypes.d.ts.map