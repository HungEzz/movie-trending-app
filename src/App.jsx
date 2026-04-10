import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'use-debounce';
import { updateMovieCount, loadingTrendingMovies } from './appwrite'
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moviesList, setMoviesList] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [debouncedValue] = useDebounce(searchTerm, 500, [searchTerm]);

  const VITE_TMDB_HEADER_API_KEY = import.meta.env.VITE_TMDB_HEADER_API_KEY;
  const API_BASE_URL = "https://api.themoviedb.org/3";
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${VITE_TMDB_HEADER_API_KEY}`
    }
  };

  const fetchMoviesList = async (query) => {
    setIsLoading(true);
    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` :
        `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const res = await fetch(endpoint, options);
      const result = await res.json();
      if (result === 'false') {
        setErr(result.Error || 'Failed to fetch movies');
        setMoviesList([]);
        return;
      }
      setMoviesList(result.results || []);

      if (query && result.results?.length > 0) {
        await updateMovieCount(query, result.results[0]);
      }
    } catch (err) {
      console.log("err", err)
      setErr(err)
    } finally {
      setIsLoading(false);

    }
  }

  const getTrendingMovies = async () => {
    try {
      const data = await loadingTrendingMovies();
      if (data) setTrendingMovies(data);
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchMoviesList(debouncedValue)
  }, [debouncedValue]);

  useEffect(() => {
    getTrendingMovies();
  }, [])
  return (
    <main>
      <div className='pattern'></div>

      <div className=" wrapper">
        <header>
          <img src="./hero.png" className="hero-img img" />
          <h1 className="header-text">Find <span className='text-gradient'>Movies</span> You'll Enjoy
            Without the Hassle</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-white'>{searchTerm}</h1>
        </header>
        
         {trendingMovies.length > 0 &&
          <section className='trending'>
            <h2>Trending movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        }
      
        <section className='all-movies'>
          <h2>All Movies</h2>
          {isLoading ? <Spinner /> : err ? <p className='text-red-500'>{err}</p> :
            (
              <ul>
                {moviesList.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </ul>
            )}

        </section>

      </div>
    </main>
  )
}

export default App
