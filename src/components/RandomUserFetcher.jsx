import { useEffect, useState } from 'react'
import './RandomUserFetcher.css'

const RANDOM_USER_URL =
  'https://randomuser.me/api/?results=1&nat=us,gb,ca,au&noinfo'

function formatUser(user) {
  const location = [user.location?.city, user.location?.country]
    .filter(Boolean)
    .join(', ')

  return {
    id: user.login?.uuid ?? user.email,
    name: [user.name?.first, user.name?.last].filter(Boolean).join(' '),
    email: user.email,
    location: location || 'Location unavailable',
    picture: user.picture?.large,
  }
}

function RandomUserFetcher() {
  const [requestNumber, setRequestNumber] = useState(0)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchRandomUser() {
      setIsLoading(true)
      setError('')
      setUser(null)

      try {
        const response = await fetch(RANDOM_USER_URL, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}.`)
        }

        const data = await response.json()
        const nextUser = data.results?.[0]

        if (!nextUser) {
          throw new Error('The service returned an empty response.')
        }

        setUser(formatUser(nextUser))
      } catch (requestError) {
        if (requestError.name !== 'AbortError') {
          setError('We could not load a profile. Please try again.')
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchRandomUser()

    return () => controller.abort()
  }, [requestNumber])

  function loadNextUser() {
    setRequestNumber((currentNumber) => currentNumber + 1)
  }

  return (
    <article className="random-user exercise-card">
      <header className="random-user__header">
        <div>
          <span className="exercise-card__eyebrow">Remote profile</span>
          <h2>Meet someone new</h2>
        </div>
        <span className="random-user__request-count">
          Request {requestNumber + 1}
        </span>
      </header>

      <div className="random-user__content" aria-live="polite">
        {isLoading && (
          <div className="random-user__state" role="status">
            <span className="random-user__spinner" aria-hidden="true" />
            <div>
              <strong>Finding a profile…</strong>
              <p>Connecting to the Random User API.</p>
            </div>
          </div>
        )}

        {!isLoading && error && (
          <div
            className="random-user__state random-user__state--error"
            role="alert"
          >
            <div>
              <strong>Something went wrong</strong>
              <p>{error}</p>
            </div>
            <button type="button" onClick={loadNextUser}>
              Try again
            </button>
          </div>
        )}

        {!isLoading && user && (
          <div className="random-user__profile" key={user.id}>
            <img src={user.picture} alt="" width="144" height="144" />
            <div className="random-user__details">
              <span>Random connection</span>
              <h3>{user.name}</h3>
              <dl>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Location</dt>
                  <dd>{user.location}</dd>
                </div>
              </dl>
              <button type="button" onClick={loadNextUser}>
                Next user
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}

export default RandomUserFetcher
