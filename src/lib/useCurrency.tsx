'use client';

/**
 * Currency context and hook for managing user's currency preference
 * License: MIT (project code)
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  Country,
  SUPPORTED_COUNTRIES,
  getSavedCountry,
  saveCountry,
  getCountryByCode,
  convertAndFormatPrice,
} from './currency';

interface CurrencyContextType {
  country: Country;
  setCountry: (countryCode: string) => void;
  formatPrice: (priceUSD: number) => string;
  isLoading: boolean;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [country, setCountryState] = useState<Country>(SUPPORTED_COUNTRIES[0]);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved country preference on mount
  useEffect(() => {
    const savedCountry = getSavedCountry();
    setCountryState(savedCountry);
    setIsLoading(false);
  }, []);

  const setCountry = (countryCode: string) => {
    const newCountry = getCountryByCode(countryCode);
    setCountryState(newCountry);
    saveCountry(countryCode);
  };

  const formatPrice = (priceUSD: number): string => {
    return convertAndFormatPrice(priceUSD, country);
  };

  return (
    <CurrencyContext.Provider value={{ country, setCountry, formatPrice, isLoading }}>
      {children}
    </CurrencyContext.Provider>
  );
}

/**
 * Hook to access currency context
 * @returns Currency context with country, setCountry, and formatPrice
 * @throws Error if used outside CurrencyProvider
 */
export function useCurrency(): CurrencyContextType {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
