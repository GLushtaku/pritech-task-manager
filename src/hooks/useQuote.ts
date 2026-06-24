import { useState, useCallback } from 'react';
import { API } from '../constants';

interface Quote {
  q: string;
  a: string;
}

interface UseQuoteReturn {
  quote: Quote | null;
  isLoading: boolean;
  error: string;
  fetchQuote: () => Promise<void>;
}

/**
 * Custom hook that handles fetching a random quote
 * from the configured public API.
 * Encapsulates all fetch logic, loading, and error state.
 */
const useQuote = (): UseQuoteReturn => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch(API.quotesUrl);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setQuote({ q: data.quote, a: data.author });
    } catch (err) {
      setError('Could not load quote. Please check your connection.');
      console.error('[useQuote] Fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { quote, isLoading, error, fetchQuote };
};

export default useQuote;