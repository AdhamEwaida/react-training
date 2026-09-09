import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import StudentDashboard, { STORAGE_KEY } from './StudentDashboard'

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

function registerStudent() {
  fireEvent.change(screen.getByLabelText('Name'), {
    target: { value: 'Adham Ewaida' },
  })
  fireEvent.change(screen.getByLabelText('Email'), {
    target: { value: 'adham@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Course'), {
    target: { value: 'Computer Science' },
  })
  fireEvent.change(screen.getByLabelText('GPA'), {
    target: { value: '3.75' },
  })
  fireEvent.click(screen.getByRole('button', { name: 'Register student' }))
}

describe('StudentDashboard', () => {
  beforeEach(() => window.localStorage.clear())

  it('shares a new student with the list and persists it', () => {
    render(<StudentDashboard />)

    registerStudent()

    expect(screen.getByText('Adham Ewaida')).toBeInTheDocument()
    expect(screen.getByLabelText('Saved student count')).toHaveTextContent('1')

    const savedStudents = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    expect(savedStudents).toHaveLength(1)
    expect(savedStudents[0]).toMatchObject({
      name: 'Adham Ewaida',
      course: 'Computer Science',
      gpa: 3.75,
    })
  })

  it('loads saved students and opens their details modal', () => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([
        {
          id: 'student-1',
          name: 'Sara Khalil',
          email: 'sara@example.com',
          course: 'Data Science',
          gpa: 3.9,
        },
      ]),
    )

    render(<StudentDashboard />)
    fireEvent.click(screen.getByRole('button', { name: 'View Sara Khalil' }))

    const dialog = screen.getByRole('dialog')
    expect(dialog).toHaveTextContent('Sara Khalil')
    expect(dialog).toHaveTextContent('sara@example.com')

    fireEvent.click(
      screen.getByRole('button', { name: 'Close student details' }),
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
