import './App.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import StudentDashboard from './pages/StudentDashboard'

function App() {
  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 6</span>
        <h1>One connected student workspace.</h1>
        <p>
          Register students, keep data in sync across components, inspect
          details, and preserve every record between visits.
        </p>
      </header>

      <StudentDashboard />
      <ToastContainer position="bottom-right" theme="dark" />
    </main>
  )
}

export default App
