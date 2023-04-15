import './App.css'
import { Movies } from './components/Movies'
import { useState, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { useSearch } from './hooks/useSearch'
import debounce from 'just-debounce-it'
import { Footer } from './components/Footer'

function App () {
  const [sort, setSort] = useState(false)
  const { query, setQuery, error } = useSearch()
  const { moviesData, getSearchData, loading } = useMovies({ search: query, sort })

  const searchDebounce = useCallback(debounce(search => getSearchData({ search }), 500), [])
  const handleSubmit = (event) => {
    event.preventDefault()
    // [
    // formulario no controlado
    // const { query } = Object.fromEntries(new window.FormData(event.target))
    // console.log({ query })
    //                          ]
    getSearchData({ search: query })
  }

  const handleChange = (e) => {
    const newQuery = e.target.value
    if (newQuery.startsWith()) return
    setQuery(newQuery)
    searchDebounce(newQuery)
  }

  const handleSort = () => {
    setSort(!sort)
  }
  return (
    <>
      <header className='header' onSubmit={handleSubmit}>
        <h1>Movies search</h1>
        <form>
          <div>
            <input name='query' onChange={handleChange} value={query} placeholder='Avengers, Star Wars, Fast & Fury...' />
            {error && <p style={{ fontSize: '12px', color: 'red', textAlign: 'left' }}>{error}</p>}
          </div>
          <input type='checkbox' onChange={handleSort} checked={sort} />
          <button type='submit' style={{ flexGrow: 0 }}>Search</button>
        </form>
      </header>
      <main className='main'>
        {loading ? <p>Searching movies...</p> : <Movies movies={moviesData} />}
      </main>
      <Footer />
    </>
  )
}

export default App
