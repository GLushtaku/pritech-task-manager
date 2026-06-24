import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Task } from '../types';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  LINE_HEIGHTS,
} from '../constants';

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}


const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onPress,
  onToggle,
  onDelete,
}) => {
  const isCompleted = task.status === 'completed';

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.statusBar,
          { backgroundColor: isCompleted ? COLORS.success : COLORS.primary },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            style={[styles.title, isCompleted && styles.titleCompleted]}
            numberOfLines={1}
          >
            {task.title}
          </Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: isCompleted
                  ? COLORS.success + '20'
                  : COLORS.primary + '20',
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                { color: isCompleted ? COLORS.success : COLORS.primary },
              ]}
            >
              {isCompleted ? '✓ Done' : '● Active'}
            </Text>
          </View>
        </View>

        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        ) : null}

        <View style={styles.footer}>
          <Text style={styles.date}>📅 {formattedDate}</Text>

          <View style={styles.actions}>
            <TouchableOpacity
              style={[
                styles.actionBtn,
                { backgroundColor: isCompleted
                    ? COLORS.warning 
                    : COLORS.success + '15'
                },
              ]}
              onPress={onToggle}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>
                {isCompleted ? '↩' : '✓'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.actionBtn,
                { backgroundColor: COLORS.danger + '15' },
              ]}
              onPress={onDelete}
              activeOpacity={0.7}
            >
              <Text style={styles.actionIcon}>🗑</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    marginHorizontal: SPACING.lg,
    marginBottom: SPACING.sm,
    overflow: 'hidden',
    ...SHADOWS.card,
  },
  statusBar: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
    gap: SPACING.sm,
  },
  title: {
    flex: 1,
    fontSize: FONT_SIZES.md,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.text,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: COLORS.textLight,
  },
  badge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  badgeText: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  description: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
    lineHeight: LINE_HEIGHTS.sm,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: SPACING.xs,
  },
  date: {
    fontSize: FONT_SIZES.xs,
    color: COLORS.textLight,
  },
  actions: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  actionBtn: {
    width: 32,
    height: 32,
    borderRadius: BORDER_RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: FONT_SIZES.md,
  },
});

export default TaskCard;