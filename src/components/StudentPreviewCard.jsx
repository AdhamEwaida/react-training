function StudentPreviewCard({ student }) {
  return (
    <section
      className="student-preview"
      aria-labelledby="student-preview-title"
    >
      <span className="exercise-card__eyebrow">Registration preview</span>
      <h3 id="student-preview-title">{student.name}</h3>

      <dl>
        <div>
          <dt>Email</dt>
          <dd>{student.email}</dd>
        </div>
        <div>
          <dt>Course</dt>
          <dd>{student.course}</dd>
        </div>
        <div>
          <dt>GPA</dt>
          <dd>{student.gpa.toFixed(2)}</dd>
        </div>
      </dl>
    </section>
  )
}

export default StudentPreviewCard
