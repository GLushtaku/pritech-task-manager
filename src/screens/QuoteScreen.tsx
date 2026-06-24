import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  LINE_HEIGHTS,
} from '../constants';

interface Quote {
  q: string;
  a: string;
}

/**
 * Fetches and displays a random motivational quote
 * from the ZenQuotes public API.
 * Satisfies the task requirement of using a public API.
 */
const QuoteScreen: React.FC = () => {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = useCallback(async () => {
    try {
      setIsLoading(true);
      setError('');

      const response = await fetch('https://zenquotes.io/api/random');

      if (!response.ok) {
        throw new Error('Failed to fetch quote');
      }

      const data: Quote[] = await response.json();
      setQuote(data[0]);
    } catch (err) {
      setError('Could not load quote. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Quote</Text>
        <Text style={styles.headerSubtitle}>
          Stay motivated and focused 💡
        </Text>
      </View>

      {/* Quote card */}
      <View style={styles.card}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loader}
          />
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorEmoji}>😕</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : quote ? (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteIcon}>"</Text>
            <Text style={styles.quoteText}>{quote.q}</Text>
            <View style={styles.divider} />
            <Text style={styles.quoteAuthor}>— {quote.a}</Text>
          </View>
        ) : null}
      </View>

      {/* Refresh button */}
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={fetchQuote}
        activeOpacity={0.8}
        disabled={isLoading}
      >
        <Text style={styles.refreshButtonText}>
          {isLoading ? 'Loading...' : '🔄  New Quote'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  header: {
    paddingTop: SPACING.xl,
    gap: SPACING.xs,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    minHeight: 200,
    justifyContent: 'center',
    ...SHADOWS.strong,
  },
  loader: {
    paddingVertical: SPACING.xl,
  },
  errorContainer: {
    alignItems: 'center',
    gap: SPACING.md,
  },
  errorEmoji: {
    fontSize: FONT_SIZES.emoji,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.danger,
    textAlign: 'center',
    lineHeight: LINE_HEIGHTS.md,
  },
  quoteContainer: {
    gap: SPACING.md,
  },
  quoteIcon: {
    fontSize: 64,
    color: COLORS.primary + '30',
    fontWeight: FONT_WEIGHTS.bold,
    lineHeight: LINE_HEIGHTS.xl,
  },
  quoteText: {
    fontSize: FONT_SIZES.lg,
    color: COLORS.text,
    lineHeight: LINE_HEIGHTS.lg,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
  quoteAuthor: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    fontWeight: FONT_WEIGHTS.medium,
    textAlign: 'right',
  },
  refreshButton: {
    backgroundColor: COLORS.primary,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    ...SHADOWS.card,
  },
  refreshButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
});

export default QuoteScreen;