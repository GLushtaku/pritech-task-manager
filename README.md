# PRITECH Task Manager

A personal task manager mobile app built with React Native and Expo as part of the PRITECH LLC technical assessment.

### Core Requirements
- View all tasks in a clean list
- Add new tasks with title and description
- Mark tasks as completed or not completed
- Delete tasks with a confirmation dialog
- View full task details on a separate screen
- Input validation on all form fields

### Bonus Features
- Search tasks by title
- Filter tasks by status (All / Completed / Not Completed)
- Tasks persist locally on the device using AsyncStorage
- Motivational quote fetched from a public API (DummyJSON)
- Bottom tab navigation between screens

---

## Tech Stack

| Tool                     | Purpose                        |
|--------------------------|--------------------------------|
| React Native + Expo SDK 56 | Mobile framework             |
| TypeScript               | Type safety                    |
| React Navigation         | Screen and tab navigation      |
| Zustand                  | Global state management        |
| AsyncStorage             | Local data persistence         |
| DummyJSON API            | Public API integration         |

---

## Project Structure

```
pritech-task-manager/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── TaskCard.tsx      # Single task item with actions
│   │   ├── EmptyState.tsx    # Shown when list is empty
│   │   ├── SearchBar.tsx     # Search input component
│   │   └── FilterTabs.tsx    # Status filter tabs
│   ├── screens/              # App screens
│   │   ├── TaskListScreen.tsx    # Main task list with search and filter
│   │   ├── AddTaskScreen.tsx     # Form to create a new task
│   │   ├── TaskDetailScreen.tsx  # Full detail view of a task
│   │   └── QuoteScreen.tsx       # Daily motivational quote
│   ├── navigation/           # Navigation configuration
│   │   └── AppNavigator.tsx  # Stack + Bottom Tab navigator
│   ├── store/                # Global state
│   │   └── taskStore.ts      # Zustand store with AsyncStorage sync
│   ├── hooks/                # Custom React hooks
│   │   └── useQuote.ts       # Handles quote fetching logic
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   └── constants/            # Design tokens and app config
│       └── index.ts          # COLORS, SPACING, FONT_SIZES, etc.
├── .env                      # Environment variables (not committed)
├── .env.example              # Environment variable reference
└── App.tsx                   # Root component
```

---

## Environment Variables

Create a `.env` file in the root directory of the project:

```
EXPO_PUBLIC_QUOTES_API_URL=https://dummyjson.com/quotes/random
```

A `.env.example` file is included in the repository for reference.

> The `EXPO_PUBLIC_` prefix is required by Expo to expose variables to the app bundle.

---

## Setup Instructions

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Expo Go app installed on your phone, or an iOS/Android simulator

### Steps

1. Clone the repository:

```
git clone https://github.com/GLushtaku/pritech-task-manager.git
cd pritech-task-manager
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

```
cp .env.example .env
```

4. Start the development server:

```
npx expo start
```

5. Run the app:
   - Press `i` to open in iOS Simulator
   - Press `a` to open in Android Emulator
   - Scan the QR code with Expo Go on your phone

---

## What Was Implemented

### Architecture Decisions

**Zustand for state management**
Chosen over Context API for its minimal boilerplate, clean API, and straightforward AsyncStorage integration. The entire task store including loading, adding, toggling, and deleting is handled in a single file.

**Custom hook for API calls**
The `useQuote` hook separates all API logic from the UI layer. The screen only calls the hook and renders — it does not know anything about how the data is fetched.

**Design tokens**
All style values are defined as constants (COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, BORDER_RADIUS, SHADOWS, LINE_HEIGHTS). There are zero hardcoded numbers or color strings anywhere in the component files.

**Environment variables**
The public API URL is stored in a `.env` file using Expo's built-in `EXPO_PUBLIC_` system. No extra libraries are needed. A fallback value is also defined in constants in case the variable is missing.

**SafeAreaView**
Used on all main screens to handle notches, status bars, and home indicators correctly on both iOS and Android.

---

### Task Data Model

| Field       | Type                              | Description                        |
|-------------|-----------------------------------|------------------------------------|
| id          | string                            | Unique identifier (timestamp-based)|
| title       | string                            | Task title entered by the user     |
| description | string                            | Task description entered by user   |
| status      | 'completed' or 'not_completed'    | Current task status                |
| createdAt   | string                            | ISO date string of creation time   |

---

### Input Validation

- Title: required, minimum 3 characters, maximum 100 characters
- Description: required, minimum 5 characters, maximum 500 characters
- Inline error messages are shown below each field on submit
- Character counters are shown for both fields
- Errors clear automatically as the user types

---

### Public API

The Daily Quote screen fetches a random motivational quote from the DummyJSON public API.

- Endpoint: https://dummyjson.com/quotes/random
- A skeleton loader is shown while the request is in progress
- A clear error message is shown if the request fails
- A "New Quote" button allows the user to fetch another quote
- The button is disabled while loading to prevent duplicate requests