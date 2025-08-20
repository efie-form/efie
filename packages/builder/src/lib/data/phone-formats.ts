// Phone number formatting presets by ISO 3166-1 alpha-2 country code.
// Each entry defines grouping sizes for the national significant number (rest of digits after dial code).
// These are pragmatic defaults aimed at readable grouping, not full national plan correctness.

export interface PhoneFormat {
  groups: number[]; // e.g., [3, 3, 4] => 3-3-4
}

// Common presets; extend as needed.
export const PHONE_FORMATS: Record<string, PhoneFormat> = {
  // NANP
  US: { groups: [3, 3, 4] },
  CA: { groups: [3, 3, 4] },
  PR: { groups: [3, 3, 4] },
  VI: { groups: [3, 3, 4] },
  GU: { groups: [3, 3, 4] },
  MP: { groups: [3, 3, 4] },
  AS: { groups: [3, 3, 4] },
  AG: { groups: [3, 3, 4] },
  AI: { groups: [3, 3, 4] },
  BB: { groups: [3, 3, 4] },
  BM: { groups: [3, 3, 4] },
  BS: { groups: [3, 3, 4] },
  DM: { groups: [3, 3, 4] },
  DO: { groups: [3, 3, 4] },
  GD: { groups: [3, 3, 4] },
  JM: { groups: [3, 3, 4] },
  KN: { groups: [3, 3, 4] },
  KY: { groups: [3, 3, 4] },
  LC: { groups: [3, 3, 4] },
  MS: { groups: [3, 3, 4] },
  SX: { groups: [3, 3, 4] },
  TC: { groups: [3, 3, 4] },
  TT: { groups: [3, 3, 4] },
  VC: { groups: [3, 3, 4] },
  VG: { groups: [3, 3, 4] },

  // Europe (simplified)
  GB: { groups: [4, 3, 4] }, // varies; common readable grouping
  IE: { groups: [3, 3, 4] },
  FR: { groups: [1, 2, 2, 2, 2] },
  DE: { groups: [3, 3, 4] },
  ES: { groups: [3, 3, 3] },
  IT: { groups: [3, 3, 4] },
  NL: { groups: [3, 3, 4] },
  BE: { groups: [3, 2, 3, 2] },
  CH: { groups: [2, 3, 2, 2] },
  AT: { groups: [3, 3, 4] },
  PT: { groups: [3, 3, 3] },
  GR: { groups: [3, 3, 4] },
  NO: { groups: [3, 2, 3] },
  SE: { groups: [3, 3, 4] },
  DK: { groups: [2, 2, 2, 2] },
  FI: { groups: [3, 3, 4] },
  IS: { groups: [3, 3, 2] },
  PL: { groups: [3, 3, 3] },
  CZ: { groups: [3, 3, 3] },
  SK: { groups: [3, 3, 3] },
  HU: { groups: [3, 3, 4] },
  RO: { groups: [3, 3, 4] },
  BG: { groups: [3, 3, 4] },
  HR: { groups: [3, 3, 3] },
  SI: { groups: [3, 3, 3] },
  RS: { groups: [3, 3, 4] },
  BA: { groups: [3, 3, 3] },
  MK: { groups: [3, 3, 3] },
  AL: { groups: [3, 3, 4] },
  MT: { groups: [3, 3, 2] },
  CY: { groups: [2, 3, 3] },
  EE: { groups: [2, 3, 3] },
  LV: { groups: [2, 3, 3] },
  LT: { groups: [3, 3, 2] },
  LU: { groups: [2, 3, 3] },
  LI: { groups: [3, 3, 2] },

  UA: { groups: [2, 3, 2, 2] },
  BY: { groups: [2, 3, 2, 2] },
  MD: { groups: [3, 3, 3] },
  AM: { groups: [2, 3, 3] },
  GE: { groups: [3, 2, 2, 2] },
  AZ: { groups: [2, 3, 2, 2] },
  TR: { groups: [3, 3, 4] },

  // Middle East / North Africa (simplified)
  IL: { groups: [2, 3, 4] },
  JO: { groups: [2, 3, 4] },
  LB: { groups: [2, 3, 3] },
  PS: { groups: [2, 3, 4] },
  SY: { groups: [2, 3, 4] },
  IQ: { groups: [3, 3, 4] },
  SA: { groups: [3, 3, 4] },
  AE: { groups: [3, 3, 3] },
  QA: { groups: [4, 4] },
  BH: { groups: [4, 4] },
  KW: { groups: [4, 3, 3] },
  OM: { groups: [3, 4, 4] },
  YE: { groups: [3, 3, 4] },
  IR: { groups: [3, 3, 4] },

  // Africa (simplified)
  EG: { groups: [3, 3, 4] },
  DZ: { groups: [3, 3, 4] },
  MA: { groups: [3, 3, 4] },
  TN: { groups: [3, 3, 2] },
  LY: { groups: [3, 3, 3] },
  SD: { groups: [2, 3, 4] },
  SS: { groups: [2, 3, 4] },
  ET: { groups: [2, 3, 4] },
  ER: { groups: [2, 3, 3] },
  SO: { groups: [2, 3, 4] },
  DJ: { groups: [2, 2, 2, 2] },
  KE: { groups: [3, 3, 3] },
  TZ: { groups: [3, 3, 3] },
  UG: { groups: [3, 3, 3] },
  RW: { groups: [3, 3, 3] },
  BI: { groups: [3, 3, 3] },
  CM: { groups: [3, 3, 3] },
  NG: { groups: [3, 3, 4] },
  GH: { groups: [3, 3, 3] },
  CI: { groups: [2, 2, 2, 2] },
  SN: { groups: [3, 3, 2] },
  GM: { groups: [3, 3, 2] },
  SL: { groups: [3, 3, 2] },
  LR: { groups: [3, 3, 2] },
  GN: { groups: [3, 3, 2] },
  GQ: { groups: [3, 3, 3] },
  GA: { groups: [3, 3, 2] },
  CG: { groups: [3, 3, 2] },
  CD: { groups: [3, 3, 3, 2] },
  AO: { groups: [3, 3, 3] },
  ZM: { groups: [3, 3, 3] },
  ZW: { groups: [3, 3, 3] },
  MW: { groups: [3, 3, 3] },
  MZ: { groups: [3, 3, 3] },
  BW: { groups: [3, 3, 3] },
  NA: { groups: [3, 3, 3] },
  ZA: { groups: [3, 3, 4] },
  SZ: { groups: [3, 3, 2] },
  LS: { groups: [3, 3, 2] },
  BF: { groups: [2, 2, 2, 2] },
  NE: { groups: [2, 2, 2, 2] },
  TG: { groups: [2, 2, 2, 2] },
  BJ: { groups: [2, 2, 2, 2] },
  ML: { groups: [2, 2, 2, 2] },
  MR: { groups: [2, 2, 2, 2] },

  // Asia-Pacific (simplified)
  CN: { groups: [3, 4, 4] },
  HK: { groups: [4, 4] },
  MO: { groups: [4, 4] },
  TW: { groups: [3, 3, 4] },
  JP: { groups: [3, 4, 4] },
  KR: { groups: [3, 4, 4] },
  SG: { groups: [4, 4] },
  MY: { groups: [3, 3, 4] },
  TH: { groups: [3, 3, 4] },
  VN: { groups: [3, 3, 4] },
  KH: { groups: [3, 3, 3] },
  LA: { groups: [2, 3, 3] },
  PH: { groups: [3, 3, 4] },
  ID: { groups: [3, 3, 4] },
  BN: { groups: [3, 3, 4] },
  MM: { groups: [3, 3, 3] },
  TL: { groups: [3, 3, 3] },
  MN: { groups: [3, 3, 4] },
  IN: { groups: [5, 5] }, // common mobile 10 digits => 5-5
  PK: { groups: [3, 3, 4] },
  BD: { groups: [3, 4, 4] },
  LK: { groups: [2, 3, 4] },
  NP: { groups: [2, 3, 4] },
  BT: { groups: [2, 3, 3] },
  MV: { groups: [3, 3, 3] },

  // Oceania
  AU: { groups: [1, 4, 4] },
  NZ: { groups: [2, 3, 4] },
  FJ: { groups: [3, 3, 2] },
  PG: { groups: [3, 2, 3] },
  SB: { groups: [3, 3, 2] },
  VU: { groups: [3, 3, 1] },
  WS: { groups: [2, 3, 2] },
  TO: { groups: [2, 3, 2] },
  KI: { groups: [2, 3, 2] },
  TV: { groups: [2, 3, 2] },
  NR: { groups: [2, 3, 2] },
  FM: { groups: [3, 3, 1] },
  MH: { groups: [2, 3, 2] },
  PW: { groups: [3, 3, 1] },

  // Americas
  MX: { groups: [3, 3, 4] },
  BR: { groups: [2, 5, 4] },
  AR: { groups: [3, 4, 4] },
  CL: { groups: [1, 4, 4] },
  CO: { groups: [3, 3, 4] },
  VE: { groups: [3, 3, 4] },
  BO: { groups: [3, 3, 3] },
  UY: { groups: [4, 4] },
  PY: { groups: [3, 3, 4] },
  PE: { groups: [3, 3, 3] },
  EC: { groups: [2, 3, 4] },
  GY: { groups: [3, 3, 1] },
  SR: { groups: [3, 3, 1] },
  CR: { groups: [4, 4] },
  GT: { groups: [4, 4] },
  SV: { groups: [4, 4] },
  HN: { groups: [4, 4] },
  NI: { groups: [4, 4] },
  PA: { groups: [3, 4] },
  BZ: { groups: [3, 4] },
  CU: { groups: [3, 4] },
  HT: { groups: [3, 2, 3] },
};

export function getPhoneFormatForCountry(iso2?: string): PhoneFormat | undefined {
  if (!iso2) return undefined;
  return PHONE_FORMATS[iso2.toUpperCase()];
}

export function applyGrouping(rest: string, groups: number[]): string {
  const parts: string[] = [];
  let idx = 0;
  for (const g of groups) {
    if (idx >= rest.length) break;
    parts.push(rest.slice(idx, idx + g));
    idx += g;
  }
  if (idx < rest.length) {
    // append remaining digits in chunks of 3
    for (; idx < rest.length; idx += 3) parts.push(rest.slice(idx, idx + 3));
  }
  return parts.filter(Boolean).join(' ');
}
