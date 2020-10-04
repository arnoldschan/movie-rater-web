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
    fetch("http://djangoproject--arnoldschan.repl.co/api/movies/", {
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
  }

  const editClicked = movie => {
    setEditedMovie(movie)
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
        <div className="layout">
          <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked}/>
          <MovieDetail movie={selectedMovie} updateMovie={loadMovie}/>
          <MovieForm movie={editedMovie}/>
        </div>
      </header>
    </div>
  );
}


export default App;
