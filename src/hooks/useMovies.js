import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/fetchMovie'

export function useMovies ({ search, sort }) {
  const [moviesData, setMoviesData] = useState([])
  const [loading, setLoading] = useState(null)
  const prevSearch = useRef('')

  const getSearchData = useCallback(async ({ search }) => {
    if (prevSearch.current === search) return
    try {
      setLoading(true)
      const newMovies = await searchMovies(search)
      setMoviesData(newMovies)
    } catch (e) {
      throw new Error('Failed to charge mapped movies')
    } finally {
      setLoading(false)
    }
    prevSearch.current = search
  }, [])

  const sortedMovies = useMemo(() => {
    return sort ? [...moviesData].sort((a, b) => a.year.localeCompare(b.year)) : moviesData
  }, [sort, moviesData])

  return { moviesData: sortedMovies, getSearchData, loading }
}
