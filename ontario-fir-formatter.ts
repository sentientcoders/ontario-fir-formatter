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

// Top-level Schedule definitions
const SCHEDULE_MAP: Record<string, string> = {
  '10': 'General Revenue Fund',
  '12': 'Current Revenue and Expenditures',
  '40': 'Consolidated Statement of Operations',
  '51': 'Schedule of Capital Operations',
  '53': 'Water and Wastewater Expenditures',
  '70': 'Consolidated Financial Position',
  '74': 'Long Term Liabilities and Commitments',
  '80': 'Statistical Information',
};

// Common line item mappings for Schedule 40 (Operations)
const SCH_40_LINE_MAP: Record<string, string> = {
  '0299': 'Total Property Taxation',
  '0899': 'Total User Fees and Service Charges',
  '0999': 'Total Revenues',
  '1199': 'Total Police Services',
  '1299': 'Total Fire Services',
  '3199': 'Total Transportation Services',
  '3299': 'Total Environmental Services',
  '9910': 'Annual Surplus / Deficit',
};

/**
 * Parses a raw FIR SLC string (e.g., "40029901" or "40 0299 01") into its atomic components.
 */
export function parseSLC(rawSlc: string): ParsedSLC {
  // Strip all non-numeric characters (handles spaces, dashes, etc.)
  const cleanStr = rawSlc.replace(/\D/g, '');
  
  if (cleanStr.length < 8) {
    throw new Error(`Invalid SLC format: ${rawSlc}. Expected at least 8 digits.`);
  }

  const schedule = cleanStr.substring(0, 2);
  const line = cleanStr.substring(2, 6);
  const column = cleanStr.substring(6, 8);

  return {
    schedule,
    line,
    column,
    normalizedCode: `${schedule}${line}${column}`,
    isConsolidated: schedule === '40' || schedule === '70',
  };
}

/**
 * Decodes the parsed SLC components into human-readable accounting categories.
 */
export function decodeCategory(schedule: string, line: string): FIRCategory {
  const scheduleName = SCHEDULE_MAP[schedule] || 'Uncategorized Schedule';
  
  let lineDescription = null;
  if (schedule === '40') {
    lineDescription = SCH_40_LINE_MAP[line] || 'Other Operations';
  }

  return { scheduleName, lineDescription };
}

/**
 * Safely formats raw FIR integer values into standard CAD currency strings.
 */
export function formatFirCurrency(value: number | string): string {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numValue)) return '$0';
  
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0, 
  }).format(numValue);
}
