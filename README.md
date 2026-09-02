# React Training

Practical React exercises built during the frontend stage of my training.

## Week 5 — React Fundamentals

### Day 1 — Environment and Project Setup

- Created a React application with Vite.
- Added ESLint and Prettier for consistent code quality.
- Built a reusable `ProfileCard` component.
- Passed profile data through props from the parent `App` component.
- Added responsive styling for desktop and mobile screens.

### Day 2 — Components, Props, and State

- Built an interactive `Counter` with increment, decrement, and reset actions.
- Built a controlled to-do form with add, delete, and completion toggling.
- Composed `TodoList` from reusable `TodoItem` child components.
- Practiced state updates, events, conditional rendering, and inline styles.
- Added component tests with Vitest and React Testing Library.

### Day 3 — Lists, Keys, and Derived State

- Added All, Active, and Completed filters to the to-do list.
- Derived the visible list from the original to-do state instead of duplicating state.
- Lifted filter state into the parent `App` component.
- Continued using stable todo IDs as React list keys.
- Added a reusable `Button` component with primary and secondary variants.
- Extended component tests to cover filtered views and lifted state updates.

### Day 4 — Forms and Controlled Components

- Built a controlled student registration form for name, email, course, and GPA.
- Used one change handler to update multiple form fields by name.
- Added required-field, email-format, and GPA-range validation.
- Displayed a student preview card after a valid submission.
- Added success and validation feedback with React Toastify.
- Added component tests for validation, controlled inputs, and submission.

## Run locally

```powershell
npm install
npm run dev
```

## Quality checks

```powershell
npm run format:check
npm run lint
npm test
npm run build
```
