import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  LINE_HEIGHTS,
} from '../constants';
import useQuote from '../hooks/useQuote';

/**
 * Skeleton loader displayed while the quote is being fetched.
 * Provides a better UX than a plain spinner.
 */
const SkeletonLoader: React.FC = () => (
  <View style={skeletonStyles.container}>
    <View style={skeletonStyles.line} />
    <View style={[skeletonStyles.line, { width: '90%' }]} />
    <View style={[skeletonStyles.line, { width: '75%' }]} />
    <View style={skeletonStyles.divider} />
    <View
      style={[
        skeletonStyles.line,
        { width: '40%', alignSelf: 'flex-end' },
      ]}
    />
  </View>
);

const skeletonStyles = StyleSheet.create({
  container: {
    gap: SPACING.md,
    paddingVertical: SPACING.sm,
  },
  line: {
    height: 16,
    borderRadius: BORDER_RADIUS.sm,
    backgroundColor: COLORS.border,
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xs,
  },
});

/**
 * Displays a random motivational quote fetched via useQuote hook.
 * Satisfies the task requirement of using a public API.
 */
const QuoteScreen: React.FC = () => {
  const { quote, isLoading, error, fetchQuote } = useQuote();

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Daily Quote</Text>
          <Text style={styles.headerSubtitle}>
            Stay motivated and focused 💡
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {/* Quote card */}
        <View style={styles.card}>
          {isLoading ? (
            <SkeletonLoader />
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
          style={[
            styles.refreshButton,
            isLoading && styles.refreshButtonDisabled,
          ]}
          onPress={fetchQuote}
          activeOpacity={0.8}
          disabled={isLoading}
        >
          <Text style={styles.refreshButtonText}>
            {isLoading ? 'Loading...' : '🔄  New Quote'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    gap: SPACING.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.white,
    ...SHADOWS.card,
    marginBottom: SPACING.md,
  },
  headerTitle: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
  },
  headerSubtitle: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    marginTop: SPACING.xs,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.lg,
    padding: SPACING.xl,
    minHeight: 200,
    justifyContent: 'center',
    ...SHADOWS.strong,
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
  refreshButtonDisabled: {
    opacity: 0.6,
  },
  refreshButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
});

export default QuoteScreen;