import { Link } from 'react-router-dom'

const TrendingMovies = ({trendingMovies}) => {
    return (
        <section className='trending'>
            <h2>Trending movies</h2>
            <ul>
                {trendingMovies.map((movie, index) => (
                    <Link to={`/movie/${movie.movie_id}`} key={movie.$id}>
                        <li key={movie.$id}>
                            <p>{index + 1}</p>
                            <img src={movie.poster_url} alt={movie.title} />
                        </li>
                    </Link>
                ))}
            </ul>
        </section>
    )
}

export default TrendingMovies