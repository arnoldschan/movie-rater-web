import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import MovieForm from './components/MovieForm'

function App() {
  const [movies, setMovies] = useState(['Movie 1','Movie 2']);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ editedMovie, setEditedMovie ] = useState(null);

  const loadMovie = movie => {
    setSelectedMovie(movie);
  }
  useEffect(()=> {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token 12f17f8d7daa4f40a6155138e9894bfecccb1598',
      }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  }, [])
  const movieClicked = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null)
  }

  const editClicked = movie => {
    setSelectedMovie(null);
    setEditedMovie(movie)
  }

  const updateMovie = movie => {
    const updatedMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(updatedMovies);
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked}/>
          <MovieDetail movie={selectedMovie} updateMovie={loadMovie}/>
          { editedMovie ? <MovieForm movie={editedMovie} updateMovie={updateMovie}/> : null}
        </div>
      </header>
    </div>
  );
}


export default App;
