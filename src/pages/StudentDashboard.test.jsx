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

const savedStudents = [
  {
    id: 'student-1',
    name: 'Sara Khalil',
    email: 'sara@example.com',
    course: 'Data Science',
    gpa: 3.9,
  },
  {
    id: 'student-2',
    name: 'Omar Saleh',
    email: 'omar@example.com',
    course: 'Computer Science',
    gpa: 3.4,
  },
]

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

  it('searches by name and filters students by course', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStudents))
    render(<StudentDashboard />)

    fireEvent.change(screen.getByLabelText('Search by name'), {
      target: { value: 'sara' },
    })

    expect(screen.getByText('Sara Khalil')).toBeInTheDocument()
    expect(screen.queryByText('Omar Saleh')).not.toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('Search by name'), {
      target: { value: '' },
    })
    fireEvent.change(screen.getByLabelText('Filter by course'), {
      target: { value: 'Computer Science' },
    })

    expect(screen.getByText('Omar Saleh')).toBeInTheDocument()
    expect(screen.queryByText('Sara Khalil')).not.toBeInTheDocument()
    expect(screen.getByLabelText('Visible student count')).toHaveTextContent(
      '1',
    )
  })

  it('deletes a student from the directory and local storage', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStudents))
    render(<StudentDashboard />)

    fireEvent.click(screen.getByRole('button', { name: 'Delete Sara Khalil' }))

    expect(screen.queryByText('Sara Khalil')).not.toBeInTheDocument()
    expect(screen.getByText('Omar Saleh')).toBeInTheDocument()
    expect(screen.getByLabelText('Saved student count')).toHaveTextContent('1')

    const storedStudents = JSON.parse(window.localStorage.getItem(STORAGE_KEY))
    expect(storedStudents.map((student) => student.name)).toEqual([
      'Omar Saleh',
    ])
  })

  it('shows an empty result without losing saved students', () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStudents))
    render(<StudentDashboard />)

    fireEvent.change(screen.getByLabelText('Search by name'), {
      target: { value: 'missing name' },
    })

    expect(screen.getByText('No matching students')).toBeInTheDocument()
    expect(screen.getByLabelText('Saved student count')).toHaveTextContent('2')
  })
})
