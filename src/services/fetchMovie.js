const API_KEY = 'd677921d'
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&s=`

export const searchMovies = async (search) => {
  if (search === '') return null
  try {
    if (search) {
      const response = await fetch(API_URL + search)

      const data = await response.json()

      return data.Search?.map(movie => (
        {
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          poster: movie.Poster
        })
      )
    }
  } catch (error) {
    throw new Error('Error searching movies: ')
  }
}
