import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/navigation/AppNavigator';
import { useTaskStore } from './src/store/taskStore';

/**
 * Root component.
 * Loads persisted tasks from AsyncStorage on startup,
 * then renders the navigation tree.
 */
export default function App() {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}