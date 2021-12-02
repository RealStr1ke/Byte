import { TimeTypes } from './constants';
/**
 * Display the duration
 * @param duration The duration in milliseconds to parse and display
 * @param assets The language assets
 */
export declare class DurationFormatter {
    units: DurationFormatAssetsTime;
    constructor(units?: DurationFormatAssetsTime);
    format(duration: number, precision?: number): string;
}
export interface DurationFormatAssetsUnit extends Record<number, string> {
    DEFAULT: string;
}
export interface DurationFormatAssetsTime {
    [TimeTypes.Second]: DurationFormatAssetsUnit;
    [TimeTypes.Minute]: DurationFormatAssetsUnit;
    [TimeTypes.Hour]: DurationFormatAssetsUnit;
    [TimeTypes.Day]: DurationFormatAssetsUnit;
    [TimeTypes.Week]: DurationFormatAssetsUnit;
    [TimeTypes.Month]: DurationFormatAssetsUnit;
    [TimeTypes.Year]: DurationFormatAssetsUnit;
}
//# sourceMappingURL=DurationFormatter.d.ts.map