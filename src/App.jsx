import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.css'
import StudentRegistrationForm from './components/StudentRegistrationForm'

function App() {
  return (
    <main className="app-shell">
      <header className="page-heading">
        <span>React Training · Day 4</span>
        <h1>Forms that guide the user.</h1>
        <p>
          Controlled inputs, one change handler, clear validation, and a live
          student preview after a successful submission.
        </p>
      </header>

      <section className="form-workspace" aria-label="Day 4 exercise">
        <StudentRegistrationForm />
      </section>

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        theme="dark"
        newestOnTop
      />
    </main>
  )
}

export default App
