import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TodoList from './TodoList'

const initialTodos = [{ id: 1, text: 'Write a component', completed: false }]

describe('TodoList', () => {
  it('adds, toggles, and deletes tasks', () => {
    render(<TodoList initialTodos={initialTodos} />)

    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: 'Test the component' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(screen.getByText('Test the component')).toBeInTheDocument()
    expect(screen.getByText('0/2 done')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('checkbox', { name: 'Write a component' }))
    expect(screen.getByText('1/2 done')).toBeInTheDocument()

    fireEvent.click(
      screen.getByRole('button', { name: 'Delete Write a component' }),
    )
    expect(screen.queryByText('Write a component')).not.toBeInTheDocument()
  })

  it('shows an empty state and ignores whitespace-only tasks', () => {
    render(<TodoList />)

    expect(
      screen.getByText('No tasks yet. Add your first one.'),
    ).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText('New task'), {
      target: { value: '   ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Add' }))

    expect(
      screen.getByText('No tasks yet. Add your first one.'),
    ).toBeInTheDocument()
  })
})
