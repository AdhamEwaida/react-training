import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from './Button'
import StudentPreviewCard from './StudentPreviewCard'
import './StudentRegistrationForm.css'

const initialForm = {
  name: '',
  email: '',
  course: '',
  gpa: '',
}

function validateStudent(form) {
  const errors = {}

  if (!form.name.trim()) {
    errors.name = 'Name is required.'
  }

  if (!form.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!form.course) {
    errors.course = 'Choose a course.'
  }

  if (form.gpa === '') {
    errors.gpa = 'GPA is required.'
  } else {
    const gpa = Number(form.gpa)
    if (!Number.isFinite(gpa) || gpa < 0 || gpa > 4) {
      errors.gpa = 'GPA must be between 0 and 4.'
    }
  }

  return errors
}

function StudentRegistrationForm({
  onRegister,
  resetAfterSubmit = false,
  showPreview = true,
}) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [student, setStudent] = useState(null)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((currentForm) => ({ ...currentForm, [name]: value }))
    setErrors((currentErrors) => ({ ...currentErrors, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const validationErrors = validateStudent(form)

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors)
      toast.error('Please correct the highlighted fields.')
      return
    }

    const registeredStudent = {
      name: form.name.trim(),
      email: form.email.trim(),
      course: form.course,
      gpa: Number(form.gpa),
    }

    setErrors({})
    setStudent(registeredStudent)
    onRegister?.(registeredStudent)

    if (resetAfterSubmit) {
      setForm(initialForm)
    }

    toast.success('Student registered successfully.')
  }

  return (
    <div
      className={`registration-layout ${showPreview ? '' : 'registration-layout--single'}`}
    >
      <form
        className="exercise-card registration-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <header className="exercise-card__header">
          <span className="exercise-card__eyebrow">Controlled form</span>
          <h2>Register a student</h2>
        </header>

        <div className="registration-form__fields">
          <div className="registration-form__field">
            <label htmlFor="student-name">Name</label>
            <input
              id="student-name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
            />
            {errors.name && <small id="name-error">{errors.name}</small>}
          </div>

          <div className="registration-form__field">
            <label htmlFor="student-email">Email</label>
            <input
              id="student-email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
            />
            {errors.email && <small id="email-error">{errors.email}</small>}
          </div>

          <div className="registration-form__field">
            <label htmlFor="student-course">Course</label>
            <select
              id="student-course"
              name="course"
              value={form.course}
              onChange={handleChange}
              aria-invalid={Boolean(errors.course)}
              aria-describedby={errors.course ? 'course-error' : undefined}
            >
              <option value="">Select a course</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.course && <small id="course-error">{errors.course}</small>}
          </div>

          <div className="registration-form__field">
            <label htmlFor="student-gpa">GPA</label>
            <input
              id="student-gpa"
              name="gpa"
              type="number"
              min="0"
              max="4"
              step="0.01"
              value={form.gpa}
              onChange={handleChange}
              aria-invalid={Boolean(errors.gpa)}
              aria-describedby={errors.gpa ? 'gpa-error' : undefined}
              inputMode="decimal"
            />
            {errors.gpa && <small id="gpa-error">{errors.gpa}</small>}
          </div>

          <Button type="submit">Register student</Button>
        </div>
      </form>

      {showPreview &&
        (student ? (
          <StudentPreviewCard student={student} />
        ) : (
          <aside className="student-preview student-preview--empty">
            <span className="exercise-card__eyebrow">Registration preview</span>
            <p>Complete the form to preview the student record.</p>
          </aside>
        ))}
    </div>
  )
}

export default StudentRegistrationForm
