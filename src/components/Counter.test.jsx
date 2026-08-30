import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('increments, decrements, and resets the count', () => {
    render(<Counter initialValue={2} />)

    fireEvent.click(screen.getByRole('button', { name: 'Increase' }))
    expect(screen.getByText('3')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Decrease' }))
    expect(screen.getByText('2')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Increase' }))
    fireEvent.click(screen.getByRole('button', { name: 'Reset' }))
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
