import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../constants';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

/**
 * Displayed when a list has no items to show.
 * Accepts optional custom messages for flexibility.
 */
const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No tasks yet',
  subMessage = 'Tap the + button to add your first task',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>📋</Text>
      <Text style={styles.message}>{message}</Text>
      <Text style={styles.subMessage}>{subMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.xxl,
  },
  emoji: {
    fontSize: 56,
    marginBottom: SPACING.lg,
  },
  message: {
    fontSize: FONT_SIZES.xl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  subMessage: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    textAlign: 'center',
    lineHeight: SPACING.lgg,
  },
});

export default EmptyState;