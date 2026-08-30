import { useState } from 'react'
import './Counter.css'

function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue)

  const countColor = count > 0 ? '#5eead4' : count < 0 ? '#fda4af' : '#f8fafc'

  return (
    <article className="exercise-card counter">
      <header className="exercise-card__header">
        <span className="exercise-card__eyebrow">Local state</span>
        <h2>Counter</h2>
      </header>

      <output className="counter__value" style={{ color: countColor }}>
        {count}
      </output>

      <div className="counter__actions">
        <button type="button" onClick={() => setCount((value) => value - 1)}>
          Decrease
        </button>
        <button type="button" onClick={() => setCount(initialValue)}>
          Reset
        </button>
        <button type="button" onClick={() => setCount((value) => value + 1)}>
          Increase
        </button>
      </div>
    </article>
  )
}

export default Counter
