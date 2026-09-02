import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { toast } from 'react-toastify'
import StudentRegistrationForm from './StudentRegistrationForm'

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}))

describe('StudentRegistrationForm', () => {
  beforeEach(() => vi.clearAllMocks())

  it('validates required fields and the GPA range', () => {
    render(<StudentRegistrationForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Register student' }))

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email is required.')).toBeInTheDocument()
    expect(screen.getByText('Choose a course.')).toBeInTheDocument()
    expect(screen.getByText('GPA is required.')).toBeInTheDocument()
    expect(toast.error).toHaveBeenCalledOnce()

    fireEvent.change(screen.getByLabelText('GPA'), { target: { value: '4.5' } })
    fireEvent.click(screen.getByRole('button', { name: 'Register student' }))

    expect(screen.getByText('GPA must be between 0 and 4.')).toBeInTheDocument()
  })

  it('uses controlled inputs and shows a preview after submission', () => {
    render(<StudentRegistrationForm />)

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

    expect(screen.getByLabelText('Name')).toHaveValue('Adham Ewaida')
    expect(screen.getByLabelText('GPA')).toHaveValue(3.75)

    fireEvent.click(screen.getByRole('button', { name: 'Register student' }))

    expect(
      screen.getByRole('heading', { name: 'Adham Ewaida' }),
    ).toBeInTheDocument()
    expect(screen.getByText('adham@example.com')).toBeInTheDocument()
    expect(
      screen.getByText('Computer Science', { selector: 'dd' }),
    ).toBeInTheDocument()
    expect(screen.getByText('3.75')).toBeInTheDocument()
    expect(toast.success).toHaveBeenCalledWith(
      'Student registered successfully.',
    )
  })
})
