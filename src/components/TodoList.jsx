import { useState } from 'react'
import Button from './Button'
import TodoItem from './TodoItem'
import './TodoList.css'

const filters = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

function TodoList({
  title = 'My tasks',
  initialTodos = [],
  filter = 'all',
  onFilterChange = () => {},
}) {
  const [todos, setTodos] = useState(initialTodos)
  const [newTodo, setNewTodo] = useState('')

  const completedCount = todos.filter((todo) => todo.completed).length
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed
    if (filter === 'completed') return todo.completed
    return true
  })
  const completionPercent = todos.length
    ? Math.round((completedCount / todos.length) * 100)
    : 0
  const emptyMessage = todos.length
    ? `No ${filter} tasks.`
    : 'No tasks yet. Add your first one.'

  function handleSubmit(event) {
    event.preventDefault()
    const text = newTodo.trim()

    if (!text) return

    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), text, completed: false },
    ])
    setNewTodo('')
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    )
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  return (
    <article className="exercise-card todo-list">
      <header className="exercise-card__header todo-list__header">
        <div>
          <span className="exercise-card__eyebrow">Composed components</span>
          <h2>{title}</h2>
        </div>
        <span className="todo-list__summary">
          {completedCount}/{todos.length} done
        </span>
      </header>

      <div className="todo-list__progress" aria-hidden="true">
        <span style={{ width: `${completionPercent}%` }} />
      </div>

      <form className="todo-list__form" onSubmit={handleSubmit}>
        <label className="sr-only" htmlFor="new-todo">
          New task
        </label>
        <input
          id="new-todo"
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
          placeholder="Add a task…"
        />
        <Button type="submit">Add</Button>
      </form>

      <div
        className="todo-list__filters"
        role="group"
        aria-label="Filter tasks"
      >
        {filters.map(({ value, label }) => (
          <Button
            key={value}
            type="button"
            variant="secondary"
            aria-pressed={filter === value}
            onClick={() => onFilterChange(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {filteredTodos.length ? (
        <ul className="todo-list__items">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))}
        </ul>
      ) : (
        <p className="todo-list__empty">{emptyMessage}</p>
      )}
    </article>
  )
}

export default TodoList
