import { useState } from 'react'
import './App.css'
import Counter from './components/Counter'
import TodoList from './components/TodoList'

const starterTodos = [
  { id: 1, text: 'Review component data flow', completed: true },
  { id: 2, text: 'Practice state updates', completed: false },
]

function App() {
  const [todoFilter, setTodoFilter] = useState('all')

  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 3</span>
        <h1>Lists with a clear source of truth.</h1>
        <p>
          Rendering stable lists, deriving filtered views, and lifting shared
          state to the component that coordinates it.
        </p>
      </header>

      <section className="exercise-grid" aria-label="Day 3 exercises">
        <Counter initialValue={0} />
        <TodoList
          title="Today’s practice"
          initialTodos={starterTodos}
          filter={todoFilter}
          onFilterChange={setTodoFilter}
        />
      </section>
    </main>
  )
}

export default App
