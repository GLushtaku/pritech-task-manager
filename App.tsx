import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { useTaskStore } from './src/store/taskStore';

/**
 * Root component.
 * SafeAreaProvider ensures correct insets on both iOS and Android.
 * Loads persisted tasks from AsyncStorage on startup.
 */
export default function App() {
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppNavigator />
    </SafeAreaProvider>
  );
}