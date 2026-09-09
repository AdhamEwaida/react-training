function StudentList({ students, onViewStudent }) {
  if (!students.length) {
    return (
      <div className="exercise-card student-list-empty">
        <span className="exercise-card__eyebrow">Student directory</span>
        <h2>No students yet</h2>
        <p>Use the registration form to create the first student record.</p>
      </div>
    )
  }

  return (
    <section
      className="exercise-card student-list"
      aria-labelledby="students-title"
    >
      <header className="exercise-card__header student-list__header">
        <div>
          <span className="exercise-card__eyebrow">Student directory</span>
          <h2 id="students-title">Registered students</h2>
        </div>
        <strong>{students.length}</strong>
      </header>

      <div className="student-list__table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Course</th>
              <th scope="col">GPA</th>
              <th scope="col">
                <span className="visually-hidden">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                </td>
                <td>{student.course}</td>
                <td>{student.gpa.toFixed(2)}</td>
                <td>
                  <button
                    className="student-list__view"
                    type="button"
                    onClick={() => onViewStudent(student)}
                    aria-label={`View ${student.name}`}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default StudentList
