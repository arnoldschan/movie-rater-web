import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function MovieForm(props) {
    return (
        <h1>{props.movie && props.movie.title} edit</h1>
    )
}

export default MovieForm
