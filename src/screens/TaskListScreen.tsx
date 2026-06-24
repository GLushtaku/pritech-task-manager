import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTaskStore } from '../store/taskStore';
import { RootStackParamList } from '../types';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  COLORS,
  SPACING,
  FONT_SIZES,
  FONT_WEIGHTS,
  BORDER_RADIUS,
  SHADOWS,
} from '../constants';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;
type FilterValue = 'all' | 'completed' | 'not_completed';

/**
 * Main screen showing the full task list.
 * Supports search by title and filter by status.
 */
const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { tasks, toggleTask, deleteTask } = useTaskStore();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');

  /**
   * Filters and searches tasks based on
   * current search query and selected filter tab.
   */
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        if (filter === 'all') return true;
        return task.status === filter;
      })
      .filter((task) =>
        task.title.toLowerCase().includes(search.toLowerCase())
      );
  }, [tasks, search, filter]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTask(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>My Tasks</Text>
          <Text style={styles.headerSubtitle}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </Text>
        </View>

        {/* Add button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddTask')}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Search */}
      <SearchBar value={search} onChangeText={setSearch} />

      {/* Filter tabs */}
      <FilterTabs selected={filter} onSelect={setFilter} />

      {/* Task list */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() =>
              navigation.navigate('TaskDetail', { taskId: item.id })
            }
            onToggle={() => toggleTask(item.id)}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            message={
              search || filter !== 'all'
                ? 'No tasks found'
                : 'No tasks yet'
            }
            subMessage={
              search || filter !== 'all'
                ? 'Try a different search or filter'
                : 'Tap "+ Add" to create your first task'
            }
          />
        }
        contentContainerStyle={
          filteredTasks.length === 0
            ? styles.emptyContainer
            : styles.listContent
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
  addButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.full,
    ...SHADOWS.card,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: FONT_SIZES.sm,
    fontWeight: FONT_WEIGHTS.semiBold,
  },
  listContent: {
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.xl,
  },
  emptyContainer: {
    flex: 1,
  },
});

export default TaskListScreen;