/**
 * Currency conversion utilities for PetUniverse
 *
 * Supports multi-currency pricing based on user's country
 * Base currency: USD
 * License: MIT (project code)
 */

export interface Country {
  code: string;
  name: string;
  currency: string;
  currencySymbol: string;
  locale: string;
  flag: string;
}

// Supported countries with their currency information
export const SUPPORTED_COUNTRIES: Country[] = [
  {
    code: 'US',
    name: 'United States',
    currency: 'USD',
    currencySymbol: '$',
    locale: 'en-US',
    flag: '🇺🇸',
  },
  {
    code: 'IN',
    name: 'India',
    currency: 'INR',
    currencySymbol: '₹',
    locale: 'en-IN',
    flag: '🇮🇳',
  },
  {
    code: 'GB',
    name: 'United Kingdom',
    currency: 'GBP',
    currencySymbol: '£',
    locale: 'en-GB',
    flag: '🇬🇧',
  },
  {
    code: 'EU',
    name: 'European Union',
    currency: 'EUR',
    currencySymbol: '€',
    locale: 'en-EU',
    flag: '🇪🇺',
  },
  {
    code: 'CA',
    name: 'Canada',
    currency: 'CAD',
    currencySymbol: 'C$',
    locale: 'en-CA',
    flag: '🇨🇦',
  },
  {
    code: 'AU',
    name: 'Australia',
    currency: 'AUD',
    currencySymbol: 'A$',
    locale: 'en-AU',
    flag: '🇦🇺',
  },
  {
    code: 'AE',
    name: 'United Arab Emirates',
    currency: 'AED',
    currencySymbol: 'د.إ',
    locale: 'ar-AE',
    flag: '🇦🇪',
  },
];

// Exchange rates relative to USD (base currency)
// In production, these should come from a real-time API
export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1,
  INR: 83.12,
  GBP: 0.79,
  EUR: 0.92,
  CAD: 1.36,
  AUD: 1.52,
  AED: 3.67,
};

/**
 * Convert price from USD to target currency
 * @param priceUSD - Price in USD
 * @param targetCurrency - Target currency code
 * @returns Converted price
 */
export function convertPrice(priceUSD: number, targetCurrency: string): number {
  const rate = EXCHANGE_RATES[targetCurrency] || 1;
  return priceUSD * rate;
}

/**
 * Format price with currency symbol and locale
 * @param price - Price amount
 * @param country - Country object
 * @returns Formatted price string
 */
export function formatPrice(price: number, country: Country): string {
  try {
    // Use Intl.NumberFormat for proper locale formatting
    const formatter = new Intl.NumberFormat(country.locale, {
      style: 'currency',
      currency: country.currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });
    return formatter.format(price);
  } catch (error) {
    // Fallback to simple formatting if Intl fails
    console.error('Error formatting price:', error);
    return `${country.currencySymbol}${price.toFixed(2)}`;
  }
}

/**
 * Convert and format price in one function
 * @param priceUSD - Price in USD
 * @param country - Country object
 * @returns Formatted price in target currency
 */
export function convertAndFormatPrice(priceUSD: number, country: Country): string {
  const convertedPrice = convertPrice(priceUSD, country.currency);
  return formatPrice(convertedPrice, country);
}

/**
 * Detect user's country from browser locale
 * @returns Country code (2-letter) or 'US' as default
 */
export function detectCountryFromLocale(): string {
  if (typeof window === 'undefined') return 'US';

  try {
    // Try to get country from navigator.language (e.g., 'en-US', 'en-GB')
    const locale = navigator.language || 'en-US';
    const countryCode = locale.split('-')[1] || 'US';

    // Check if detected country is supported
    const isSupported = SUPPORTED_COUNTRIES.some(c => c.code === countryCode);
    return isSupported ? countryCode : 'US';
  } catch (error) {
    console.error('Error detecting country:', error);
    return 'US';
  }
}

/**
 * Get country object by country code
 * @param countryCode - 2-letter country code
 * @returns Country object or US as default
 */
export function getCountryByCode(countryCode: string): Country {
  return (
    SUPPORTED_COUNTRIES.find(c => c.code === countryCode) ||
    SUPPORTED_COUNTRIES[0] // Default to US
  );
}

/**
 * Get saved country preference from localStorage
 * @returns Country object
 */
export function getSavedCountry(): Country {
  if (typeof window === 'undefined') return SUPPORTED_COUNTRIES[0];

  try {
    const saved = localStorage.getItem('selectedCountry');
    if (saved) {
      const countryCode = JSON.parse(saved);
      return getCountryByCode(countryCode);
    }
  } catch (error) {
    console.error('Error reading saved country:', error);
  }

  // Auto-detect on first visit
  const detectedCode = detectCountryFromLocale();
  return getCountryByCode(detectedCode);
}

/**
 * Save country preference to localStorage
 * @param countryCode - 2-letter country code
 */
export function saveCountry(countryCode: string): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('selectedCountry', JSON.stringify(countryCode));
  } catch (error) {
    console.error('Error saving country:', error);
  }
}
