import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/MovieList'
import MovieDetail from './components/MovieDetail'
import MovieForm from './components/MovieForm'
import { useCookies } from "react-cookie";
import { API } from './api-service';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [movies, setMovies] = useState(['Movie 1','Movie 2']);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ editedMovie, setEditedMovie ] = useState(null);
  const [ token ] = useCookies(['mr-token']);
  const loadMovie = movie => {
    setSelectedMovie(movie);
  }
  useEffect(()=> {
    new API(token["mr-token"]).getMovies()
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))
  }, [])

  useEffect(() => {
    if (!token["mr-token"]) window.location.href = '/';
    console.log(token)
}, [token])


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
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }
  const createMovie = (movie) => {
    const  newMovies = [...movies, movie];
    setMovies(newMovies)
  }
  const removeClicked = (movie) => {
    const updatedMovies = movies.filter( mov => {
      if (mov.id === movie.id){
        return false;
      }
      return true;
    })
    setMovies(updatedMovies);;
  }
  return (
    <div className="App">
        <header className="App-header">
          
          <h1> <FontAwesomeIcon icon={faFilm}/> <span>Movie Rater</span></h1>
        </header>
        <div className="layout">
          <div>
            <MovieList movies={movies} movieClicked={movieClicked} 
            editClicked={editClicked}
            removeClicked={removeClicked}/>
            <button onClick={newMovie}>New Movie</button>
          </div>
            <MovieDetail movie={selectedMovie} updateMovie={loadMovie}/>
            { editedMovie ? <MovieForm movie={editedMovie} 
            updateMovie={updateMovie}
            createMovie={createMovie}/> : null}
        </div>
    </div>
  );
}


export default App;
