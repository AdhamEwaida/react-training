import { useState } from 'react'
import StudentDetailsModal from '../components/StudentDetailsModal'
import StudentList from '../components/StudentList'
import StudentRegistrationForm from '../components/StudentRegistrationForm'
import useLocalStorage from '../hooks/useLocalStorage'
import styles from './StudentDashboard.module.css'

const STORAGE_KEY = 'react-training.students'

function createStudent(student) {
  return {
    ...student,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  }
}

function StudentDashboard() {
  const [students, setStudents] = useLocalStorage(STORAGE_KEY, [])
  const [selectedStudent, setSelectedStudent] = useState(null)

  function handleRegister(student) {
    setStudents((currentStudents) => [
      ...currentStudents,
      createStudent(student),
    ])
  }

  return (
    <section
      className={`${styles.dashboard} dashboard-workspace`}
      aria-label="Day 6 exercise"
    >
      <div className={styles.summary}>
        <span>Student Dashboard v1</span>
        <strong aria-label="Saved student count">{students.length}</strong>
        <p>{students.length === 1 ? 'student saved' : 'students saved'}</p>
      </div>

      <StudentRegistrationForm
        onRegister={handleRegister}
        resetAfterSubmit
        showPreview={false}
      />

      <StudentList students={students} onViewStudent={setSelectedStudent} />

      {selectedStudent && (
        <StudentDetailsModal
          student={selectedStudent}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </section>
  )
}

export { STORAGE_KEY }
export default StudentDashboard
