import { useEffect } from 'react'

function StudentDetailsModal({ student, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div
      className="student-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section
        className="student-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="student-details-title"
      >
        <button
          className="student-modal__close"
          type="button"
          onClick={onClose}
          aria-label="Close student details"
        >
          ×
        </button>
        <span className="exercise-card__eyebrow">Student details</span>
        <h2 id="student-details-title">{student.name}</h2>
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
    </div>
  )
}

export default StudentDetailsModal
