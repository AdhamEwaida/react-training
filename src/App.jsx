import './App.css'
import ProfileCard from './components/ProfileCard'

function App() {
  const profile = {
    name: 'Adham Ewaida',
    title: 'Computer Science Student · Full-Stack Developer',
    image: 'https://github.com/AdhamEwaida.png?size=640',
  }

  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 1</span>
        <h1>Building reusable interfaces with props.</h1>
        <p>
          This profile card receives its content from the parent component and
          renders it through a simple, reusable API.
        </p>
      </header>

      <ProfileCard {...profile} />
    </main>
  )
}

export default App
