import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { API } from '../api-service'
import { useCookies } from "react-cookie";

function MovieList(props) {
    const [ token, setToken ] = useCookies(['mr-token']);

    const movieClicked = movie => {
        props.movieClicked(movie)
    }

    const editClicked = movie => {
        props.editClicked(movie);
    }

    const removeClicked = movie => {
        new API(token['mr-token']).deleteMovie(movie.id)
        .then( () => props.removeClicked(movie))
    }
    return (
        <div>
            { props.movies && props.movies.map( movie => {
                return (
                    <div key={movie.id} className="movie-item">
                        <h2 onClick={evt => movieClicked(movie)}>
                        {movie.title}
                        </h2>
                        <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)}/>
                        <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)}/>
                    </div>
                )
            })}
        </div>
    )
}

export default MovieList