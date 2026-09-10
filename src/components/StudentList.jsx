function StudentList({
  students,
  totalStudents = students.length,
  onViewStudent,
  onDeleteStudent,
}) {
  if (!students.length) {
    const hasSavedStudents = totalStudents > 0

    return (
      <div className="exercise-card student-list-empty">
        <span className="exercise-card__eyebrow">Student directory</span>
        <h2>{hasSavedStudents ? 'No matching students' : 'No students yet'}</h2>
        <p>
          {hasSavedStudents
            ? 'Try a different name or course filter.'
            : 'Use the registration form to create the first student record.'}
        </p>
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
        <strong aria-label="Visible student count">{students.length}</strong>
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
                <td data-label="Student">
                  <strong>{student.name}</strong>
                  <small>{student.email}</small>
                </td>
                <td data-label="Course">{student.course}</td>
                <td data-label="GPA">{student.gpa.toFixed(2)}</td>
                <td data-label="Actions">
                  <div className="student-list__actions">
                    <button
                      className="student-list__view"
                      type="button"
                      onClick={() => onViewStudent(student)}
                      aria-label={`View ${student.name}`}
                    >
                      View
                    </button>
                    <button
                      className="student-list__delete"
                      type="button"
                      onClick={() => onDeleteStudent(student.id)}
                      aria-label={`Delete ${student.name}`}
                    >
                      Delete
                    </button>
                  </div>
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
