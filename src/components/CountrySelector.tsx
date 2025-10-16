'use client';

/**
 * Country/Currency selector component
 * Allows users to change their currency preference
 * License: MIT (project code)
 */

import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCurrency } from '@/lib/useCurrency';
import { SUPPORTED_COUNTRIES } from '@/lib/currency';

export default function CountrySelector() {
  const { country, setCountry, isLoading } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 px-3 py-2 bg-white/80 rounded-lg animate-pulse">
        <Globe className="h-4 w-4 text-gray-400" />
        <span className="text-sm text-gray-400">...</span>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white/80 hover:bg-white backdrop-blur-lg rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md"
        aria-label="Select country and currency"
      >
        <Globe className="h-4 w-4 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">{country.flag}</span>
        <span className="text-sm text-gray-600">{country.currency}</span>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100">
                <h3 className="text-sm font-semibold text-gray-900">Select Your Country</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Prices will be shown in your local currency
                </p>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {SUPPORTED_COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      setCountry(c.code);
                      setIsOpen(false);
                    }}
                    className={`w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-150 ${
                      country.code === c.code ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{c.flag}</span>
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">{c.name}</div>
                        <div className="text-xs text-gray-500">
                          {c.currency} ({c.currencySymbol})
                        </div>
                      </div>
                    </div>
                    {country.code === c.code && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-3 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Exchange rates are updated daily
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
