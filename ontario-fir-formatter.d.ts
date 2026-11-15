/**
 * ontario-fir-formatter
 * A zero-dependency TypeScript utility for parsing and decoding
 * Ontario Financial Information Return (FIR) SLC (Schedule, Line, Column) codes.
 *
 * Maintained by Sentient Coders (https://taxwatchdog.ca)
 */
export interface ParsedSLC {
    schedule: string;
    line: string;
    column: string;
    normalizedCode: string;
    isConsolidated: boolean;
}
export interface FIRCategory {
    scheduleName: string;
    lineDescription: string | null;
}
/**
 * Parses a raw FIR SLC string (e.g., "40029901" or "40 0299 01") into its atomic components.
 */
export declare function parseSLC(rawSlc: string): ParsedSLC;
/**
 * Decodes the parsed SLC components into human-readable accounting categories.
 */
export declare function decodeCategory(schedule: string, line: string): FIRCategory;
/**
 * Safely formats raw FIR integer values into standard CAD currency strings.
 */
export declare function formatFirCurrency(value: number | string): string;
