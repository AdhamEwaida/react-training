import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 7</span>
        <h1>A complete student dashboard.</h1>
        <p>
          Register students, search and filter the directory, inspect details,
          and keep every change in sync between visits.
        </p>
      </header>

      <StudentDashboard />
      <ToastContainer position="bottom-right" theme="dark" />
    </main>
  )
}

export default App
