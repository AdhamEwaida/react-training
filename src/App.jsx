import './App.css'
import RandomUserFetcher from './components/RandomUserFetcher'

function App() {
  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 5</span>
        <h1>Effects that handle the real world.</h1>
        <p>
          Fetch remote data, communicate every request state, and clean up
          in-flight work when the component lifecycle changes.
        </p>
      </header>

      <section className="fetcher-workspace" aria-label="Day 5 exercise">
        <RandomUserFetcher />
      </section>
    </main>
  )
}

export default App
