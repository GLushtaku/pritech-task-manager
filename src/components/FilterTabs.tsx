import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { COLORS, FILTER_OPTIONS, SPACING, FONT_SIZES, BORDER_RADIUS , FONT_WEIGHTS} from '../constants';

type FilterValue = 'all' | 'completed' | 'not_completed';

interface FilterTabsProps {
  selected: FilterValue;
  onSelect: (value: FilterValue) => void;
}

/**
 * Horizontal scrollable filter tabs.
 * Allows users to filter tasks by their status.
 */
const FilterTabs: React.FC<FilterTabsProps> = ({ selected, onSelect }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      style={styles.container}
    >
      {FILTER_OPTIONS.map((option) => {
        const isActive = selected === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onSelect(option.value as FilterValue)}
            activeOpacity={0.7}
          >
            <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
    maxHeight: 40,
  },
  scrollContent: {
    gap: SPACING.sm,
    paddingRight: SPACING.sm,
    alignItems: 'center',
  },
  tab: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
    color: COLORS.textLight,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
});

export default FilterTabs;