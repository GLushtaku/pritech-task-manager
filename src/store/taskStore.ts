import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatus } from '../types';
import { STORAGE_KEY } from '../constants';

/**
 * Defines the shape of the task store,
 * including state and all available actions.
 */
interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  editTask: (id: string, title: string, description: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

/**
 * Persists the current task list to AsyncStorage.
 * Called internally after every state mutation.
 */
const persistTasks = async (tasks: Task[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('[TaskStore] Failed to persist tasks:', error);
  }
};

/**
 * Global task store using Zustand.
 * Handles all CRUD operations and keeps
 * AsyncStorage in sync automatically.
 */
export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  /**
   * Loads tasks from AsyncStorage on app startup.
   */
  loadTasks: async () => {
    try {
      set({ isLoading: true });
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks: Task[] = stored ? JSON.parse(stored) : [];
      set({ tasks });
    } catch (error) {
      console.error('[TaskStore] Failed to load tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  /**
   * Creates a new task and prepends it to the list.
   */
  addTask: async (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      status: 'not_completed',
      createdAt: new Date().toISOString(),
    };

    const updated = [newTask, ...get().tasks];
    set({ tasks: updated });
    await persistTasks(updated);
  },

  /**
   * Toggles a task's status between
   * 'completed' and 'not_completed'.
   */
  toggleTask: async (id: string) => {
    const updated = get().tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            status: (
              task.status === 'completed' ? 'not_completed' : 'completed'
            ) as TaskStatus,
          }
        : task
    );

    set({ tasks: updated });
    await persistTasks(updated);
  },

  /**
   * Updates an existing task's title and description by ID.
   */
  editTask: async (id: string, title: string, description: string) => {
    const updated = get().tasks.map((task) =>
      task.id === id
        ? {
            ...task,
            title: title.trim(),
            description: description.trim(),
          }
        : task
    );

    set({ tasks: updated });
    await persistTasks(updated);
  },

  /**
   * Removes a task permanently by its ID.
   */
  deleteTask: async (id: string) => {
    const updated = get().tasks.filter((task) => task.id !== id);
    set({ tasks: updated });
    await persistTasks(updated);
  },

  /**
   * Returns a single task by ID, or undefined if not found.
   */
  getTaskById: (id: string) => {
    return get().tasks.find((task) => task.id === id);
  },
}));