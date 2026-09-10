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
  const [searchTerm, setSearchTerm] = useState('')
  const [courseFilter, setCourseFilter] = useState('all')

  const normalizedSearchTerm = searchTerm.trim().toLowerCase()
  const visibleStudents = students.filter((student) => {
    const matchesName = student.name
      .toLowerCase()
      .includes(normalizedSearchTerm)
    const matchesCourse =
      courseFilter === 'all' || student.course === courseFilter

    return matchesName && matchesCourse
  })

  function handleRegister(student) {
    setStudents((currentStudents) => [
      ...currentStudents,
      createStudent(student),
    ])
  }

  function handleDelete(studentId) {
    setStudents((currentStudents) =>
      currentStudents.filter((student) => student.id !== studentId),
    )

    if (selectedStudent?.id === studentId) {
      setSelectedStudent(null)
    }
  }

  return (
    <section
      className={`${styles.dashboard} dashboard-workspace`}
      aria-label="Day 7 mini project"
    >
      <div className={styles.summary}>
        <span>Student Dashboard</span>
        <strong aria-label="Saved student count">{students.length}</strong>
        <p>{students.length === 1 ? 'student saved' : 'students saved'}</p>
      </div>

      <StudentRegistrationForm
        onRegister={handleRegister}
        resetAfterSubmit
        showPreview={false}
      />

      <section className={styles.directoryTools} aria-label="Student filters">
        <div className={styles.searchField}>
          <label htmlFor="student-search">Search by name</label>
          <input
            id="student-search"
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Start typing a name..."
          />
        </div>

        <div className={styles.filterField}>
          <label htmlFor="course-filter">Filter by course</label>
          <select
            id="course-filter"
            value={courseFilter}
            onChange={(event) => setCourseFilter(event.target.value)}
          >
            <option value="all">All courses</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
      </section>

      <StudentList
        students={visibleStudents}
        totalStudents={students.length}
        onViewStudent={setSelectedStudent}
        onDeleteStudent={handleDelete}
      />

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
