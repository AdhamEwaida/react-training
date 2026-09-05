import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import RandomUserFetcher from './RandomUserFetcher'

const adham = {
  login: { uuid: 'user-1' },
  name: { first: 'Adham', last: 'Ewaida' },
  email: 'adham@example.com',
  location: { city: 'Ramallah', country: 'Palestine' },
  picture: { large: 'https://example.com/adham.jpg' },
}

const sara = {
  login: { uuid: 'user-2' },
  name: { first: 'Sara', last: 'Khalil' },
  email: 'sara@example.com',
  location: { city: 'Amman', country: 'Jordan' },
  picture: { large: 'https://example.com/sara.jpg' },
}

function successfulResponse(user) {
  return {
    ok: true,
    json: vi.fn().mockResolvedValue({ results: [user] }),
  }
}

describe('RandomUserFetcher', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows a loading state while the request is pending', () => {
    fetch.mockReturnValue(new Promise(() => {}))

    render(<RandomUserFetcher />)

    expect(screen.getByRole('status')).toHaveTextContent('Finding a profile')
    expect(fetch).toHaveBeenCalledOnce()
  })

  it('renders a profile returned by the API', async () => {
    fetch.mockResolvedValue(successfulResponse(adham))

    render(<RandomUserFetcher />)

    expect(
      await screen.findByRole('heading', { name: 'Adham Ewaida' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Ramallah, Palestine')).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'adham@example.com' }),
    ).toHaveAttribute('href', 'mailto:adham@example.com')
  })

  it('fetches and displays another profile', async () => {
    fetch
      .mockResolvedValueOnce(successfulResponse(adham))
      .mockResolvedValueOnce(successfulResponse(sara))

    render(<RandomUserFetcher />)

    await screen.findByRole('heading', { name: 'Adham Ewaida' })
    fireEvent.click(screen.getByRole('button', { name: 'Next user' }))

    expect(
      await screen.findByRole('heading', { name: 'Sara Khalil' }),
    ).toBeInTheDocument()
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(screen.getByText('Request 2')).toBeInTheDocument()
  })

  it('shows an error and allows the request to be retried', async () => {
    fetch
      .mockResolvedValueOnce({ ok: false, status: 503 })
      .mockResolvedValueOnce(successfulResponse(adham))

    render(<RandomUserFetcher />)

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'We could not load a profile',
    )
    fireEvent.click(screen.getByRole('button', { name: 'Try again' }))

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2))
    expect(
      await screen.findByRole('heading', { name: 'Adham Ewaida' }),
    ).toBeInTheDocument()
  })
})
