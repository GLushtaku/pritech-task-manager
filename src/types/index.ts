export type TaskStatus = 'completed' | 'not_completed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
}

export type RootStackParamList = {
  MainTabs: undefined;
  AddTask: undefined;
  TaskDetail: { taskId: string };
  EditTask: { taskId: string };
};

export type BottomTabParamList = {
  TaskList: undefined;
  Quote: undefined;
};