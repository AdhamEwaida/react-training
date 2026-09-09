import { useEffect, useState } from 'react'

function readStoredValue(key, initialValue) {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue === null ? initialValue : JSON.parse(storedValue)
  } catch {
    return initialValue
  }
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStoredValue(key, initialValue))

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage
