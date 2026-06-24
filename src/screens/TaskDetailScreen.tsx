import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTaskStore } from '../store/taskStore';
import { RootStackParamList } from '../types';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
  LINE_HEIGHTS,
} from '../constants';
import EmptyState from '../components/EmptyState';

type DetailRouteProp = RouteProp<RootStackParamList, 'TaskDetail'>;
type DetailNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Displays full details of a single task.
 * Allows editing, toggling status and deleting the task.
 */
const TaskDetailScreen: React.FC = () => {
  const navigation = useNavigation<DetailNavigationProp>();
  const route = useRoute<DetailRouteProp>();
  const { taskId } = route.params;

  const { getTaskById, toggleTask, deleteTask } = useTaskStore();
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <EmptyState
        message="Task not found"
        subMessage="This task may have been deleted"
      />
    );
  }

  const isCompleted = task.status === 'completed';

  const formattedDate = new Date(task.createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            deleteTask(taskId);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Status banner */}
      <View
        style={[
          styles.statusBanner,
          {
            backgroundColor: isCompleted
              ? COLORS.success + '15'
              : COLORS.primary + '15',
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            { color: isCompleted ? COLORS.success : COLORS.primary },
          ]}
        >
          {isCompleted ? '✓ Completed' : '● Active'}
        </Text>
      </View>

      {/* Title */}
      <Text style={styles.title}>{task.title}</Text>

      {/* Date */}
      <Text style={styles.date}>📅 Created on {formattedDate}</Text>

      {/* Description */}
      <View style={styles.card}>
        <Text style={styles.sectionLabel}>Description</Text>
        <Text style={styles.description}>{task.description}</Text>
      </View>

      {/* Actions row — Edit + Toggle */}
      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionButton, styles.editButton]}
          onPress={() => navigation.navigate('EditTask', { taskId })}
          activeOpacity={0.8}
        >
          <Text style={styles.editButtonText}>✏️  Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionButton,
            styles.toggleButton,
            {
              backgroundColor: isCompleted
                ? COLORS.warning
                : COLORS.success,
            },
          ]}
          onPress={() => toggleTask(taskId)}
          activeOpacity={0.8}
        >
          <Text style={styles.toggleButtonText}>
            {isCompleted ? '↩  Active' : '✓  Complete'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Delete — separate, smaller */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDelete}
        activeOpacity={0.8}
      >
        <Text style={styles.deleteButtonText}>🗑  Delete Task</Text>
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
    gap: SPACING.md,
  },
  statusBanner: {
    alignSelf: 'flex-start',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: BORDER_RADIUS.full,
  },
  statusText: {
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text,
    lineHeight: LINE_HEIGHTS.xl,
  },
  date: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.textLight,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: BORDER_RADIUS.md,
    padding: SPACING.lg,
    gap: SPACING.sm,
    ...SHADOWS.card,
  },
  sectionLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.textLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  description: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text,
    lineHeight: LINE_HEIGHTS.lg,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  actionButton: {
    flex: 1,
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOWS.card,
  },
  editButton: {
    backgroundColor: COLORS.primary,
  },
  editButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  toggleButton: {
    // backgroundColor vendoset inline dinamikisht
  },
  toggleButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  deleteButton: {
    borderRadius: BORDER_RADIUS.md,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.danger + '60',
    backgroundColor: COLORS.danger + '08',
  },
  deleteButtonText: {
    color: COLORS.danger,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.medium,
  },
});

export default TaskDetailScreen;