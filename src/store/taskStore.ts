import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskStatus } from '../types';
import { STORAGE_KEY } from '../constants';

interface TaskStore {
  tasks: Task[];
  isLoading: boolean;
  loadTasks: () => Promise<void>;
  addTask: (title: string, description: string) => Promise<void>;
  toggleTask: (id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTaskById: (id: string) => Task | undefined;
}

const saveTasks = async (tasks: Task[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
};

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  isLoading: false,

  loadTasks: async () => {
    set({ isLoading: true });
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    const tasks = stored ? JSON.parse(stored) : [];
    set({ tasks, isLoading: false });
  },

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
    await saveTasks(updated);
  },

  toggleTask: async (id: string) => {
    const updated = get().tasks.map(task =>
      task.id === id
        ? {
            ...task,
            status: (task.status === 'completed'
              ? 'not_completed'
              : 'completed') as TaskStatus,
          }
        : task
    );
    set({ tasks: updated });
    await saveTasks(updated);
  },

  deleteTask: async (id: string) => {
    const updated = get().tasks.filter(task => task.id !== id);
    set({ tasks: updated });
    await saveTasks(updated);
  },

  getTaskById: (id: string) => {
    return get().tasks.find(task => task.id === id);
  },
}));