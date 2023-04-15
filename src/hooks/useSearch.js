import { useEffect, useState, useRef } from 'react'

export const useSearch = () => {
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }

    if (query === '') {
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if (query.match(/^\d+$/)) {
      setError('no se puede hacer la busqueda solo con numeros')
      return
    }
    if (query.length < 3) {
      setError('la busqueda debe contener almenos tres caracteres')
      return
    }
    setError(null)
  }, [query])

  return { query, setQuery, error }
}
