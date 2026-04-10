import { Link } from 'react-router-dom'

const MovieCard = ({ movie: { id, poster_path, original_language, vote_average, release_date, title } }) => {
  return (
    <Link to={`/movie/${id}`} className='movie-card'>
      <img src={poster_path ? `https://media.themoviedb.org/t/p/w500/${poster_path}` : '/no-movie.png'} />

      <div className='mt-4'>
        <h3>{title}</h3>
        <div className="content">
          <div className='rating'>
            <img src="./star.svg" />
            <p>{vote_average ? vote_average.toFixed(1) : ''}</p>
          </div>

          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">{release_date.split("-")[0]}</p>
        </div>

      </div>
    </Link>
  )
}

export default MovieCard

