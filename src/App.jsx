import './App.css'
import Counter from './components/Counter'
import TodoList from './components/TodoList'

const starterTodos = [
  { id: 1, text: 'Review component data flow', completed: true },
  { id: 2, text: 'Practice state updates', completed: false },
]

function App() {
  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 2</span>
        <h1>Components that respond to you.</h1>
        <p>
          Two small exercises exploring local state, event handling, conditional
          rendering, and component composition.
        </p>
      </header>

      <section className="exercise-grid" aria-label="Day 2 exercises">
        <Counter initialValue={0} />
        <TodoList title="Today’s practice" initialTodos={starterTodos} />
      </section>
    </main>
  )
}

export default App
