import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParamList, BottomTabParamList } from '../types';
import { COLORS, FONT_SIZES, FONT_WEIGHTS, SPACING } from '../constants';

// Screens
import TaskListScreen from '../screens/TaskListScreen';
import QuoteScreen from '../screens/QuoteScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom tab navigator containing the two main sections:
 * Task List and the Quote (public API) screen.
 * Uses safe area insets to handle Android and iOS bottom spacing correctly.
 */
const MainTabs: React.FC = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          height: 56 + insets.bottom,
          paddingBottom: insets.bottom > 0 ? insets.bottom : SPACING.sm,
          paddingTop: SPACING.xs,
        },
        tabBarLabelStyle: styles.tabBarLabel,
      }}
    >
      <Tab.Screen
        name="TaskList"
        component={TaskListScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: FONT_SIZES.lg, color }}>📋</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Quote"
        component={QuoteScreen}
        options={{
          tabBarLabel: 'Daily Quote',
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: FONT_SIZES.lg, color }}>💡</Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

/**
 * Root stack navigator.
 * MainTabs is the entry point; AddTask and TaskDetail
 * are pushed on top as modal-style screens.
 */
const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: COLORS.primary,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: COLORS.background },
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AddTask"
          component={AddTaskScreen}
          options={{
            title: 'New Task',
            headerBackTitle: 'Back',
            presentation: 'modal',
          }}
        />
        <Stack.Screen
  name="EditTask"
  component={AddTaskScreen}
  options={{
    title: 'Edit Task',
    headerBackTitle: 'Back',
    presentation: 'modal',
  }}
/>
        <Stack.Screen
          name="TaskDetail"
          component={TaskDetailScreen}
          options={{
            title: 'Task Detail',
            headerBackTitle: 'Back',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabBarLabel: {
    fontSize: FONT_SIZES.xs,
    fontWeight: FONT_WEIGHTS.medium,
  },
  header: {
    backgroundColor: COLORS.white,
  },
  headerTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semiBold,
    color: COLORS.text,
  },
});

export default AppNavigator;