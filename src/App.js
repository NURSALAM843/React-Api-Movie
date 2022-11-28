import './App.css';
import{getMovieList,searchMovie} from "./api"
import { useEffect, useState } from 'react';

const App = () => {

  const [playingMovies, setPlayingMovies] = useState([])

  useEffect(() => {
    getMovieList().then((result) =>{
      setPlayingMovies(result)
    })
  }, []);

  const PlayingMovieList = () =>{
    return playingMovies.map((movie, i) =>{
      return(
          <div className="movie-wrapper" key={i}>
            <div className="movie-title">{movie.title}</div>
            <img
            className="movie-img"
            src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`}
            />
            <div className="movie-date">Release : {movie.release_date}</div>
            <div className="movie-rate">{movie.vote_average}</div>
          </div>
    )
    })
  }

  const search = async(q) => {
    if(q.length > 3){
    const query = await searchMovie(q)
    setPlayingMovies(query.results)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>MOVIE MANIA</h1>
          <input placeholder='Cari Movie ...' className='movie-search' 
          onChange={({target}) => search(target.value)}
          />
        <div className="movie-container">
         <PlayingMovieList/>
        </div>
      </header>
    </div>
  );
}

export default App;
