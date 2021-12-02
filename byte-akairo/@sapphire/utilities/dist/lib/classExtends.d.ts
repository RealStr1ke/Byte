import type { Ctor } from './utilityTypes';
/**
 * Checks whether or not the value class extends the base class.
 * @param value The constructor to be checked against.
 * @param base The base constructor.
 */
export declare function classExtends<T extends Ctor>(value: Ctor, base: T): value is T;
//# sourceMappingURL=classExtends.d.ts.map