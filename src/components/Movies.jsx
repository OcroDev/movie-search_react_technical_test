import './styles/Movie.css'

function ListOfMovies ({ movies }) {
  return (
    <ul className='movie-list'>
      {movies.map(movie => {
        return (
          <li key={movie.id} className='movie-list-item'>
            <h3>
              {movie.title} -
              <span> {movie.year}</span>
            </h3>
            <div>
              <img src={movie.poster} alt={movie.title} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

function NoMoviesResult () {
  return <p className='not-found'>Movie not found</p>
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (
    <>
      {hasMovies ? <ListOfMovies movies={movies} /> : <NoMoviesResult />}
    </>
  )
}
