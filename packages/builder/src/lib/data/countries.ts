// Country data helpers and a default list of countries with dialing codes.
// Names are resolved at runtime using Intl.DisplayNames for better i18n.

export interface Country {
  code: string; // ISO 3166-1 alpha-2, uppercase
  name: string; // Localized English display name
  dialCode: string; // E.164 calling code, no leading '+' (e.g., '1', '44')
  flag: string; // Emoji flag
}

/** Returns the emoji flag for a given ISO 3166-1 alpha-2 code. */
export function flagEmoji(iso2: string): string {
  if (!iso2 || iso2.length !== 2) return '🏳️';
  const cc = iso2.toUpperCase();
  const A = 0x1f1e6; // Regional Indicator Symbol Letter A
  const codePoint = (c: string) => A + (c.charCodeAt(0) - 65);
  return String.fromCodePoint(codePoint(cc[0]), codePoint(cc[1]));
}

/** Returns the display name (English) for a region code. Falls back to the code. */
export function regionName(iso2: string): string {
  try {
    // Prefer English names; consumers may later provide custom labels if needed.
    const dn = new Intl.DisplayNames(['en'], { type: 'region' });
    return (dn.of(iso2) as string) || iso2;
  } catch {
    return iso2;
  }
}

// Minimal, curated dialing codes list. This can be extended safely.
// Note: Some calling codes are shared by multiple countries (e.g., +1 for NANP).
// Where shared, each country is listed separately with the same dialCode.
// Source: ITU-T E.164 country codes (simplified). This list intentionally covers
// most common countries and can be expanded incrementally.
const DIAL_CODES: Record<string, string> = {
  // North America (NANP)
  US: '1',
  CA: '1',
  PR: '1',
  VI: '1',
  GU: '1',
  MP: '1',
  AS: '1',
  // Caribbean (subset)
  AG: '1',
  AI: '1',
  BB: '1',
  BM: '1',
  BS: '1',
  DM: '1',
  DO: '1',
  GD: '1',
  JM: '1',
  KN: '1',
  KY: '1',
  LC: '1',
  MS: '1',
  SX: '1',
  TC: '1',
  TT: '1',
  VC: '1',
  VG: '1',
  // Europe
  GB: '44',
  IE: '353',
  FR: '33',
  DE: '49',
  ES: '34',
  IT: '39',
  NL: '31',
  BE: '32',
  CH: '41',
  AT: '43',
  PT: '351',
  GR: '30',
  NO: '47',
  SE: '46',
  DK: '45',
  FI: '358',
  IS: '354',
  PL: '48',
  CZ: '420',
  SK: '421',
  HU: '36',
  RO: '40',
  BG: '359',
  HR: '385',
  SI: '386',
  RS: '381',
  BA: '387',
  MK: '389',
  AL: '355',
  MT: '356',
  CY: '357',
  EE: '372',
  LV: '371',
  LT: '370',
  LU: '352',
  LI: '423',
  MC: '377',
  SM: '378',
  AD: '376',
  GI: '350',
  VA: '379',
  UA: '380',
  BY: '375',
  MD: '373',
  AM: '374',
  GE: '995',
  AZ: '994',
  TR: '90',
  // CIS / Eurasia
  RU: '7',
  KZ: '7',
  KG: '996',
  TJ: '992',
  TM: '993',
  UZ: '998',
  // Middle East
  IL: '972',
  JO: '962',
  LB: '961',
  PS: '970',
  SY: '963',
  IQ: '964',
  SA: '966',
  AE: '971',
  QA: '974',
  BH: '973',
  KW: '965',
  OM: '968',
  YE: '967',
  IR: '98',
  // Africa (subset, broad coverage)
  EG: '20',
  DZ: '213',
  MA: '212',
  TN: '216',
  LY: '218',
  SD: '249',
  SS: '211',
  ET: '251',
  ER: '291',
  SO: '252',
  DJ: '253',
  KE: '254',
  TZ: '255',
  UG: '256',
  RW: '250',
  BI: '257',
  CM: '237',
  NG: '234',
  GH: '233',
  CI: '225',
  SN: '221',
  GM: '220',
  SL: '232',
  LR: '231',
  GN: '224',
  GQ: '240',
  GA: '241',
  CG: '242',
  CD: '243',
  AO: '244',
  ZM: '260',
  ZW: '263',
  MW: '265',
  MZ: '258',
  BW: '267',
  NA: '264',
  ZA: '27',
  SZ: '268',
  LS: '266',
  BF: '226',
  NE: '227',
  TG: '228',
  BJ: '229',
  ML: '223',
  MR: '222',
  // Asia
  CN: '86',
  HK: '852',
  MO: '853',
  TW: '886',
  JP: '81',
  KR: '82',
  IN: '91',
  PK: '92',
  BD: '880',
  LK: '94',
  NP: '977',
  BT: '975',
  MV: '960',
  SG: '65',
  MY: '60',
  TH: '66',
  VN: '84',
  KH: '855',
  LA: '856',
  PH: '63',
  ID: '62',
  BN: '673',
  MM: '95',
  TL: '670',
  MN: '976',
  // Oceania
  AU: '61',
  NZ: '64',
  FJ: '679',
  PG: '675',
  SB: '677',
  VU: '678',
  WS: '685',
  TO: '676',
  KI: '686',
  TV: '688',
  NR: '674',
  FM: '691',
  MH: '692',
  PW: '680',
  NC: '687',
  PF: '689',
  // Latin America
  MX: '52',
  GT: '502',
  SV: '503',
  HN: '504',
  NI: '505',
  CR: '506',
  PA: '507',
  BZ: '501',
  CU: '53',
  DO2: '1',
  HT: '509',
  AR: '54',
  BR: '55',
  CL: '56',
  CO: '57',
  VE: '58',
  BO: '591',
  UY: '598',
  PY: '595',
  PE: '51',
  EC: '593',
  GY: '592',
  SR: '597',
  // MENA / North Africa additionals
  QA2: '974',
  AE2: '971',
  // Others
  TR2: '90',
  UA2: '380',
  SA2: '966',
};

// Build countries array from DIAL_CODES, resolving names and flags at runtime.
export const countries: Country[] = Object.keys(DIAL_CODES)
  // Filter out any placeholders ending with digits (e.g., DO2) if mistakenly added.
  .filter((k) => /^[A-Z]{2}$/.test(k))
  .map((code) => ({
    code,
    dialCode: DIAL_CODES[code],
    name: regionName(code),
    flag: flagEmoji(code),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Lookup helpers */
export function getCountryByCode(code?: string): Country | undefined {
  if (!code) return undefined;
  const up = code.toUpperCase();
  return countries.find((c) => c.code === up);
}

export function getCountriesByDial(dial: string): Country[] {
  return countries.filter((c) => c.dialCode === dial.replace(/^\+/, ''));
}

export function getDialByCode(code?: string): string | undefined {
  return getCountryByCode(code)?.dialCode;
}

/** Detect the best matching country from a phone string by dialing code (longest prefix). */
export function detectCountryFromPhone(phone?: string): Country | undefined {
  if (!phone) return undefined;
  const digits = phone.replace(/[^\d+]/g, '');
  const raw = digits.replace(/^\+/, '');
  // Sort unique dial codes by length desc to prefer the longest match
  const dials = Array.from(new Set(countries.map((c) => c.dialCode))).sort(
    (a, b) => b.length - a.length,
  );
  const match = dials.find((d) => raw.startsWith(d));
  if (!match) return undefined;
  // If multiple countries share the same code, pick the first alphabetically
  const list = getCountriesByDial(match);
  return list.sort((a, b) => a.name.localeCompare(b.name))[0];
}
